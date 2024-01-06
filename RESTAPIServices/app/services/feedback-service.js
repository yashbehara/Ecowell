import Feedback from '../models/feedback.js';

//CRUD Operations here
//user will see all the existing feedback
export const fetchFeedback = async (params = {}) => {
    const feedback = await Feedback.find(params).exec();
    return feedback;
}

//user will create feedback
export const createFeedback = async (newFeedback) => {
    const feedback = new Feedback(newFeedback);
    return feedback.save();
}

//user will delete feedback (for future use case)
export const remove = async(id)=>{
    await Feedback.findByIdAndDelete(id).exec();
    return;
}