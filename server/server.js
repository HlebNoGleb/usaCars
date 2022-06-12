require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const request = require('request')
const Post = require('../server/models/post')
const schedule = require('node-schedule')
const fs = require("fs");
const path = require('path');
let totalSkipCount = 0;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, autoIndex: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json())

const directoryPath = path.join(__dirname, 'images')

app.use('/images', express.static(__dirname + '/images'));
// app.use(express.static(__dirname + '/images'));

const postsRouter = require('./routes/posts')
app.use('/posts', postsRouter)

app.listen(3001, () => console.log('Server Started'))

// const getUsersSchedule = schedule.scheduleJob('*/5 * * * * *', function(){
//   getUsers();
// });

// const downloadImagesSchedule = schedule.scheduleJob('*/10 * * * * *', function(){
//   let newSkipCount = downloadImages(totalSkipCount);
//   totalSkipCount = newSkipCount;
// });

async function downloadImages(skipCount){
  console.log(skipCount);
  Post.find({imageDownloaded: false}).limit(10).skip(skipCount).then(function(posts){
    console.log(posts.length);
    posts.forEach(function(post){
      const dir = './images/' + post.id + '/';
      const file = dir + post.id + '.jpg';
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }

      // post.url.forEach(function(url){
      //   request(url).pipe(
      //     fs.createWriteStream(file)).on('close',
      //     function(){
      //       Post.findOneAndUpdate({id: post.id}, {imageDownloaded: true}).then(function(){
      //       console.log('Image downloaded');
      //     });
      //   });
      // });

      request(post.url).pipe(
        fs.createWriteStream(file)).on('close',
        function(){
          Post.findOneAndUpdate({id: post.id}, {imageDownloaded: true}).then(function(){
          console.log('Image downloaded');
        });
      });
    });
  });

  return totalSkipCount += 10;
}

function getUsers() {
  request('https://jsonplaceholder.typicode.com/photos?_page=0&_limit=100', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      Post.insertMany(JSON.parse(body), {ordered: false}).then(function(){
        console.log('Inserted');
      }).catch(function(error){
        console.log(error)
      })
    }
  });
}
