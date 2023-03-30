const mongoose = require('mongoose');
const { commentSchema } = require('./public.schema');


const Schema = new mongoose.Schema({
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: mongoose.Types.ObjectId, ref: "category", required: true },
    comments: { type: [commentSchema], default: [] },
    likes: { type: [mongoose.Types.ObjectId], default: [] },
    dislikes: { type: [mongoose.Types.ObjectId], default: [] },
    bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    count: { type: Number },
    type: { type: String, required: true },
    format: { type: String },
    supplier: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    feature: { type: Object, default: {
        length: "",
        height: "",
        width: "",
        weight: "",
        colors: [],
        model: [],
        madeIn: ""
    }},
});


module.exports = {
    ProductModel: mongoose.model("product", Schema)
}