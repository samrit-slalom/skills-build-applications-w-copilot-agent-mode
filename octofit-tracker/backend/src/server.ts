import express from 'express'
import db from './config/database.js'
import { router } from './routes/index.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

app.use(express.json())
app.use(router)

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: db.readyState === 1 ? 'connected' : 'connecting',
    baseUrl: apiBaseUrl,
  })
})

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  response.status(500).json({ message: error.message })
})

app.listen(port, () => {
  console.log(`OctoFit API listening at ${apiBaseUrl} on port ${port}`)
})