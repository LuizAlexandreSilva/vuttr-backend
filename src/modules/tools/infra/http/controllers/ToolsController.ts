import CreateToolService from '@modules/tools/services/CreateToolService'
import DeleteToolService from '@modules/tools/services/DeleteToolService'
import GetToolsService from '@modules/tools/services/GetToolsService'
import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class ToolsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { tag } = request.query

    const getTools = container.resolve(GetToolsService)

    const tools = await getTools.execute(tag?.toString())

    return response.json(classToClass(tools))
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description, tags, link } = request.body

    const createTool = container.resolve(CreateToolService)

    const tool = await createTool.execute({
      title,
      link,
      description,
      tags,
    })

    return response.status(201).json(tool)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteTool = container.resolve(DeleteToolService)

    await deleteTool.execute(Number(id))

    return response.status(204).json()
  }
}
