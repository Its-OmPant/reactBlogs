import config from "../config/config";
import { Client, Account, ID } from "appwrite";

class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client.setEndpoint(config.appwriteURL).setProject(config.projectID);
		this.account = new Account(this.client);
	}

	async createAccount({ email, password, username }) {
		try {
			const userAccount = this.account.create(
				ID.unique(),
				email,
				password,
				username
			);

			if (userAccount) {
				//call to login user
				return this.login({ email, password });
			} else {
				return userAccount;
			}
		} catch (error) {
			console.err("appwrite service :: createAccount error:: ", error);
		}
	}

	async login({ email, password }) {
		try {
			return await this.account.createEmailSession(email, password);
		} catch (error) {
			console.err("appwrite service :: login error :: ", error);
		}
	}

	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			console.err("appwrite service :: getCurrentUser error :: ", error);
		}
		return null;
	}

	async logout() {
		try {
			await this.account.deleteSessions();
		} catch (error) {
			console.err("appwrite service :: logout error :: ", error);
		}
	}
}

const authService = new AuthService();

export default authService;
