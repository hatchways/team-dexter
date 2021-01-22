const express = require('express');
const router = express.Router();
const { BadRequest, GeneralError } = require('../utils/errors');
const Course = require('../models/courses');
const University = require('../models/universities');

//GET all universities with populated courses
router.get("/", async function(req, res, next) {

    const allUniversities = await University.find()
    .populate({ path: 'courses', model: 'Course' })
    .catch(() => {
        return next(new GeneralError('Error connecting to database'));
    });
    res.send(allUniversities);
});

//GET university with universityId and populated courses
router.get('/:universityId', async function(req, res, next) {

    const universityId = req.params.universityId;
    try {
        const university = await University.findById({ _id: universityId })
        .populate({ path: 'courses', model: 'Course' })
        .catch((err) => {
            if (err.kind == 'ObjectId') {
                throw new BadRequest('Invalid University ID')
            }
            throw new GeneralError('Error connecting to database')
        });
        res.status(200).send(university);
    } catch (error) {
        next(error);
    }
});

router.get('/', async function (req, res, next) {
    const allUniversities = await University.find()
        .populate({ path: 'courses', model: 'Course' })
        .catch(() => {
            return res.status(500).send();
        });
    res.status(200).send(allUniversities);
});

//GET university with universityId and populated courses
router.get('/:universityId', async function (req, res, next) {
    const universityId = req.params.universityId;
    const university = await University.findById({
        _id: universityId,
    }).populate({ path: 'courses', model: 'Course' });
    res.status(200).send(university);
});

//POST create a new course and update university with the course id
router.post('/courses', async function (req, res, next) {
    const course = new Course(req.body);
    const { universityId } = req.body;
    if (!universityId) return next(new BadRequest('Missing required field'));
    try {
        const courseDoc = await course.save();
        await University.findByIdAndUpdate(req.body.universityId, { $push: { courses: courseDoc.id}})
            .catch((err) => {
                if (err.kind == "ObjectId") {
                    throw new BadRequest('Invalid Object ID')
                }
                throw new GeneralError('Error connecting to database')
            });
        res.sendStatus(201);
    } catch (error) {
       next(error);
    }
});

//POST create a new university
router.post('/', async function (req, res, next) {
    const university = new University(req.body);
    await university.save()
    .catch(() => { 
        return next(new GeneralError('Error connecting to database')); 
    });
    res.sendStatus(200);
});

module.exports = router;
