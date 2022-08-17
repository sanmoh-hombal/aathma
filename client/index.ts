import * as AthComponents from "@client/components";

import "@client/styles/imports.css";

const body: HTMLBodyElement = document.querySelector<HTMLBodyElement>("body")!;
body.classList.add("text-base");

const app: HTMLDivElement = document.querySelector<HTMLDivElement>("#app")!;

customElements.define("ath-button", AthComponents.AthAtoms.AthButtonComponent, { extends: "button" });
customElements.define("ath-input", AthComponents.AthAtoms.AthInputComponent, { extends: "input" });

customElements.define("ath-add-comment-form", AthComponents.AthMolecules.AthAddCommentFormComponent, {
	extends: "form",
});

customElements.define("ath-root", AthComponents.AthRootComponent);

app.innerHTML = `<ath-root><ath-root/>`;
