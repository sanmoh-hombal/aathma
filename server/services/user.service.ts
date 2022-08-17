import axios, { AxiosResponse } from "axios";
import { randomUUID } from "crypto";

import { PrismaClient } from "@global/clients";
import { IRandomUserObject, IRandomUserResponse } from "@global/types/random-api.type";
import { IUser } from "@global/types/user.type";

/**
 * It makes an HTTP request to the randomuser.me API, and returns the first result
 * @return {IRandomUserObject} A promise that resolves to an IRandomUserObject
 */
async function _getRandomUser(): Promise<IRandomUserObject> {
	try {
		const axiosResponse: AxiosResponse = await axios.get("https://randomuser.me/api/", {
			params: { inc: "name,picture", nat: "us" },
		});
		const randomUserResponse: IRandomUserResponse = axiosResponse.data;

		return randomUserResponse.results[0];
	} catch (e) {
		throw e;
	}
}

/**
 * It returns a user with the given id, or null if no user with that id exists
 * @param {string} id - The id of the user to get
 * @return {IUser} - A User object
 */
export async function get(id: string): Promise<IUser> {
	try {
		return await PrismaClient.user.findUniqueOrThrow({ where: { id: id } });
	} catch (e) {
		throw e;
	} finally {
		await PrismaClient.$disconnect();
	}
}

/**
 * It creates a new user in the database using the data returned from the getRandomUser() function
 * @return {IUser} A promise that resolves to a User object.
 */
export async function add(): Promise<IUser> {
	try {
		const randomUser: IRandomUserObject = await _getRandomUser();

		return await PrismaClient.user.create({
			data: {
				id: randomUUID(),
				firstName: randomUser.name.first,
				lastName: randomUser.name.last,
				picture: randomUser.picture.thumbnail,
				created: new Date(),
				updated: new Date(),
			},
		});
	} catch (e) {
		throw e;
	} finally {
		await PrismaClient.$disconnect();
	}
}
