import { Schema, models, model } from "mongoose";

const PostSchema = new Schema(
	{
		creator: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		post: {
			type: String,
			required: [true, "Post is required."],
		},

		likes: {
			type: Array,
			default: [],
		},
		tag: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);

export default Post;
