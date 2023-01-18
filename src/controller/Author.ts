import {NextFunction, Request, Response} from "express";
import { Author } from "../models/Author";
import { iDatabase } from "../models/Database";

export const createAuthor = (req: Request, res: Response, next: NextFunction) => {
  const {name} = req.body
  const iAuthor = new Author({connection: iDatabase.connection})

  return iAuthor.save({name}, (err, results) => {
    if (err) return res.status(500).json(err)
    return res.status(201).json(results)
  })
}

export const readAuthor = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  const iAuthor = new Author({connection: iDatabase.connection})

  return iAuthor.findById({id}, (err, results) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(results)
  })
}

export const readAllAuthors = (req: Request, res: Response, next: NextFunction) => {

  const iAuthor = new Author({connection: iDatabase.connection})

  return iAuthor.find((err, results) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(results)
  })
}

export const updateAuthor = (req: Request, res: Response, next: NextFunction) => {

  const {id, name} = req.body
  const iAuthor = new Author({connection: iDatabase.connection})

  return iAuthor.update({id, name}, (err, runResult) => {
    if (err) return res.status(500).json(err)
    return res.status(201).json(runResult)
  })
}

export const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  const iAuthor = new Author({connection: iDatabase.connection})

  return iAuthor.delete({id}, (err, runResult) => {
    if (err) return res.status(500).json(err)
    return res.status(201).json(runResult)
  })
}