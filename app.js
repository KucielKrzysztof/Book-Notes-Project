import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
var books = [];
//db
const db = new pg.Client({
	user: "postgres",
	host: "localhost",
	database: "booknotes",
	password: "postgres",
	port: 5432,
});
db.connect();

//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//handlers
//main page
app.get("/", async (req, res) => {
	try {
		const result = await db.query("SELECT * FROM books");
		books = result.rows;
		/* books.forEach((b) => {
			b.coverUrl = `https://covers.openlibrary.org/b/isbn/${b.isbn}-M.jpg`;
		}); */
		console.log(result.rows);
	} catch (error) {
		console.error({ error: error.message });
	}
	res.render("index.ejs", { books: books });
});
//particular page
app.get("/book/:id", async (req, res) => {
	try {
		const bookId = parseInt(req.params.id);
		const result = await db.query("SELECT * FROM books WHERE id=$1", [bookId]);
		const book = result.rows;
		console.log(result.rows);
		res.render("book.ejs", { book: book[0] });
	} catch (error) {
		console.error({ error: error.message });
	}
});
//sorting
app.get("/books", async (req, res) => {
	const sort = req.query.sort;
	let query = "SELECT * FROM books";
	switch (sort) {
		case "rating":
			console.log("rating");
			query += " ORDER BY rating DESC";
			break;
		case "title":
			console.log("title");
			query += " ORDER BY title ASC";
			break;
		case "date":
			console.log("date");
			query += " ORDER BY read_date DESC";
			break;
	}
	try {
		const result = await db.query(query);
		const books = result.rows;
		res.render("index.ejs", { books: books });
	} catch (error) {
		console.error({ error: error.message });
	}
});
//add book page
app.get("/addPage", async (req, res) => {
	try {
		res.render("addPage.ejs");
	} catch (error) {
		console.log({ error: error.message });
	}
});
//add book
app.post("/add", async (req, res) => {
	const book = {
		title: req.body.title,
		author: req.body.author,
		rating: req.body.rating,
		note: req.body.note,
		date: req.body.read_date,
		isbn: req.body.isbn,
		url: `https://covers.openlibrary.org/b/isbn/${req.body.isbn}-M.jpg`,
	};
	console.log(book);
	try {
		await db.query("INSERT INTO books (title, author, rating, note, read_date, isbn, url) VALUES ($1, $2, $3, $4, $5, $6, $7)", [
			book.title,
			book.author,
			book.rating,
			book.note,
			book.date,
			book.isbn,
			book.url,
		]);
		res.redirect("/");
	} catch (error) {
		console.log({ error: error.message });
		res.json({ Error: "ERROR ADDING BOOK" });
	}
});
app.listen(port, () => {
	console.log("App listening on http://localhost:3000");
});
