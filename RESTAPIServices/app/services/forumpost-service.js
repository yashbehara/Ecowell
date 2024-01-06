import ForumPost from "../models/forumpost.js";

// service to to save a community forum post created by user
export const save = async(newPost) => {
  const forumPost = new ForumPost(newPost);
  const savedPost = await forumPost.save();
  return savedPost;
}

// service to to get all the posts in community forum
export const search = async (params = {}) => {
  const forumPosts = await ForumPost.find(params).exec();
  return forumPosts;
}

// service to to get a post by ID in community forum
export const getPostById = async (id) => {
  const forumPost = await ForumPost.findById(id).exec();
  return forumPost;
}

// service to update a community forum post 
export const update = async(updatedPost, id) => {
  const post = await ForumPost.findByIdAndUpdate(id, updatedPost, {new: true}).exec();
  return post;
}

// service to delete a post in the community forum
export const remove = async(id) => {
  await ForumPost.findByIdAndDelete(id).exec();
}