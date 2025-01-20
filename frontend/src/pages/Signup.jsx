import { FaGithub, FaUnlockAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Image from "/Image.jpg"; // Ensure the path is correct

const SignUpPage = () => {
	return (
		<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
			<div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 w-full max-w-xl flex items-center border-2 border-blue-200">
				{/* Image Section */}
				<div className="hidden sm:block w-2/5">
					<img
						src={Image}
						alt="Sign Up"
						className="rounded-2xl" // Make the image corners rounded
					/>
				</div>
				
				{/* Text Section */}
				<div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-full sm:w-3/5">
					<h1 className="text-xl text-[#2C444E] font-bold md:text-2xl text-center">
						Create Account
					</h1>

					<button
						type="button"
						className="text-white bg-[#C781F3] hover:bg-[#24292F]/90 focus:ring-4
						focus:ring-[#24292F]/50 font-medium rounded-full flex gap-2 p-2 items-center w-full 
						text-center justify-center"
					>
						<FaGithub className="w-5 h-5" />
						Sign up with Github
					</button>

					<p className="text-gray-300 text-left">
						By signing up, you will unlock all the features of the app.
						<span>
							<FaUnlockAlt className="w-4 h-4 inline mx-2" />
						</span>
					</p>

					<p className="text-sm font-medium text-[#2C444E] text-left">
						Already have an account?{" "}
						<Link
							to="/login"
							className="font-medium text-primary-600 hover:underline text-blue-600"
						>
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;