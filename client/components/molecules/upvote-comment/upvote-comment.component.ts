import { UpvoteService } from "@client/services";
import { getIdFromLocalStorage } from "@client/services/user.service";

/** Upvote Button Component extending the native HTMLElement */
export default class UpvoteComment extends HTMLElement {
	constructor() {
		super();
	}

	get commentId(): string | null {
		return this.hasAttribute("commentId") ? this.getAttribute("commentId") : null;
	}

	set commentId(value: string | null) {
		value && value.length > 0 ? this.setAttribute("commentId", value) : this.removeAttribute("commentId");
	}

	get ownerId(): string | null {
		return this.hasAttribute("ownerId") ? this.getAttribute("ownerId") : null;
	}

	set ownerId(value: string | null) {
		value && value.length > 0 ? this.setAttribute("ownerId", value) : this.removeAttribute("ownerId");
	}

	get upvotes(): Array<Record<string, any>> | null {
		return this.hasAttribute("upvotes") ? JSON.parse(decodeURIComponent(this.getAttribute("upvotes")!)) : [];
	}

	set upvotes(value: Array<Record<string, any>> | null) {
		value && JSON.stringify(value).length > 0
			? this.setAttribute("upvotes", JSON.stringify(value))
			: this.removeAttribute("upvotes");
	}

	async handleClick(): Promise<void> {
		const button: HTMLButtonElement = this.querySelector("#upvote-button")!;
		try {
			button.setAttribute("loading", String(true));
			const response: any = await UpvoteService.toggle(this.commentId!);
			if (response.upvotes.length > 0) {
				this.setAttribute("upvotes", encodeURIComponent(JSON.stringify(response.upvotes)));
			} else {
				this.removeAttribute("upvotes");
			}
		} finally {
			button.removeAttribute("loading");
		}
	}

	static get observedAttributes(): Array<string> {
		return ["upvotes"];
	}

	attributeChangedCallback(): void {
		this._render();
		const button: HTMLButtonElement = this.querySelector("#upvote-button")!;
		button.addEventListener("click", this.handleClick.bind(this));

		!getIdFromLocalStorage() && button.setAttribute("disabled", String(true));
	}

	private _render(): void {
		const filteredUpvotes = this.upvotes?.filter(
			(upvote: Record<string, any>) => upvote.userId === getIdFromLocalStorage(),
		);
		this.innerHTML = `
			<button id="upvote-button" is="ath-button" secondary="true" small="true" class="flex mr-4 ${
				filteredUpvotes!.length > 0 ? `active` : ``
			}">
				<span>&#9650;</span>
				<span class="px-2">Upvote</span>
				${
					this.upvotes && this.upvotes.length > 0
						? `<span id="upvotes-span" class="text-xs border-l pl-2">${this.upvotes.length}</span>`
						: ""
				}
			</button>
		`;
	}
}
