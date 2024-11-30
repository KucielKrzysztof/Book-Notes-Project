import { getAllBooks, getBookById, addBook } from "../models/booksModel.js";

//Main page
export async function renderBooksPage(req, res) {
	try {
		const books = await getAllBooks();
		res.render("index.ejs", { books });
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
}

//Book page
export async function renderBookPage(req, res) {
	try {
		const book = await getBookById(req.params.id);
		if (!book) return res.status(404).send("Book not found");
		res.render("book.ejs", { book });
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
}

//Adding book
export async function addNewBook(req, res) {
	try {
		const book = {
			title: req.body.title,
			author: req.body.author,
			rating: req.body.rating,
			note: req.body.note,
			date: req.body.read_date,
			isbn: req.body.isbn,
			url: `https://covers.openlibrary.org/b/isbn/${req.body.isbn}-M.jpg`,
		};
		await addBook(book);
		res.redirect("/");
	} catch (error) {
		console.error(error);
		res.status(500).send("Error adding book");
	}
}

