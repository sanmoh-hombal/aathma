/**
 * The form that controls all of comment add actions
 * Emits a custom element called "complete" once the comment is added
 */
export default class extends HTMLFormElement {
	constructor() {
		super();
	}

	get loading(): string | null {
		return this.hasAttribute("loading") ? this.getAttribute("loading") : null;
	}

	set loading(value: string | null) {
		value && value.length > 0 ? this.setAttribute("loading", value) : this.removeAttribute("loading");
	}

	handleInput(e: Event): void {
		const value: string | null = (e.target as HTMLInputElement)?.value || null;

		if (value) {
			this.querySelector("#comment-input")!.setAttribute("comment", value);
			this.querySelector("#comment-submit")!.removeAttribute("disabled");
		} else {
			this.querySelector("#comment-input")!.removeAttribute("comment");
			this.querySelector("#comment-submit")!.setAttribute("disabled", String(true));
		}
	}

	public connectedCallback(): void {
		this.classList.add("flex");

		const inputHTML: string = `<input autofocus id="comment-input" is="ath-input" placeholder="What are your thoughts?" class="flex-1">`;
		const input = new DOMParser().parseFromString(inputHTML, "text/html").body.childNodes[0] as HTMLElement;
		input.addEventListener("input", this.handleInput.bind(this));
		this.appendChild(input);

		const submitHTML: string = `<button id="comment-submit" is="ath-button" type="submit" class="ml-4">Comment</button>`;
		const submit = new DOMParser().parseFromString(submitHTML, "text/html").body.childNodes[0] as HTMLElement;
		submit.setAttribute("disabled", String(true));
		this.appendChild(submit);
	}

	static get observedAttributes(): Array<string> {
		return ["loading"];
	}

	public attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void {
		switch (name) {
			case "loading":
				if (newValue) {
					this.querySelector("#comment-input")!.setAttribute("loading", String(true));
					this.querySelector("#comment-submit")!.setAttribute("loading", String(true));
				} else {
					this.querySelector("#comment-input")!.setAttribute("loading", String(true));
					this.querySelector("#comment-submit")!.removeAttribute("loading");
				}
				break;
		}
	}
}
