import 'reflect-metadata'
import 'dotenv/config'
import 'express-async-errors'

import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import AppError from '@shared/errors/AppError'
import routes from '@shared/infra/routes'
import '@shared/container'
import 'database'

const PORT = 3333
const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message })
  }

  // eslint-disable-next-line no-console
  console.error(err)

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal Server Error' })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
