/**
 * Custom Button Component extending the native HTMLButtonElement.
 * Supports custom attributes like loading, small, secondary, active
 */
export default class extends HTMLButtonElement {
	private ORIGINAL_INNER_HTML: string;

	constructor() {
		super();
		this.ORIGINAL_INNER_HTML = this.innerHTML;
	}

	get active(): string | null {
		return this.hasAttribute("active") ? this.getAttribute("active") : null;
	}

	set active(value: string | null) {
		value && value.length > 0 ? this.setAttribute("active", value) : this.removeAttribute("active");
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

	get secondary(): string | null {
		return this.hasAttribute("secondary") ? this.getAttribute("secondary") : null;
	}

	set secondary(value: string | null) {
		value && value.length > 0 ? this.setAttribute("secondary", value) : this.removeAttribute("secondary");
	}

	connectedCallback(): void {
		this.classList.add("ath-button");
	}

	static get observedAttributes(): Array<string> {
		return ["active", "loading", "small", "secondary"];
	}

	attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void {
		switch (name) {
			case "active":
				if (newValue) this.classList.add("active");
				else this.classList.remove("active");
				break;
			case "loading":
				if (newValue) {
					this.innerHTML = "Loading ...";
					this.setAttribute("disabled", String(true));
				} else {
					this.innerHTML = this.ORIGINAL_INNER_HTML;
					this.removeAttribute("disabled");
				}
				break;
			case "small":
				if (newValue) this.classList.add("small");
				else this.classList.remove("small");
				break;
			case "secondary":
				if (newValue) this.classList.add("secondary");
				else this.classList.remove("secondary");
				break;
		}
	}
}
