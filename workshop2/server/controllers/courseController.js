const Course = require("../models/courseModel");

/**
 * Creates a course
 *
 * @param {*} req
 * @param {*} res
 */
const coursePost = async (req, res) => {
  let course = new Course(req.body);
  await course.save()
    .then(course => {
      res.status(201); // CREATED
      res.header({
        'location': `/api/courses/?id=${course.id}`
      });
      res.json(course);
    })
    .catch( err => {
      res.status(422);
      console.log('error while saving the course', err);
      res.json({
        error: 'There was an error saving the course'
      });
    });
};

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
      .then( (course) => {
        res.json(course);
      })
      .catch(err => {
        res.status(404);
        console.log('error while queryting the course', err)
        res.json({ error: "Course doesnt exist" })
      });
  } else {
    // get all teachers
    Course.find().populate('teacher')
      .then( courses => {
        res.json(courses);
      })
      .catch(err => {
        res.status(422);
        res.json({ "error": err });
      });
  }
};


const coursePut = async (req, res) => {
  try {
    const courseId = req.query.id;
    const updatedCourse = req.body;

    const course = await Course.findByIdAndUpdate(courseId, updatedCourse, { new: true });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error('Error updating the course', error);
    res.status(500).json({ error: 'There was an error updating the course' });
  }
};

const courseDelete = async (req, res) => {
  try {
    const courseId = req.query.id;

    const course = await Course.findByIdAndRemove(courseId);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting the course', error);
    res.status(500).json({ error: 'There was an error deleting the course' });
  }
};



module.exports = {
  coursePost,
  courseGet,
  coursePut,
  courseDelete,
}