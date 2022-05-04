import express from 'express'

import { NodemailerEmailAdpter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedback } from './use-cases/submit-feedback-use-case';


export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodemailerEmailAdapter = new NodemailerEmailAdpter()

  const submitFeedback = new SubmitFeedback(
    prismaFeedbacksRepository,
    nodemailerEmailAdapter
  )

  await submitFeedback.execute({
    type,
    comment,
    screenshot
  })

  return res.status(201).send()
})