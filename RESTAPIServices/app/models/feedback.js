import mongoose from 'mongoose';
const Schema=mongoose.Schema;

const FeedbackSchema=new Schema({
    rating:{
        type: Number,
        required:true,
    },
    description:{
        type: String ,
        required:true,
    },
    dateTime:{
        type: Date,
        required:true,
    },
    profileName:{
        type: String ,
        required:true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'userdetailsmodel', // Reference to the 'User' model
        required: true,
    },
},
);

// export the schema with collection name feedback
const feedbackModel=mongoose.model('feedback', FeedbackSchema);
export default feedbackModel;