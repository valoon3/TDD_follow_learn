const express = require('express');
const port = 3000;
const app = express();
const connectMongoDB = require('./model/mongoDbConnect');
const integrationRouter = require('./controller/index.js');

// 몽고디비 연결
connectMongoDB();

// 미들웨어 설정
app.use(express.json());

// 모든 라우터
app.use('/api', integrationRouter);

app.get("/", (req, res) => {
    res.send('root page test');
})

app.listen(port, () => {
    console.log(`running on port ${port}`);
});