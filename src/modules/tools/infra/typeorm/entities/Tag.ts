import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import Tool from './Tool'

@Entity('tags')
class Tag {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ name: 'tool_id' })
  toolId: number

  @ManyToOne(() => Tool, tool => tool.tags)
  tool: Tool

  @Column()
  name: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}

export default Tag
