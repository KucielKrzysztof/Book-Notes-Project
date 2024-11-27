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
app.get("/", async (req, res) => {
	try {
		const result = await db.query("SELECT * FROM books");
		books = result.rows;
		console.log(result.rows);
	} catch (error) {
		console.error({ error: error.message });
	}
	res.render("index.ejs", { books: books });
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
	};
	console.log(book);
	try {
		await db.query("INSERT INTO books (title, author, rating, note, read_date) VALUES ($1, $2, $3, $4, $5)", [
			book.title,
			book.author,
			book.rating,
			book.note,
			book.date,
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
