import ICreateToolDTO from '@modules/tools/dtos/ICreateToolDTO'
import AppError from '@shared/errors/AppError'
import { DeepPartial, getRepository, Repository } from 'typeorm'
import IToolsRepository from '../../../repositories/IToolsRepository'
import Tag from '../entities/Tag'
import Tool from '../entities/Tool'
import ToolTag from '../entities/ToolTag'

class ToolsRepository implements IToolsRepository {
  private ormRepository: Repository<Tool>
  private tagsOrmRepository: Repository<Tag>
  private toolTagsRepository: Repository<ToolTag>

  constructor() {
    this.ormRepository = getRepository(Tool)
    this.tagsOrmRepository = getRepository(Tag)
    this.toolTagsRepository = getRepository(ToolTag)
  }

  public async findByTitle(title: string): Promise<Tool | undefined> {
    const tool = await this.ormRepository.findOne({ where: { name: title } })

    return tool
  }

  public async getAll(tag?: string): Promise<Tool[]> {
    let tools: Tool[]

    if (tag?.length) {
      tools = await this.ormRepository
        .createQueryBuilder('tool')
        .select([
          'tool.id',
          'tool.name',
          'tool.link',
          'tool.description',
          'tag',
        ])
        .innerJoin('tool.tags', 'tag', 'tag.name = :tag', { tag })
        .getMany()
    } else {
      tools = await this.ormRepository
        .createQueryBuilder('tool')
        .select([
          'tool.id',
          'tool.name',
          'tool.link',
          'tool.description',
          'tag.name',
        ])
        .leftJoin('tool.tags', 'tag')
        .getMany()
    }

    return tools
  }

  public async create(data: ICreateToolDTO): Promise<Tool> {
    const tags = await this.createNonExistsTags(data.tags)

    const tool = this.ormRepository.create({
      name: data.title,
      link: data.link,
      description: data.description,
      tool_tags: tags,
    })

    await this.ormRepository.save(tool)

    return tool
  }

  public async delete(id: number): Promise<void> {
    const tool = await this.ormRepository.findOne(id, {
      relations: ['tags'],
    })

    if (!tool) {
      throw new AppError('Tool does not exist')
    }

    if (tool?.tags) {
      await Promise.all(
        tool?.tags.map(async tag => {
          const count = await this.toolTagsRepository.count({
            where: { tag_id: tag.id },
          })

          if (count === 1) {
            await this.tagsOrmRepository.delete({ id: tag.id })
          }
        }),
      )
    }

    await this.ormRepository.delete({ id })
  }

  private async createNonExistsTags(
    tags: string[],
  ): Promise<DeepPartial<ToolTag>[]> {
    const allTags: DeepPartial<ToolTag>[] = await Promise.all(
      tags.map(async tag => {
        const tagExist = await this.tagsOrmRepository.findOne({
          where: { name: tag },
        })

        if (tagExist) {
          return {
            tag_id: tagExist.id,
          }
        }
        const newTag = this.tagsOrmRepository.create({ name: tag })

        await this.tagsOrmRepository.save(newTag)

        return { tag_id: newTag.id }
      }),
    )
    return allTags
  }
}

export default ToolsRepository
