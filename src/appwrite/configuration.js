import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

class DBService {
	client = new Client();
	databases;
	storage;

	constructor() {
		this.client.setEndpoint(config.appwriteURL).setProject(config.projectID);
		this.databases = new Databases(client);
		this.storage = new Storage(client);
	}

	async createPost({ title, slug, content, featuredImage, status, userID }) {
		try {
			return await this.databases.createDocument(
				config.databaseID,
				config.collectionID,
				slug,
				{
					title,
					content,
					status,
					featuredImage,
					userID,
				}
			);
		} catch (error) {
			console.error("appwrite service :: createPost error :: ", error);
		}
	}

	async updatePost(slug, { title, content, featuredImage, status }) {
		try {
			return this.databases.updateDocument(
				config.databaseID,
				config.collectionID,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
				}
			);
		} catch (error) {
			console.error("appwrite service :: updatePost error :: ", error);
		}
	}

	async deletePost(slug) {
		try {
			await this.databases.deleteDocument(
				config.databaseID,
				config.collectionID,
				slug
			);
			return true;
		} catch (error) {
			console.error("appwrite service :: deletePost error :: ", error);
			return false;
		}
	}

	async getPost(slug) {
		try {
			return await this.databases.getDocument(
				config.databaseID,
				config.collectionID,
				slug
			);
		} catch (error) {
			console.error("appwrite service :: getPost error :: ", error);
			return false;
		}
	}
	async getAllPosts() {
		try {
			return await this.databases.listDocuments(
				config.databaseID,
				config.collectionID
			);
		} catch (error) {
			console.error("appwrite service :: getAllPosts error :: ", error);
			return false;
		}
	}

	// file upload service
	async uploadFile(file) {
		try {
			return await this.storage.createFile(config.bucketID, ID.unique(), file);
		} catch (error) {
			console.error("appwrite service :: uploadFile error :: ", error);
			return false;
		}
	}

	async deleteFile(fileID) {
		try {
			await this.storage.deleteFile(config.bucketID, fileID);
			return true;
		} catch (error) {
			console.error("appwrite service :: deketeFile error :: ", error);
			return false;
		}
	}

	getFilePreview(fileID) {
		return this.bucketID.getFilePreview(config.bucketID, fileID);
	}
}

const dbService = new DBService();
export default dbService;
