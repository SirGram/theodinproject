export function renderContact(container) {
  const contactContainer = document.createElement("div");
  contactContainer.classList.add("contact-container");
  container.appendChild(contactContainer);

  const contactTitle = document.createElement("h2");
  contactTitle.textContent = "Contact Us";

  const line = document.createElement("div");
  line.classList.add("line-separator");
  contactContainer.appendChild(contactTitle);

  contactContainer.appendChild(line);
  const contact = document.createElement("div");
  contact.classList.add("contact");
  contactContainer.appendChild(contact);

  const nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "name");
  nameLabel.textContent = "Name:";
  contact.appendChild(nameLabel);

  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id", "name");
  nameInput.setAttribute("name", "name");
  nameInput.setAttribute("required", true);
  contact.appendChild(nameInput);

  const emailLabel = document.createElement("label");
  emailLabel.setAttribute("for", "email");
  emailLabel.textContent = "Email:";
  contact.appendChild(emailLabel);

  const emailInput = document.createElement("input");
  emailInput.setAttribute("type", "email");
  emailInput.setAttribute("id", "email");
  emailInput.setAttribute("name", "email");
  emailInput.setAttribute("required", true);
  contact.appendChild(emailInput);

  const messageLabel = document.createElement("label");
  messageLabel.setAttribute("for", "message");
  messageLabel.textContent = "Message:";
  contact.appendChild(messageLabel);

  const messageTextarea = document.createElement("textarea");
  messageTextarea.setAttribute("id", "message");
  messageTextarea.setAttribute("name", "message");
  messageTextarea.setAttribute("rows", "4");
  messageTextarea.setAttribute("required", true);
  contact.appendChild(messageTextarea);

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.textContent = "Submit";
  contact.appendChild(submitButton);
}
