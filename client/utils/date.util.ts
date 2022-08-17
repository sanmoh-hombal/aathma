import moment from "moment";

/**
 * It takes a date string and returns a humanized version of that date
 * @param {string} date - The date to be humanized.
 * @return {string} A function that takes a date and returns a string.
 */
export function humanize(date: string): string {
	return moment(date).fromNow();
}
