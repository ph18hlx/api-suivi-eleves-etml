import { StudentSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import ClassGroup from '#models/class_group'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Comment from '#models/comment'

export default class Student extends StudentSchema {
  // Relation : 1 élève -> 1 classe
  @belongsTo(() => ClassGroup)
  declare classGroup: BelongsTo<typeof ClassGroup>

  // Relation : 1 élève -> N commentaires
  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>
}
