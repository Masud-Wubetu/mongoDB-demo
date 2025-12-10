const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('connected to mongoDB...'))
    .catch(err => console.error('could not connect to mogoDB...', err));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        //match: /pattern/
    },

    category: {
        type: String,
        required: true,
        enum: [ 'web', 'mobile', 'network' ],
        lowercase: true,
        trim: true
    },

    author: String,
    tags: {
        type: Array,
        required: true,
        validate: {
            validator: function(v) {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(v && v.length > 0);
                    }, 4000);
                });
            },
            message: 'A course should have atleast one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished },
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Tutorial',
        category: 'Web',
        author: 'Masud',
        tags: ['frontend'],
        isPublished: true,
        price: 11.4
    });

    try {
        // await course.validate();
        const result = await course.save();
        console.log(result);
    }
    catch(ex) {
        for(field in ex.errors) 
            console.log(ex.errors[field].message);

    }
    
}

async function getCourses() {
    pageNumber = 2;
    pageSize = 10;
    const courses = await Course
        .find({ _id: '6939acec95c1c721e50e2575' })
        //.find({ price: { $gte: 10, $lte: 15}})
        //.find({price: {$in: [10, 15, 25]}})
        // .find({author: /mosh/})
        // .find({author: /^Mosh/i})
        // .find({author: /Hamedani$/i})
        //.find({author: /.*masud.*/i})

        //.or([{ author: 'Masud'}, {isPublished: true }]).
        // .and([{ author: 'Masud'}, { isPublished: true }])
        //.skip((pageNumber - 1) * pageSize)
        //.limit(pageSize)
        .sort({name: 1})
        //.countDocuments();
        .select({tags: 1, name: 1, price: 1});
    console.log(courses[0].price);
}

async function removeCourse(id) {
   //const result = await Course.deleteOne({ _id: id});
   //const result = await Course.deleteMany({ _id: id});
   const course = await Course.findByIdAndDelete(id);
   console.log(course);
}

getCourses();
//removeCourse('6930857c8900f36e07f87fa4');

