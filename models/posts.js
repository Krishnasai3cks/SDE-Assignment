import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    image: String,
    message: String,
    username: String,
    creator: String,
    minAskingPrice: String,
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