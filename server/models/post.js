const mongoose = require('mongoose')
var randtoken = require('rand-token');

var deletedOnSite1 = new mongoose.Schema({
  site1 : {type : Boolean, default : false},
  site2 : {type : Boolean, default : false},
  site3 : {type : Boolean, default : false},
  site4 : {type : Boolean, default : false},
  site5 : {type : Boolean, default : false},
  site6 : {type : Boolean, default : false},
  site7 : {type : Boolean, default : false},
  site8 : {type : Boolean, default : false},
  site9 : {type : Boolean, default : false}
});

const postSchema = new mongoose.Schema({
  albumId: {
    type: Number,
    required: true
  },
  id: {
    type: Number,
    index: true,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    required: true
  },
  imageDownloaded:{
    type: Boolean,
    default: false,
  },
  vin:{
    type: String,
    default: function() {
      var token = randtoken.generate(4);
      return token;
    },
  },
  deletedOnSite: {
    type: Object,
    default: {
      site1: {status: false},
      site2: {status: false},
      site3: {status: false},
    },
  }
})



module.exports = mongoose.model('Post', postSchema)