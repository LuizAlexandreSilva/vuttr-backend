import { Exclude, Expose } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import Tag from './Tag'
import ToolTag from './ToolTag'

@Entity('tools')
class Tool {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column()
  link: string

  @OneToMany(() => ToolTag, toolTag => toolTag.tool, {
    cascade: ['insert'],
  })
  tool_tags: ToolTag[]

  @Exclude()
  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'tool_tags',
    joinColumn: { name: 'tool_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tag[]

  @Column()
  description?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Expose({ name: 'tags' })
  parseTags(): string[] {
    return this.tags.map(tag => tag.name)
  }
}

export default Tool
