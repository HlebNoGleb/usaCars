const express = require('express')
const router = express.Router()
const Post = require('../models/post')

// Getting all
router.get('/', async (req, res) => {
  let carsType = req.query.cars;
  let findCondition = {};
  if (carsType == 1) {
    // findCondition = deletedOnSite.site1.status = true;
  }
  try {
    const posts = await Post.find(/*{"deletedOnSite.site1.status": false}*/)
    res.json(posts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getPostById, (req, res) => {
  res.json(res.post)
})

router.get('/vin/:vin', getPostByVin, (req, res) => {
  res.json(res.post)
})

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Creating one
router.post('/', async (req, res) => {

  if(req.body.length > 1){
    Post.insertMany(req.body).then(function(){
      res.status(201).json(req.body)
    }).catch(function(error){
      res.status(400).json({ message: err.message })
    })
  } else {
    const post = new Post({
      albumId: req.body.name,
      id: req.body.fname,
      title: req.body.title,
      url: req.body.url,
      thumbnailUrl: req.body.thumbnailUrl,
    })
    try {
      const newPost = await post.save()
      res.status(201).json(newPost)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
})

// Updating One
router.patch('/:id', getPostById, async (req, res) => {

  res.post.deletedOnSite[req.body.site].status = req.body.status;

  try {
    res.post.markModified("deletedOnSite");
    const updatedPost = await res.post.save();
    res.json(updatedPost)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }

})

// Deleting One
router.delete('/:id', getPostById, async (req, res) => {
  try {
    await res.post.remove()
    res.json({ message: 'Deleted post' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getPostById(req, res, next) {
  let post
  try {
    post = await Post.findById(req.params.id)
    if (post == null) {
      return res.status(404).json({ message: 'Cannot find post' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.post = post
  next()
}

async function getPostByVin(req, res, next) {
  let post
  try {
    post = await Post.find(req.params)
    console.log(post);
    if (post == null) {
      return res.status(404).json({ message: 'Cannot find post' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.post = post
  next()
}

module.exports = router