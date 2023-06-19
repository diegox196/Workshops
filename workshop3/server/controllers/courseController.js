const Course = require("../models/courseModel");

/**
 * Get all courses or one
 *
 * @param {*} req
 * @param {*} res
 */
const courseGet = (req, res) => {
  // if an specific teacher is required

  if (req.query && req.query.id) {
    Course.findById(req.query.id).populate('teacher')
      .then((course) => {
        res.json(course);
      })
      .catch(err => {
        res.status(404);
        console.log('error while queryting the course', err)
        res.json({ error: "Course doesnt exist" })
      });
  } else {

    const { name, sort } = req.query;
    
    const query = Course.find();

    if (name) {
      query.where({ name: { $regex: name, $options: "i" } });
    }

    if (sort === "asc") {
      query.sort({ name: 1 });
    } else if (sort === "desc") {
      query.sort({ name: -1 });
    }

    query.populate('teacher')
      .then(courses => {
        res.json(courses);
      })
      .catch(err => {
        res.status(422);
        res.json({ "error": err });
      });
  }
};



module.exports = {
  courseGet,
}