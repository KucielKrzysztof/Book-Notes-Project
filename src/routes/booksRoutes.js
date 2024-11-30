import express from "express";
import { renderBooksPage, renderBookPage, addNewBook } from "../controllers/booksController.js";

const router = express.Router();

router.get("/", renderBooksPage);
router.get("/book/:id", renderBookPage);
router.post("/add", addNewBook);
/* router.get("/books", sortBooks); */

export default router;
