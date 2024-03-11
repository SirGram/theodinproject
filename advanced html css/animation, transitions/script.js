const openModalButton = document.getElementById("open-modal");
const closeModalButton = document.getElementById("close-modal");
const modal = document.getElementById("popup-modal");

const dropdownContainer = document.getElementById("dropdown-container");
const dropdown = document.getElementById("dropdown");
const dropdownTitle = document.getElementById("menu");

const toggleModal = () => {
  modal.classList.toggle("show");
  openModalButton.classList.toggle("show");
};
openModalButton.addEventListener("click", () => toggleModal());
closeModalButton.addEventListener("click", () => toggleModal());

dropdownTitle.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    dropdown.classList.toggle("visible");
  }
});
window.addEventListener("click", (e) => {
  if (!dropdownContainer.contains(e.target)) {
    dropdown.classList.remove("visible");
  }
});
