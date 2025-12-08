const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('connected to mongoDB...'))
    .catch(err => console.error('could not connect to mogoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Tutorial',
        author: 'Masud',
        tags: ['Angular', 'frontend'],
        isPublished: true,
        price: 11
    });
    
    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    pageNumber = 2;
    pageSize = 10;
    const courses = await Course
        //.find({ author: 'Masud', isPublished: true })
        //.find({ price: { $gte: 10, $lte: 15}})
        //.find({price: {$in: [10, 15, 25]}})
        // .find({author: /mosh/})
        // .find({author: /^Mosh/i})
        // .find({author: /Hamedani$/i})
        .find({author: /.*masud.*/i})

        //.or([{ author: 'Masud'}, {isPublished: true }]).
        // .and([{ author: 'Masud'}, { isPublished: true }])
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({name: 1})
        .countDocuments();
        //.select({tags: 1, name: 1});
    console.log(courses);
}

async function updateCourse(id) {
   const course = await Course.findByIdAndUpdate( id, {
    $set: {
        author: 'jack',
        isPublished: true,
    }
   }, {new: true});
   console.log(course);
}

updateCourse('6930857c8900f36e07f87fa4');
