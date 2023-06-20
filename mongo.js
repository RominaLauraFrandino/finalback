const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://rlfrandino84:19Octu84@cluster0.5pbphc2.mongodb.net/isvdr';

mongoose.connect(connectionString)
    .then(() => {
        console.log('Database connected')
    })
    .catch(err => {
        console.error(err)
    })