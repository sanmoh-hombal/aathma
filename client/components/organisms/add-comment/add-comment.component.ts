import { CommentService, UserService } from "@client/services";

import { ICommentUserUpvote } from "@global/types/comment.type";
import { IUser } from "@global/types/user.type";

export default class extends HTMLElement {
	user: IUser | null = null;

	constructor() {
		super();
	}

	/** Try to get the user, if it fails, set the user to null, and then render the page */
	async refreshUser(): Promise<void> {
		try {
			this.user = await UserService.get();
		} catch {
			this.user = null;
		} finally {
			this._render();
		}
	}

	/**
	 * It handles the submission of the form
	 * @param {Event} e - Event - The event object that was triggered.
	 */
	async handleSubmit(e: Event): Promise<void> {
		e.preventDefault();

		const value: string | null = ((e.target as HTMLFormElement).firstChild as HTMLInputElement).value || null;
		const form: HTMLFormElement = this.querySelector("#ath-add-comment-form")!;
		form.setAttribute("loading", String(true));

		try {
			const comment: ICommentUserUpvote = await CommentService.add(value!);
			this.dispatchEvent(new CustomEvent("complete", { detail: { comment } }));
			form.reset();
			await this.refreshUser();
		} finally {
			form.removeAttribute("loading");
		}
	}

	public async connectedCallback(): Promise<void> {
		this.classList.add("flex", "items-center", "border-b", "py-10");
		await this.refreshUser();
	}

	private _render(): void {
		this.innerHTML = `
			${this.user ? `<img src="${this.user!.picture}" class="rounded-full w-9 mr-4"/>` : ""}
			<form id="ath-add-comment-form" is="ath-add-comment-form" class="flex-1"></form>
		`;

		const form: HTMLFormElement = this.querySelector("#ath-add-comment-form")!;
		form.addEventListener("submit", this.handleSubmit.bind(this));
	}
}
