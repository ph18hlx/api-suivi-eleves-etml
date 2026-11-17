import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { StudentFactory } from '#database/factories/student_factory'
import ClassGroup from '#models/class_group'

export default class extends BaseSeeder {
  async run() {
    // Récupération des classes (créées par le seeder précédent)
    const classGroups = await ClassGroup.all()

    // Chaque classe reçoit 5 élèves
    for (const classGroup of classGroups) {
      await StudentFactory.merge({ classGroupId: classGroup.id }).createMany(5)
    }
  }
}
