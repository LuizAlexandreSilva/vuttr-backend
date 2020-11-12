import 'reflect-metadata'
import 'dotenv/config'

import express from 'express'

const PORT = 3000
const app = express()

app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
