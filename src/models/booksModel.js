import db from "../config/dbConfig.js";

//Main page function
export async function getAllBooks() {
	const result = await db.query("SELECT * FROM books");
	return result.rows;
}

//Particular book / book by id
export async function getBookById(id) {
	const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
	return result.rows[0];
}

//Adding book
export async function addBook(book) {
	const query = `
      INSERT INTO books (title, author, rating, note, read_date, isbn, url) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)`;
	const values = [book.title, book.author, book.rating, book.note, book.date, book.isbn, book.url];

	await db.query(query, values);
}
