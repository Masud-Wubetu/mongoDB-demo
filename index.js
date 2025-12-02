const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('connected to mongoDB...'))
    .catch(err => console.error('could not connect to mogoDB...', err));