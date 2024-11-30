import express from "express";
import { renderBooksPage, renderBookPage, addNewBook, sortBooks, addBookPage } from "../controllers/booksController.js";

const router = express.Router();

//Main page
router.get("/", renderBooksPage);
//Specific book page
router.get("/book/:id", renderBookPage);
//Page for adding books
router.get("/addPage", addBookPage);
//Handling add {post} request
router.post("/add", addNewBook);
//Sorting
router.get("/books", sortBooks);

export default router;
