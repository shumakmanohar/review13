import Post from "@models/post";
import { connectToDB } from "@utils/database";

export const GET = async (req, res) => {
	try {
		await connectToDB();
		console.log("Check");
		const posts = await Post.find({})
			.populate("creator")
			.sort({ createdAt: -1 });

		return new Response(JSON.stringify(posts), { status: 200 });
	} catch (error) {
		return new Response(`Failed to fetch all post ${error.message}`, {
			status: 500,
		});
	}
};
