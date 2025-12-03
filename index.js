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
createCourse();