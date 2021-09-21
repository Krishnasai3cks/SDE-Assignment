import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    image: String,
    message: String,
    name: String,
    creator: String,
    minimumAskingPrice: String,
    highestBid: String,
    biddingEnd: String,
    location: String,
    typeOfCookie: String,
    egglessOrEgg: String,
    bakedTime: {
        type: Date,
        default: new Date(),
    },
    likes: {
        type: [String],
        default: [],
    },
});

var PostModel = mongoose.model("posts", postSchema);

export default PostModel;