import express from "express";
import { CreateContact } from "../Controllers/ContactController.js";

const Router = express.Router();

Router.post("/contact", CreateContact);

export default Router;
