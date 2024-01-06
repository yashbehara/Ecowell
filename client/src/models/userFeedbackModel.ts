/* Interface for user feedback model*/
interface UserFeedback {
  rating: number;
  description: string;
  dateTime: string;
  profileName: string;
  userId:string;
}

export default UserFeedback;
