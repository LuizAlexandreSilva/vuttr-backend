import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import Tag from './Tag'
import Tool from './Tool'

@Entity('tool_tags')
class ToolTag {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('integer')
  tool_id: number

  @ManyToOne(() => Tool, tool => tool.id)
  @JoinColumn({ name: 'tool_id' })
  tool: Tool

  @Column('integer')
  tag_id: number

  @ManyToOne(() => Tag, tag => tag.id)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}

export default ToolTag
