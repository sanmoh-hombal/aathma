import { DateUtil } from "@client/utils";

/** Custom Button Component extending the native HTMLElement */
export default class AthAddCommentModule extends HTMLElement {
	constructor() {
		super();
	}

	get comment(): Record<string, any> | null {
		return this.hasAttribute("comment") ? JSON.parse(decodeURIComponent(this.getAttribute("comment")!)) : null;
	}

	set comment(value: Record<string, any> | null) {
		value && JSON.stringify(value).length > 0
			? this.setAttribute("comment", JSON.stringify(value))
			: this.removeAttribute("comment");
	}

	public connectedCallback(): void {
		this.classList.add("flex", "items-start", "pb-10", "last:pb-0");
		this._render();
	}

	private _render(): void {
		const escapedJson: string = encodeURIComponent(JSON.stringify(this.comment!.upvotes));
		this.innerHTML = `
			<img src="${this.comment!.user.picture}" class="rounded-full w-9 mr-4"/>
			<div class="flex-0">
				<div class="flex items-center">
					<div class="font-bold">${this.comment!.user.firstName} ${this.comment!.user.lastName}</div>
					<div class="mx-2">&#8226;</div>
					<div class="text-secondary-500 text-sm">${DateUtil.humanize(this.comment!.created)}</div>
				</div>
				<div class="font-light mb-4">${this.comment!.content}</div>
				<div class="flex">
					<ath-upvote-comment
						commentId="${this.comment!.id}"
						ownerId="${this.comment!.user.id}"
						upvotes="${escapedJson}"
					>
					</ath-upvote-comment>
					<button is="ath-button" disabled secondary="true" small="true" class="ml-4">Reply</button>
				</div>
			<div>
		`;
	}
}
