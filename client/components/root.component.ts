import { CommentService } from "@client/services";

export default class extends HTMLElement {
	constructor() {
		super();
	}

	/**
	 * We're getting the comments from the CommentService, then we're setting the comments attribute on
	 * the ath-list-comment component
	 */
	async refreshComments(): Promise<void> {
		const comments: Array<Record<string, any>> = await CommentService.get();
		const athListCommentComponent: HTMLElement = this.querySelector("ath-list-comment")!;
		athListCommentComponent.setAttribute("comments", encodeURIComponent(JSON.stringify(comments)));
	}

	async connectedCallback(): Promise<void> {
		this.classList.add("mx-auto", "my-40", "px-8", "py-4", "sm:w-1/2");
		this._render();
		await this.refreshComments();
		const athAddCommentComponent: HTMLElement = this.querySelector("ath-add-comment")!;
		athAddCommentComponent.addEventListener("complete", this.refreshComments.bind(this));
	}

	private _render(): void {
		this.innerHTML = `
			<div class="mx-auto my-40 px-8 py-4 sm:w-1/2">
				<div class="text-xl font-bold text-center sm:text-left">Discussion</div>
				<ath-add-comment></ath-add-comment>
				<ath-list-comment></ath-list-comment>
			</div>
		`;
	}
}
