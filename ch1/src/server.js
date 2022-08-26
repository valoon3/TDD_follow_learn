const express = require('express');
const port = 3000;
const app = express();
const productRoutes = require('./routes');
const mongoose = require('mongoose');



// mongoose.connect('mongodb+srv://root:1234@cluster0.uuohiyx.mongodb.net/hello?retryWrites=true&w=majority', {
// mongoose.connect('mongodb://root:1234@localhost:27017/hello', {
mongoose.connect('mongodb://root:1234@localhost:27017/hello', { // 몽구스 테스트 중
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => { console.log('성공')})
    .then((err) => {
        console.error('asdf', err);
    })

app.use(express.json());

app.use('/', productRoutes);

app.listen(port, () => {
    console.log(`running on port ${port}`);
})