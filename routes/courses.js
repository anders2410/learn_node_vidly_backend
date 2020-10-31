const express = require('express');
const router = express.Router();

const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"},
]

router.get("/", (req, res) => {
    res.send(courses);
});

router.get("/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found.')
    res.send(course);
});

module.exports = router;