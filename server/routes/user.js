const express = require('express');
const router = express.Router();
const verifyAuth = require('../middleware/verifyAuth');
const User = require('../models/user');
const University = require('../models/universities');
const { BadRequest, GeneralError } = require('../utils/errors');
require('../models/courses');

// Get the logged in user
router.get('/', verifyAuth, async function (req, res, next) {
    const userId = req.body.userId;
    const userDoc = await User.findById(userId)
        .populate({ path: 'courses', model: 'Course' })
        .select('-password')
        .catch(() => {
            return next(
                new GeneralError('Error Establishing a Database Connection')
            );
        });

    return res.send(userDoc);
});

// Gets all the current users courses
router.get('/courses', verifyAuth, async function (req, res, next) {
    const userDoc = await User.findById({ _id: req.body.userId })
        .populate({ path: 'courses', model: 'Course' })
        .catch(() => {
            return next(
                new GeneralError('Error Establishing a Database Connection')
            );
        });

    if (userDoc && userDoc.courses) {
        res.send(userDoc.courses);
    } else {
        next(new GeneralError('No user found.'));
    }
});

// Adds a user to a course, sends the updated user
router.put('/courses/:courseId', verifyAuth, async function (req, res, next) {
    const courseId = req.params.courseId;
    const userId = req.body.userId;
    try {
        const userDoc = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { courses: courseId } },
            { useFindAndModify: false, new: true }
        )
            .populate({ path: 'courses', model: 'Course' })
            .catch(err => {
                if (err.kind == 'ObjectId') {
                    throw new BadRequest('Invalid Course ID');
                }
                throw new GeneralError(
                    'Error Establishing a Database Connection'
                );
            });
        res.status(201);
        res.send(userDoc);
    } catch (err) {
        next(err);
    }
});

// updates a user based on selected courses id
router.post('/courses', verifyAuth, async function (req, res, next) {
    const userId = req.body.userId;
    console.log(userId);
    try {
        const user = await User.findByIdAndUpdate(userId, {
            courses: req.body,
        });
        if (!user)
            return res.status(400).json({ message: 'Can not update user' });
        res.status(200).json({ user });
    } catch (err) {
        console.log(err.message);
        res.send('Server Error');
    }
});

//Remove a user from a course, sends the updated user
router.delete('/courses/:courseId', verifyAuth, async function (req, res) {
    const courseId = req.params.courseId;
    const userId = req.body.userId;
    try {
        const userDoc = await User.findByIdAndUpdate(
            userId,
            { $pull: { courses: courseId } },
            { useFindAndModify: false, new: true }
        )
            .populate({ path: 'courses', model: 'Course' })
            .catch(err => {
                if (err.kind == 'ObjectId') {
                    throw new BadRequest('Invalid Course ID');
                }
                throw new GeneralError(
                    'Error Establishing a Database Connection'
                );
            });
        res.status(201);
        res.send(userDoc);
    } catch (err) {
        next(err);
    }
});

//Assign a user to a University, sends the updated user
router.put(
    '/universities/:universityId',
    verifyAuth,
    async function (req, res, next) {
        const universityId = req.params.universityId;
        const userId = req.body.userId;
        const session = await User.startSession();
        session.startTransaction();
        try {
            const opts = { session };
            const userDoc = await User.findByIdAndUpdate(
                userId,
                { university: universityId },
                opts
            ).catch(err => {
                if (err.kind == 'ObjectId') {
                    throw new BadRequest('Invalid University ID');
                }
                throw new GeneralError(
                    'Error Establishing a Database Connection'
                );
            });
            if (userDoc.university) {
                await University.findByIdAndUpdate(
                    userDoc.universityId,
                    { $addToSet: { students: userId } },
                    opts
                );
            }
            await University.findByIdAndUpdate(
                universityId,
                { $addToSet: { students: userId } },
                opts
            );
            await session.commitTransaction();
            session.endSession();
            res.status(201);
            return res.send(userDoc);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            next(error);
        }
    }
);

module.exports = router;
