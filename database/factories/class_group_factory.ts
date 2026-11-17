import Factory from '@adonisjs/lucid/factories'
import ClassGroup from '#models/class_group'

export const ClassGroupFactory = Factory.define(ClassGroup, async ({ faker }) => {
  return {
    name: faker.word.words(2),
  }
}).build()
