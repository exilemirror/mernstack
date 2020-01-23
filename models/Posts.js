const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      comment:
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: date,
        default: Date.now
      }
    }
  ],
  date: {
    type: date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostsSchema);