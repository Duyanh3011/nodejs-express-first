const express = require('express')
var router = express.Router()


const courseController = require('../app/controllers/CourseControllers')
router.get('/create', courseController.create)
router.post('/store', courseController.store)
router.post('/handle-form-actions', courseController.handleFormAction)
router.get('/:id/edit', courseController.edit)
router.put('/:id', courseController.update)
router.patch('/:id/restore', courseController.restore) //define muc dich su dung
router.delete('/:id', courseController.delete)
router.delete('/:id/force', courseController.forceDelete)
router.get('/:slug', courseController.show)

module.exports = router;