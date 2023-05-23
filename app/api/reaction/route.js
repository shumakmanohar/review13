import Post from "@models/post";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
	const { creatorID, postID } = await req.json();
	try {
		connectToDB();
		// find the post
		// edit the post's Like Array based on the reaction true or false
		const post = await Post.findOne({ _id: postID });
		if (post.likes.includes(creatorID)) {
			await post.updateOne({ $pull: { likes: creatorID } });
		} else {
			await post.updateOne({ $push: { likes: creatorID } });
		}
	} catch (error) {
		console.log(error);
		return new Response("Failed to POST REACTION", { status: 500 });
	}
	return new Response("Reacted", { status: 200 });
};
