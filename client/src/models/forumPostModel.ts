/* Interface for community forum post model*/
interface forumPostModel {
  _id?: string;
  authorId: string;
  authorName: string;
  postTitle: string;
  postDescription: string;
  image?:
    | {
        data: Buffer | string;
        contentType: string;
      }
    | string;
  createdDate?: Date;
  lastUpdatedDate?: Date;
}

export default forumPostModel;
