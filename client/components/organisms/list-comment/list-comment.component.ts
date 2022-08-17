import { ICommentUserUpvote } from "@global/types/comment.type";

/** Accepts a list of comments as an attribute and renders `ath-comment` component serially */
export default class extends HTMLElement {
	constructor() {
		super();
	}

	async connectedCallback(): Promise<void> {
		this.classList.add("flex", "flex-col", "items-start", "py-10");
	}

	get comments(): Array<ICommentUserUpvote> {
		return this.hasAttribute("comments") ? JSON.parse(decodeURIComponent(this.getAttribute("comments")!)) : [];
	}

	set comments(value: Array<ICommentUserUpvote> | null) {
		value && JSON.stringify(value).length > 0
			? this.setAttribute("comments", JSON.stringify(value))
			: this.removeAttribute("comments");
	}

	static get observedAttributes(): Array<string> {
		return ["comments"];
	}

	public attributeChangedCallback(): void {
		this._render();
	}

	private _render(): void {
		this.innerHTML = this.comments
			?.map((comment: ICommentUserUpvote) => {
				const escapedJson: string = encodeURIComponent(JSON.stringify(comment));
				return `<ath-comment comment=${escapedJson}></ath-comment>`;
			})
			.join("\n");
	}
}
