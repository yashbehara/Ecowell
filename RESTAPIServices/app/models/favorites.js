import mongoose from 'mongoose';
const Schema=mongoose.Schema;

const FavoriteSchema=new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'userdetailsmodel', // Reference to the 'User' model
        required: true,
    },
    // array of uris of recipes
    recipeUris: [
      { type: String }
    ]
},
{
  versionKey: false,
}
);

// export the schema with collection name favorite
const favoritesModel = mongoose.model('favorite', FavoriteSchema);
export default favoritesModel;