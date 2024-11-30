import express from "express";
import bodyParser from "body-parser";
import db from "./src/config/dbConfig.js";
import booksRoutes from "./src/routes/booksRoutes.js";

const app = express();
const port = 3000;

//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//db connection
db.connect().catch((error) => console.error("Database connection error: " + error));

//Paths
app.use("/", booksRoutes);

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

app.listen(port, () => {
	console.log("App listening on http://localhost:3000");
});
