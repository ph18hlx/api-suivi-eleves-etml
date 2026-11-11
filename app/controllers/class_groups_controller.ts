import ClassGroup from '#models/class_group'
import type { HttpContext } from '@adonisjs/core/http'
import { classGroupValidator } from '#validators/class_group'

export default class ClassGroupsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const classGroups = await ClassGroup.query().orderBy('name')
    return response.ok(classGroups)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { name } = await request.validateUsing(classGroupValidator)
    const classGroup = await ClassGroup.create({ name })
    return response.created(classGroup)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const classGroup = await ClassGroup.findOrFail(params.id)
    if (!classGroup) {
      return response.notFound()
    }
    return response.ok(classGroup)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const { name } = await request.validateUsing(classGroupValidator)
    const classGroup = await ClassGroup.findOrFail(params.id)
    classGroup.merge({ name })
    await classGroup.save()
    return response.ok(classGroup)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const classGroup = await ClassGroup.findOrFail(params.id)
    await classGroup.delete()
    return response.noContent(classGroup)
  }
}
