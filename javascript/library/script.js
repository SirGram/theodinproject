const books = [];

function Book(title, author, numPages, numPagesRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.numPagesRead = numPagesRead;
}
function addBookToLibrary() {
  title = $title.value;
  author = $author.value;
  numPages = $numPages.value;
  numPagesRead = $numPagesRead.value;
  newBook = new Book(title, author, numPages, numPagesRead);
  console.log(newBook)
  books.push(newBook);
}

document.addEventListener("DOMContentLoaded", function () {
  //Selectors
  $form = document.querySelector("#form");
  $title = $form.querySelector("#title");
  $author = $form.querySelector("#author");
  $numPages = $form.querySelector("#total-pages");
  $numPagesRead = $form.querySelector("#pages-read");

  const bookContainer = document.getElementById("book-container");
  console.log(bookContainer);

  const submission = document.getElementById("submit-button");
  submission.addEventListener("click", function () {
    console.log("click");
    addBookToLibrary();
    console.log(books)
  });

  for (book of books) {
    let bookData = document.createElement("div");
    bookData.className = "book-data";

    let bookTitle = document.createElement("div");
    bookTitle.className = "book-title";
    bookTitle.innerHTML = book.title;

    bookData.appendChild(bookTitle);

    let bookAuthor = document.createElement("div");
    bookAuthor.className = "book-author";
    bookAuthor.innerHTML = book.author;
    bookData.appendChild(bookAuthor);

    bookContainer.appendChild(bookData);
  }
});
