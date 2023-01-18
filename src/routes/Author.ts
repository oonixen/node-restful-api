import express from "express";
import { createAuthor, readAuthor, readAllAuthors, updateAuthor, deleteAuthor } from "../controller/Author";
import { Schema, ValidateSchema } from "../middleware/ValidateSchema";

export const router = express.Router()

router.post('/create', ValidateSchema(Schema.author.create, "body"), createAuthor)
router.get('/get/:id', ValidateSchema(Schema.author.getById, "params"), readAuthor)
router.get('/get', readAllAuthors)
router.patch('/update', ValidateSchema(Schema.author.update, "body"), updateAuthor)
router.delete('/delete/:id', ValidateSchema(Schema.author.delete, "params"), deleteAuthor)
