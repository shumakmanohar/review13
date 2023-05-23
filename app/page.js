"use client";
import Feed from "@/components/Feed";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
	const { data: session } = useSession();
	const router = useRouter();

	const showErrorMsg = (msg = "SignIn To Like ") => {
		toast.error(msg, {
			position: "top-right",
			autoClose: true,
			autoClose: 5000,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			theme: "dark",
		});
	};
	const handleClick = () => {
		if (session?.user) {
			router.push("/post/new");
		} else {
			showErrorMsg("SignIn To Post");
		}
	};
	return (
		<main className="h-screen">
			<ToastContainer
				position="top-right"
				autoClose={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				theme="dark"
			/>

			{/* HERO with Search */}
			<div className="home-container w-full">
				<h1 className="mt-20 text-center text-6xl sm:text-8xl  font-bold tracking-wide">
					Rɘview 13
				</h1>
				<div className="my-16 w-full">
					<p className="text-center mb-10 text-xl">
						This site [Review 13] is built using the latest NextJs version .
						Share your thoughts about NextJS 13. Websites use NextAuth for
						authentication and MongoDB for data storage.
					</p>
					<div className="flex w-full items-center ">
						<button
							onClick={handleClick}
							className="cursor-pointer shadow shadow-blue-500 rounded-xl text-center mx-auto px-14 py-2 bg-[#303eff] text-white"
						>
							Post Now
						</button>
					</div>
				</div>
			</div>

			<Feed showErrorMsg={showErrorMsg} />
		</main>
	);
}
