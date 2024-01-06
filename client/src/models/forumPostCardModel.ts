import forumPostModel from "./forumPostModel";

/* Interface for community forum post card model*/
interface forumPostCardModel {
  post: forumPostModel;
  userId: string;
  handleDelete?: (postId: string) => void;
  handleEdit?: (post: forumPostModel) => void;
  isExpanded: boolean;
  handleExpandClick: (postId: string) => void;
  lastUpdatedDate?: Date;
}

export default forumPostCardModel;
