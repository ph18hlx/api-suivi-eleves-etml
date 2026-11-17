import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      // Ajout des colonnes name et firstname
      table.string('name').notNullable()
      table.string('firstname').notNullable()

      // Relation : 1 élève → 1 classe
      table
        .integer('class_group_id') // colonne class_group_id correspondant à la classe de l'élève
        .unsigned() // la valeur ne peut pas être négative
        .notNullable() // un élève doit obligatoirement appartenir à une classe
        .references('id') // class_group_id fait référence à la colonne id d'une autre table
        .inTable('class_groups') // précise dans quelle table se trouve la colonne id référencée

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
