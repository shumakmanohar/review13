import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import JSConfetti from "js-confetti";

const FeedCard = ({ showErrorMsg, likes, post, creator, postID }) => {
	const { data: session } = useSession();
	const [liked, setLiked] = useState(likes.includes(session?.user.id));
	const [likeCount, setLikeCount] = useState(likes.length);

	const handleLike = async () => {
		if (session?.user) {
			//Coffetti
			const jsConfetti = new JSConfetti();
			if (!liked) {
				jsConfetti.addConfetti({
					emojis: ["❤️"],
					emojiSize: 50,
					confettiNumber: 20,
				});
			}

			// Only Allow Reaction If user Logged In
			// red Icon Liked
			setLiked((currentState) => !currentState);
			// Increment or Decrement Liked based on Click
			if (!liked && !likes.includes(session?.user._id)) {
				setLikeCount((prev) => prev + 1);
			} else {
				setLikeCount((prev) => prev - 1);
			}

			try {
				await fetch("/api/reaction", {
					method: "POST",
					body: JSON.stringify({
						creatorID: creator?._id,
						reaction: !liked ? true : false,
						postID,
					}),
				});
			} catch (error) {
				// If Caught Any Error Roll Back Everything
				setLiked((currentState) => !currentState);
				!liked
					? setLikeCount((prev) => prev + 1)
					: setLikeCount((prev) => prev - 1);
			}
		} else {
			showErrorMsg();
		}
	};
	return (
		<div className=" break-inside-avoid shadow-sm shadow-blue-400 p-4 mb-4 w-full bg-[#323445] rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-50 ">
			<p className="tracking-wide">{post}</p>
			<div className="mt-4 flex w-full justify-between items-center">
				<div className="flex space-x-2 items-center">
					<div className="rounded-full h-12 w-12 flex relative">
						<Image
							className="rounded-full"
							src={creator?.image}
							fill={true}
							alt="Image"
						/>
					</div>
					<p className="text-[#e1dfdf95]">@{creator?.username}</p>
				</div>

				<div onClick={handleLike} className="flex gap-1 cusor-pointer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className={`w-6 h-6 stroke-red-600 cursor-pointer ${
							liked && " fill-red-600"
						}`}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
						/>
					</svg>
					<span className="cursor-pointer">{likeCount}</span>
				</div>
			</div>
		</div>
	);
};

export default FeedCard;
