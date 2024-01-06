import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserDetailsSchema = new Schema(
  {
    Personal_Details: {
      First_Name: {
        type: String,
        required: true,
      },
      Last_Name: {
        type: String,
        required: true,
      },
      Email_Address: {
        type: String,
        required: true,
      },
      Age: {
        type: Number,
        required: true,
      },
    },
    Physical_Details: {
      Height: {
        type: String,
        required: true,
      },
      Weight: {
        type: String,
        required: true,
      },
      BP_Level: {
        Upper_Limit: {
          type: Number,
          required: true,
        },
        Lower_Limit: {
          type: Number,
          required: true,
        },
      },
      Sugar_Level: {
        Upper_Limit: {
          type: Number,
          required: true,
        },
        Lower_Limit: {
          type: Number,
          required: true,
        },
      },
      Fat_Mass: {
        type: String,
        required: true,
      },
      Water_Mass: {
        type: String,
        required: true,
      },
      Skeletal_Mass: {
        type: String,
        required: true,
      },
      Intended_Sugar_Limit: {
        type: String,
        required: true,
      },
      Intended_Fat_Limit: {
        type: String,
        required: true,
      },
      Intended_Protein_Limit: {
        type: String,
        required: true,
      },
    },
  },
  {
    versionKey: false,
  }
);

// export the schema with collection name userDetailsData
const UserDetailsModel = mongoose.model("userdetailsmodel", UserDetailsSchema);

export default UserDetailsModel;
