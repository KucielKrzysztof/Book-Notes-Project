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

app.listen(port, () => {
	console.log("App listening on http://localhost:3000");
});
