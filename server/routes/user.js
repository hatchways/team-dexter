const express = require("express");
const router = express.Router();
const verifyAuth = require('../middleware/verifyAuth');
const User = require("../models/user");
const University = require("../models/universities");
const validateBody = require('../middleware/validateBody');
const validateCourseId = validateBody.course;
require("../models/courses");


// Get the logged in user
router.get("/", verifyAuth, async function(req, res) {
    const userId = req.body.userId;
    const userDoc = await User.findById(userId)
      .catch(() => { return null });
    return userDoc ? res.send(userDoc) : res.sendStatus(500);
})

// Gets all the current users courses
router.get("/course", verifyAuth, async function(req, res) {
    const userDoc = await User.findById({ _id: req.body.userId })
      .populate({path: 'courses', model: 'Course'})
      .catch(() => { return null });
    if (userDoc && userDoc.courses) {
        res.send(userDoc.courses);
    } else {
        res.sendStatus(500);
    }
})

// Adds a user to a course, sends the updated user
router.put("/course/add", [verifyAuth, validateCourseId], async function(req, res) {
    const {courseId, userId} = req.body;
    const userDoc = await User.findByIdAndUpdate(
      userId, 
      {$addToSet: { 'courses': courseId }},
      {useFindAndModify: false, new: true}
    ).populate({path: 'courses', model: 'Course'})
    .catch(() => { return null });
    res.status(userDoc ? 201 : 500);
    res.send(userDoc);
});

//Remove a user from a course, sends the updated user
router.put("/course/remove", [verifyAuth, validateCourseId], async function(req, res) {
    const {courseId, userId} = req.body;
    const userDoc = await User.findByIdAndUpdate(
      userId, 
      {$pull: { 'courses': courseId }},
      {useFindAndModify: false, new: true}
    ).populate({path: 'courses', model: 'Course'})
    .catch(() => { return null });
    res.status(userDoc ? 201 : 500);
    res.send(userDoc);
});

//Assign a user to a University, sends the updated user
router.put("/university/enroll", verifyAuth, async function(req, res) {
    const {universityId, userId} = req.body;
    if (!universityId) res.sendStatus(400);
    const session = await User.startSession();
    session.startTransaction();
    try {
        const opts = { session };
        const userDoc = await User.findByIdAndUpdate(
          userId, 
          {university: universityId},
          opts,
        );
        if (userDoc.university) {
            await University.findByIdAndUpdate(
                userDoc.university,
                {$pull: { 'students': userId }},
                opts,
            );
        }
        await University.findByIdAndUpdate(
            universityId,
            {$addToSet: { 'students': userId }},
            opts
        );
        await session.commitTransaction();
        session.endSession();
        res.status(userDoc ? 201 : 500);
        return res.send(userDoc);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.sendStatus(500);
    }
});

module.exports = router;
