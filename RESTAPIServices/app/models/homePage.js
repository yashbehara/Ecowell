import mongoose from "mongoose";

const Schema = mongoose.Schema;

const homePageSchema = new Schema(
  {
    liveMetrics: [
      {
        metric: String,
        data: Number,
      }
      
    ],

    features: [
      {
        title: String,
        description: String,
        content: String      }
      
    ],
    footerData: [
      {
        title: String,
        content: String,
        refLinks: String
      }
      
    ],
  },
  {
    versionKey: false,
  }
);

// export the schema with collection name homePageData
const homePageModel = mongoose.model("homePageData", homePageSchema);

export default homePageModel;