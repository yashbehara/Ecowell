import UserFeedback from "models/userFeedbackModel";
import * as restService from "services/baseService";

const userFeedbackResourcePath = "/feedback/";

/* Service to post user's feedback */
export const postUserFeedback = async (
  userFeedback: UserFeedback
): Promise<UserFeedback> => {
  try {
    const userFeedbackData = await restService.postData<UserFeedback>(
      userFeedbackResourcePath,
      userFeedback
    );
    return userFeedbackData;
  } catch (error) {
    console.error("Error posting user feedback:", error);
    throw error;
  }
};
