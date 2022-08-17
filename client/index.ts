import "@client/styles/imports.css";

const body: HTMLBodyElement = document.querySelector<HTMLBodyElement>("body")!;
body.classList.add("text-base");

const app: HTMLDivElement = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `<div>Hello World</div>`;
