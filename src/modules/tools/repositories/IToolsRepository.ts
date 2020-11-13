import ICreateToolDTO from '../dtos/ICreateToolDTO'
import Tool from '../infra/typeorm/entities/Tool'

export default interface IToolsRepository {
  findByTitle(title: string): Promise<Tool | undefined>
  getAll(tag?: string): Promise<Tool[]>
  create(data: ICreateToolDTO): Promise<Tool>
  delete(id: number): Promise<void>
}
