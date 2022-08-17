export default class extends HTMLElement {
	constructor() {
		super();
	}

	async connectedCallback(): Promise<void> {
		this.classList.add("mx-auto", "my-40", "px-8", "py-4", "sm:w-1/2");
		this._render();
	}

	private _render(): void {
		this.innerHTML = `
			<div class="mx-auto my-40 px-8 py-4 sm:w-1/2">
				<div class="text-xl font-bold text-center sm:text-left">Discussion</div>
			</div>
		`;
	}
}
