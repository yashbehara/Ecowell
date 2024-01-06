import * as feedbackServices from '../services/feedback-service.js';
import {setResponse,setErrorResponse} from '../controllers/response-handler.js';

//Controller to handle fetching user's feedback
export const get=async (request,response)=>{
    try{
        const params={...request.params};
        const feedback=await feedbackServices.fetchFeedback(params);
        setResponse(feedback, response);
    }catch(err){
        setErrorResponse(err,response);
    }

}

////Controller to handle adding a new feedback
export const post=async(request,response)=>{
    try{
        const newFeedback = {...request.body};
        const feedback = await feedbackServices.createFeedback(newFeedback);
        setResponse(feedback, response);
    }catch(err){
        setErrorResponse(err,response);
    }
}

//Controller to handle deleting feedback (for future use case)
export const remove =async (request,response)=>{
    try{
        const id = request.params.id; 
        const feedback = await feedbackServices.remove(id);
        setResponse(feedback,response);
    }catch (err){
        setErrorResponse(err,response);
    }
}