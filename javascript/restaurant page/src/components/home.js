export function renderHome(container) {
  const home = document.createElement("div");
  home.classList.add("home");

  const title = document.createElement("h2");
  title.textContent = "Welcome to our Coffee Shop";
  const line = document.createElement("div");
  line.classList.add("line-separator");
  const p = document.createElement("p");
  p.textContent =
    "Experience the rich flavors of authentic coffee in a cozy atmosphere";
  const image = document.createElement("img");
  image.src = "../src/img/home.jpg";

  home.appendChild(title);
  home.appendChild(line);
  home.appendChild(p);
  home.appendChild(image);
  container.appendChild(home);
}
