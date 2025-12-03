const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('connected to mongoDB...'))
    .catch(err => console.error('could not connect to mogoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

async function createCourse() {
    const Course = mongoose.model('Course', courseSchema);
    const course = new Course({
        name: 'Angular Tutorial',
        author: 'Masud',
        tags: ['Angular', 'frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const Course = mongoose.model('Course', courseSchema)
    const courses = await Course
        .find({ author: 'Masud', isPublished: true })
        .limit(10)
        .sort({name: 1})
        .select({tags: 1, name: 1});
    console.log(courses);
}

getCourses();
