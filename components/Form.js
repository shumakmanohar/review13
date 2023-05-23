const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
	return (
		<div className="mt-6">
			<form action="" onSubmit={handleSubmit}>
				<h1 className="text-6xl mb-6">{type} Post</h1>

				<div className="mt-28 mb-5 w-full flex justify-center items-center">
					<textarea
						value={post}
						required
						disabled={submitting}
						onChange={(e) => setPost(e.target.value)}
						className="w-3/4 mx-auto bg-black border rounded-lg
                    border-gray-50 outline-none h-20 p-4 text-lg"
						placeholder="Share Your Thoughts"
					></textarea>
				</div>
				<div className=" flex justify-center items-center">
					<button
						disabled={submitting}
						className="text-right text-black bg-white font-medium rounded-lg text-sm px-7 py-2.5 "
					>
						{submitting ? <span>Posting</span> : type}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Form;
