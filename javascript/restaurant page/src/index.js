import { renderHome } from "./components/home";
import { renderMenu } from "./components/menu";
import { renderContact } from "./components/contact";

const content = document.querySelector("#content");
const sideBar = document.createElement("div");
sideBar.id = "side-bar";
const sideBarUl = document.createElement("ul");

const createButton = (text, onClick) => {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", () => {
    handleButtonClick(button, onClick);
  });
  return button;
};

const homeButton = createButton("HOME", renderHome);
const menuButton = createButton("MENU", renderMenu);
const contactButton = createButton("CONTACT", renderContact);

sideBar.appendChild(sideBarUl);
sideBarUl.append(homeButton, menuButton, contactButton);
const mainContent = document.createElement("div");
mainContent.id = "main-content";
content.append(sideBar, mainContent);

function handleButtonClick(clickedButton, renderOption) {
  resetButtons();
  renderOption(mainContent);
  clickedButton.classList.add("active");
}

function resetButtons() {
  [homeButton, menuButton, contactButton].forEach((button) =>
    button.classList.remove("active")
  );
  mainContent.innerHTML = "";
}

// Initial render
handleButtonClick(homeButton, renderHome);
