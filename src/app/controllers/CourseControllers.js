const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose')
class CourseControllers {
    //[GET] /course/:slug
    async show(req, res, next) {
        await Course.where({ slug: req.params.slug }).findOne()
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course)
                })
            })
            .catch(next)
    }
    //[GET] /course/create
    async create(req, res, next) {
        res.render('courses/create')
    }

    //[POST] /course/store
    store(req, res, next) {
        const formDate = req.body;
        formDate.image = `https://img.youtube.com/vi/${req.body.videoID}/0.jpg`
        formDate._id = 1
        const course = new Course(formDate)
        course.save()
            .then(() => {
                res.redirect('/me/stored/courses')
            })
            .catch(next)
    }

    //[GET] /course/edit
    async edit(req, res, next) {
        await Course.findById(req.params.id)
            .then((course) => {
                res.render('courses/edit', {
                    course: mongooseToObject(course)
                })
            })
            .catch(err => { })
    }

    //[PUT] /course/:id
    async update(req, res, next) {
        // res.json(req.body)
        await Course.updateOne({ _id: req.params.id }, req.body)
            .then((course) => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    //[DELETE] /course/:id
    async delete(req, res, next) {
        // res.json(req.body)
        await Course.delete({ _id: req.params.id })
            .then((course) => res.redirect('back'))
            .catch(next)
    }

    //[DELETE] /course/:id/force
    async forceDelete(req, res, next) {
        // res.json(req.body)
        await Course.deleteOne({ _id: req.params.id })
            .then((course) => res.redirect('back'))
            .catch(next)
    }

    //[PATCH] /course/:id/restore
    async restore(req, res, next) {
        await Course.restore({ _id: req.params.id })
            .then((course) => res.redirect('back'))
            .catch(next)
    }

    //[POST] courses/handle-form-actions
    async handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                await Course.delete({ _id: { $in: req.params.checkBoxCoures} })
                    .then((course) =>{
                        console.log(req.body.checkBoxCoures)
                        res.redirect('back')})
                    .catch(next); break;
            default:
                res.json({ message: 'Action is invalid',
                    action: req.body.action
                 })
        }
        // res.json(req.body.checkBoxCoures)
    }
}

module.exports = new CourseControllers();