const coffeeItems = [
  "Espresso",
  "Cappuccino",
  "Latte",
  "Americano",
  "Macchiato",
];
const coffeePrices = ["$2.50", "$3.00", "$4.00", "$2.75", "$3.25"];

const sweetItems = ["Magdalene", "Croissant", "Muffin"];
const sweetPrices = ["$1.50", "$2.00", "$2.25"];

export function renderMenu(container) {
  const menuHeading = document.createElement("h2");
  menuHeading.textContent = "Daily Recommendations";

  const line = document.createElement("div");
  line.classList.add("line-separator");
  const menuContainer = document.createElement("div");
  menuContainer.setAttribute("id", "menu-container");

  const coffeeList = document.createElement("ul");
  coffeeList.classList.add("coffee-list");
  coffeeItems.forEach((item, index) => {
    const coffeeItem = document.createElement("li");
    coffeeItem.classList.add("menu-item");
    coffeeItem.setAttribute("id", item);
    coffeeItem.innerHTML = `${item}<span class="price"> - ${coffeePrices[index]}</span>`;

    coffeeList.appendChild(coffeeItem);
  });

  const sweetList = document.createElement("ul");
  sweetList.classList.add("sweet-list");
  sweetItems.forEach((item, index) => {
    const sweetItem = document.createElement("li");
    sweetItem.classList.add("menu-item");
    sweetItem.setAttribute("id", item);
    sweetItem.innerHTML = `${item}<span class="price"> - ${sweetPrices[index]}</span>`;

    sweetList.appendChild(sweetItem);
  });

  container.appendChild(menuHeading);

  container.appendChild(line);
  menuContainer.appendChild(coffeeList);
  menuContainer.appendChild(sweetList);
  container.appendChild(menuContainer);
}
