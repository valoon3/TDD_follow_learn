const mongoose = require("mongoose");

// 몽고디비 보충 설명
// 일치하는 개념
//
// RDBMS    |    MongoDB
// Tables   |    Collections
// Rows     |    Documents
// columns  |    Fields

const atlasUri = 'mongodb+srv://root:1234@cluster0.uuohiyx.mongodb.net/bhdatabase?retryWrites=true&w=majority';

module.exports = function() {
  mongoose.connect(
      atlasUri,
      { useNewUrlParser: true },
  )
      .then(() => {
        console.log('connected mongoDB success');
      })
      .catch(() => {
        console.log('connected mongoDB fail');
      })
}