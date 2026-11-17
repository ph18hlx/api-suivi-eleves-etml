import Teacher from '#models/teacher'
import type { HttpContext } from '@adonisjs/core/http'
import { teacherValidator } from '#validators/teacher'

export default class TeachersController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const teachers = await Teacher.query().orderBy('name').orderBy('firstname')
    return response.ok(teachers)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { name, firstname, email } = await request.validateUsing(teacherValidator)
    const teacher = await Teacher.create({ name, firstname, email })
    return response.created(teacher)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)
    if (!teacher) {
      return response.notFound()
    }
    return response.ok(teacher)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const { name, firstname, email } = await request.validateUsing(teacherValidator)
    const teacher = await Teacher.findOrFail(params.id)
    teacher.merge({ name, firstname, email })
    await teacher.save()
    return response.ok(teacher)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const teacher = await Teacher.findOrFail(params.id)
    await teacher.delete()
    return response.noContent(teacher)
  }
}
