import React from "react";
import { Link } from "react-router-dom";
import dbService from "../appwrite/db.service.js";

function BlogCard({ $id, title, featuredImage }) {
	return (
		<Link to={`post/${$id}`}>
			<div className="w-full bg-gray-100 rounded-xl p-4">
				<div className="w-full justify-center mb-4">
					<img
						src={dbService.getFilePreview(featuredImage)}
						alt={title}
						className="rounded-xl"
					/>
				</div>
				<h2 className="text-xl font-bold">{title}</h2>
			</div>
		</Link>
	);
}

export default BlogCard;
