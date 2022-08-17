export interface IRandomUserObject {
	name: {
		title: string;
		first: string;
		last: string;
	};
	picture: {
		large: string;
		medium: string;
		thumbnail: string;
	};
}

export interface IRandomUserResponse {
	results: Array<IRandomUserObject>;
	info: {
		seed: string;
		results: number;
		page: number;
	};
}
