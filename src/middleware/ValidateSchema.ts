import Joi, { ObjectSchema } from "joi";
import {NextFunction, Request, Response} from "express";
import Logging from "../library/Logging";
import { IAuthorModel } from "../models/Author";

type dataFromType = 'body' | 'params'

export const ValidateSchema = (schema: ObjectSchema, dataFrom: dataFromType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req[dataFrom])
      next()
    }
    catch (err) {
      Logging.error(err)
      return res.status(422).json(err)
    }
  }
}

export const Schema = {
  author: {
    create: Joi.object<IAuthorModel>({
      name: Joi.string().required()
    }),
    getById: Joi.object<IAuthorModel>({
      id: Joi.required()
    }),
    update: Joi.object<IAuthorModel>({
      id: Joi.required(),
      name: Joi.string().required()
    }),
    delete: Joi.object<IAuthorModel>({
      id: Joi.required()
    })
  }
}