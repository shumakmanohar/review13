"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Navbar = () => {
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	useEffect(() => {
		(async () => {
			const res = await getProviders();
			setProviders(res);
		})();
	}, []);

	return (
		<nav className="flex w-full justify-between items-center p-4">
			{/* Logo */}
			<div>
				<Link href="/">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-16 h-16"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
						/>
					</svg>
				</Link>
			</div>
			{/* Menu Links */}
			<div className="relative">
				{session?.user ? (
					<div
						className="rounded-full h-12 w-12 flex relative"
						onClick={() => setToggleDropdown((currentState) => !currentState)}
					>
						<Image
							alt="Image"
							className="rounded-full cursor-pointer"
							src={session?.user.image}
							fill={true}
						/>
					</div>
				) : (
					<div>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => {
										signIn(provider.id);
									}}
									className="transition ease-in-out tracking-wide duration-500 px-4 py-1 rounded-lg border hover:bg-white hover:text-black"
								>
									Sign in
								</button>
							))}
					</div>
				)}
				{toggleDropdown && (
					<div className="absolute -left-8 flex flex-col bg-white text-black gap-4 rounded-lg mt-2  p-4">
						<Link
							href={"/post/new"}
							onClick={() => setToggleDropdown((currentState) => !currentState)}
						>
							New Post
						</Link>

						<button onClick={() => signOut()}>Logout</button>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
