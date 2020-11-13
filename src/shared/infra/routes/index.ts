import toolsRouter from '@modules/tools/infra/http/routes/tools.routes'
import { Router } from 'express'

const routes = Router()

routes.use('/tools', toolsRouter)

export default routes
