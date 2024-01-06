import { setErrorResponse, setResponse } from "./response-handler.js";

// Import Services
import * as ForumPostService from "../services/forumpost-service.js";

// Controller to fetch all community forum posts from database
export const find = async (request, response) => {
  try {
    const params = { ...request.query };
    const forumPosts = await ForumPostService.search(params);
    setResponse(forumPosts, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

// Controller to fetch one community forum posts from database
export const findById = async (request, response) => {
  try {
    const postId = request.params.postId;
    const forumPost = await ForumPostService.getPostById(postId);
    setResponse(forumPost, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};


// Controller to create a community forum post in the database
export const post = async (request, response) => {
  try {
    const newPost = { ...request.body };
    const forumPost = await ForumPostService.save(newPost);
    setResponse(forumPost, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

//Controller to update a community forum post in database
export const put = async (request, response) => {
  try {
    const postId = request.params.postId;
    const updatedForumPost = { ...request.body, lastUpdatedDate: new Date() };
    const forumPost = await ForumPostService.update(updatedForumPost, postId);
    setResponse(forumPost, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

// Controller to delete a community forum post from database
export const remove = async (request, response) => {
  try {
    const postId = request.params.postId;
    const post = await ForumPostService.remove(postId);
    setResponse({}, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};
