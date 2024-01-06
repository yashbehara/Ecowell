import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ForumPostSchema = new Schema({
  authorId:{
    type: Schema.Types.ObjectId,
    ref: 'userdetailsmodel', // Reference to the 'User' model
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  postTitle: {
    type: String,
    required: true
  },
  postDescription: {
    type: String,
    required: true
  },
  authorEmail: {
    type: String,
  },
  
  image: {
    type: String, 
    default: "", 
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  lastUpdatedDate: {
    type: Date,
    default: Date.now
  },
});

// export the schema with collection name forumpost
const ForumPostModel = mongoose.model('forumpost',ForumPostSchema);
export default ForumPostModel;