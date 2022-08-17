import { AxiosError } from "axios";

import { AxiosUtil } from "@client/utils";

import { IUser } from "@global/types/user.type";

/**
 * It returns the user's ID from local storage, or null if it doesn't exist
 * @return {string | null} A string if found or null
 */
export function getIdFromLocalStorage(): string | null {
	return localStorage.getItem("user-id") || null;
}

/**
 * This function takes a string and sets it to the localStorage item 'user-id'.
 * @param {string} userId - The user's ID.
 */
export function setIdToLocalStorage(userId: string): void {
	localStorage.setItem("user-id", userId);
}

/**
 * It gets the user's information from the database
 * @param {string} [id] - The id of the user to get. If not provided, the id of the currently logged in user is used.
 * @return {IUser | null} A promise that resolves to a record of strings to any
 */
export async function get(id?: string): Promise<IUser | null> {
	try {
		let userId: string | null;
		if (id) userId = id;
		else userId = getIdFromLocalStorage();

		return (await AxiosUtil.get("/user", { params: { id: userId } })).data;
	} catch (e: any | AxiosError) {
		if (e instanceof AxiosError && e.response?.status === 404) {
			localStorage.clear();
			return null;
		} else throw e;
	}
}
