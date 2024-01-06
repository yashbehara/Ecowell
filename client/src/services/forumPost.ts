import forumPostModel from "models/forumPostModel";
import * as restService from "../services/baseService";

const forumPostCreateAndReadURL = "/community-forum/posts";
const forumPostUpdateDeleteReadOneURL = "/community-forum/posts/{id}";


/* Service to create a community forum post */
export const createForumPost = async (
  forumPost: forumPostModel
): Promise<forumPostModel> => {
  try {
    const response = await restService.postData<forumPostModel>(
      forumPostCreateAndReadURL,
      forumPost
    );
    return response;
  } catch (error) {
    console.error("Error creating forum post:", error);
    throw error;
  }
};


/* Service to fetch all community forum posts */
export const getForumPosts = async (): Promise<forumPostModel[]> => {
  try {
    const forumPosts = await restService.getData<forumPostModel[]>(
      forumPostCreateAndReadURL,
      {}
    );
    return forumPosts;
  } catch (error) {
    console.error("Error fetching forum posts:", error);
    throw error;
  }
};


/* Service to fetch a community forum post by id */
export const getForumPostById = async (
  forumPostId: string
): Promise<forumPostModel> => {
  try {
    const updatedURL = forumPostUpdateDeleteReadOneURL.replace(
      "{id}",
      forumPostId
    );
    const response = await restService.getDataById<forumPostModel>(
      updatedURL,
      forumPostId,
      {}
    );
    return response;
  } catch (error) {
    console.error("Error fetching forum post by ID:", error);
    throw error;
  }
};


/* Service to update a community forum post */
export const updateForumPost = async (
  forumPostId: string,
  updatedForumPost: forumPostModel
): Promise<forumPostModel> => {
  try {
    const updatedURL = forumPostUpdateDeleteReadOneURL.replace(
      "{id}",
      forumPostId
    );
    const response = await restService.updateData<forumPostModel>(
      updatedURL,
      updatedForumPost
    );
    return response;
  } catch (error) {
    console.error("Error updating forum post:", error);
    throw error;
  }
};


/* Service to delete a community forum post by id*/
export const deleteForumPost = async (forumPostId: string): Promise<void> => {
  try {
    const updatedURL = forumPostUpdateDeleteReadOneURL.replace(
      "{id}",
      forumPostId
    );
    await restService.deleteData<forumPostModel>(updatedURL);
  } catch (error) {
    console.error("Error deleting forum post:", error);
    throw error;
  }
};
