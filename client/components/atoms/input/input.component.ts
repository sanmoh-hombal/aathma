/**
 * Custom Input Component extending the native HTMLInputElement
 * A better styled version to suit our needs
 */
export default class extends HTMLInputElement {
	constructor() {
		super();
	}

	get loading(): string | null {
		return this.hasAttribute("loading") ? this.getAttribute("loading") : null;
	}

	set loading(value: string | null) {
		value && value.length > 0 ? this.setAttribute("loading", value) : this.removeAttribute("loading");
	}

	get small(): string | null {
		return this.hasAttribute("small") ? this.getAttribute("small") : null;
	}

	set small(value: string | null) {
		value && value.length > 0 ? this.setAttribute("small", value) : this.removeAttribute("small");
	}

	connectedCallback(): void {
		this.classList.add("ath-input");
	}

	static get observedAttributes(): Array<string> {
		return ["loading", "small"];
	}

	attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void {
		switch (name) {
			case "loading":
				if (newValue) {
					this.setAttribute("disabled", String(true));
				} else {
					this.removeAttribute("disabled");
				}
				break;
			case "small":
				if (newValue) this.classList.add("small");
				else this.classList.remove("small");
				break;
		}
	}
}
