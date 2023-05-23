"use client";

import FeedCard from "./FeedCard";
import { useState, useEffect } from "react";

const Feed = ({ showErrorMsg }) => {
	const [allPosts, setAllPosts] = useState([]);
	const fetchPosts = async () => {
		const response = await fetch("/api/post");
		const data = await response.json();
		setAllPosts(data);
	};
	useEffect(() => {
		fetchPosts();
	}, []);
	return (
		<section className=" columns-1 sm:columns-2 lg:columns-3 gap-4">
			{allPosts.map(({ likes, post, creator, _id }) => (
				<FeedCard
					showErrorMsg={showErrorMsg}
					key={_id}
					likes={likes}
					post={post}
					creator={creator}
					postID={_id}
				/>
			))}
		</section>
	);
};

export default Feed;
