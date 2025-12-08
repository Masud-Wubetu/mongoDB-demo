const moongose = require('mongoose');

moongose.connect('mongodb://localhost/mongo-exercises');

const courseSchema = new moongose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = moongose.model('Course', courseSchema);
async function getCourses() {
    return await Course
        .find({ isPublished: true })
        .or([{ tags: 'backend'}, { tags: 'frontend'}])
        .sort({ price: -1 })
        .select({ name: 1, author: 1, price: 1 })
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();