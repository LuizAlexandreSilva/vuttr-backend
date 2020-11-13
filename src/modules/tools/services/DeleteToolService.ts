import { inject, injectable } from 'tsyringe'
import IToolsRepository from '../repositories/IToolsRepository'

@injectable()
class DeleteToolService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    return await this.toolsRepository.delete(id)
  }
}

export default DeleteToolService
