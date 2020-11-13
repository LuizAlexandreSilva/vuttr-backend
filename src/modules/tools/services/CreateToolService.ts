import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import ICreateToolDTO from '../dtos/ICreateToolDTO'
import Tool from '../infra/typeorm/entities/Tool'
import IToolsRepository from '../repositories/IToolsRepository'

@injectable()
class CreateToolService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository,
  ) {}

  public async execute(data: ICreateToolDTO): Promise<Tool> {
    let tool = await this.toolsRepository.findByTitle(data.title)

    if (tool) {
      throw new AppError('Tool already exists')
    }

    tool = await this.toolsRepository.create(data)

    return tool
  }
}

export default CreateToolService
