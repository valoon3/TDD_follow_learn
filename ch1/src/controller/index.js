const router = require('express').Router();
const fs = require('fs');

// TODO: 지금 경로 하드 코딩으로 잡혀있음 .env 로 나중에 수정 필요
const filenameList = fs.readdirSync('./controller');

filenameList.forEach((fileName) => {
  if(fileName !== 'index.js') {
    const moduleRouter = require('./' + fileName);

    // 파일 이름을 그대로 라우터 미들 네임으로 사용
    const path = fileName.replace('.js', '');

    router.use('/' + path, moduleRouter);
  }
});

module.exports = router;

