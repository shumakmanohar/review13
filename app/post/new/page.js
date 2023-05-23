"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePost = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const [submitting, setIsSubmitting] = useState(false);
	const [post, setPost] = useState("");

	const createPost = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		if (session?.user) {
			try {
				const response = await fetch("/api/post/new", {
					method: "POST",
					body: JSON.stringify({
						post: post,
						userId: session?.user.id,
						tag: "",
					}),
				});

				if (response.ok) {
					router.push("/");
				}
			} catch (error) {
				console.log(error);
			} finally {
				setIsSubmitting(false);
			}
		} else {
			console.log("Not SignIned In");
		}
	};
	return (
		<div>
			<Form
				type="Create"
				post={post}
				setPost={setPost}
				submitting={submitting}
				handleSubmit={createPost}
			/>
		</div>
	);
};

export default CreatePost;
