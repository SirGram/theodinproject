let books = [
  {
    image:
      "https://m.media-amazon.com/images/I/614bH2xxR9L._AC_UF1000,1000_QL80_.jpg",
    title: "The Republic of Thieves",
    author: "Scott Lynch",
    numPages: 600,
    numPagesRead: 500,
  },
  {
    image: "https://m.media-amazon.com/images/I/41WT7xwJJBS.jpg",
    title: "Dark Imperium",
    author: "Guy Haley",
    numPages: 400,
    numPagesRead: 10,
  },
  {
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1674418461l/65916344.jpg",
    title: "Holly",
    author: "Stephen King",
    numPages: 300,
    numPagesRead: 300,
  },
  {
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1689903878l/193562625._SY475_.jpg",
    title: "A Dark Roux",
    author: "Blaine Daigle",
    numPages: 452,
    numPagesRead: 260,
  },
  {
    image:
      "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1663778488-51vYL46dfL._SL500_.jpg?crop=1xw:1xh;center,top&resize=980:*",
    title: "The Eye of the World",
    author: "Robert Jordan",
    numPages: 680,
    numPagesRead: 200,
  },
  {
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1671336608l/62047984.jpg",
    title: "Yellowface",
    author: "R. F. Kuang",
    numPages: 331,
    numPagesRead: 0,
  },
  {
    image:
      "https://i1.wp.com/www.getepic.com/learn/wp-content/uploads/2021/04/The-Girl-Who-Drank-the-Moon.jpeg?resize=584%2C886&ssl=1",
    title: "The Girl who Drank the Moon",
    author: "Kelly Barnhill",
    numPages: 200,
    numPagesRead: 197,
  },
  {
    image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1678895127i/123163147.jpg",
    title: "The Future",
    author: "Naomi Alderman",
    numPages: 332,
    numPagesRead: 332,
  },
];
let editIndex = null;
const unavailableCover =
  "https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif";

//Selectors
const $form = document.querySelector("#form");
const $image = $form.querySelector("#image");
const $title = $form.querySelector("#title");
const $author = $form.querySelector("#author");
const $numPages = $form.querySelector("#numPages");
const $numPagesRead = $form.querySelector("#numPagesRead");
const $checkBox = $form.querySelector("#read");
const $toggleHidden = document.querySelector("#toggle-hidden");
const $bookContainer = document.querySelector("#book-container");

class Book {
  constructor(image, title, author, numPages, numPagesRead) {
    this.image = image;
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.numPagesRead = numPagesRead;
  }
  edit(bookData) {
    const { image, title, author, numPages, numPagesRead } = bookData;
    this.image = image;
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.numPagesRead = numPagesRead;
  }
}
class Library {
  constructor() {
    this.books = [];
    this.init();
  }
  addBook(bookData) {
    const { image, title, author, numPages, numPagesRead } = bookData;
    const newBook = new Book(image, title, author, numPages, numPagesRead);
    this.books.push(newBook);
    console.log(this.books);
    displayBooks(this.books);
  }

  removeBook(index) {
    this.books.splice(index, 1);
    console.log(this.books);
    displayBooks(this.books);
  }
  editBook(index, bookData) {
    const { image, title, author, numPages, numPagesRead } = bookData;
    console.log(this.books[index]);
    this.books[index].edit({ image, title, author, numPages, numPagesRead });
    console.log(this.books);

    displayBooks(this.books);
  }
  init() {
    books.forEach((book) => {
      this.addBook(book);
    });
  }
}
const library = new Library();
displayBooks(library.books);

function addFormBookToLibrary(index) {
  const bookData = {
    image: $image.value,
    title: $title.value,
    author: $author.value,
    numPages: $numPages.value,
    numPagesRead:
      $checkBox.value === "yes" ? $numPages.value : $numPagesRead.value,
  };
  if (index === null) {
    library.addBook(bookData);
  } else {
    console.log(index);
    library.editBook(index, bookData);
    editIndex = null;
    toggleDivs();
  }

  [$image, $title, $author, $numPages, $numPagesRead, $checkBox].forEach(
    (input) => (input.value = "")
  );
  $checkBox.value = "no";
}

//Add new books button
const addBookButton = document.getElementById("submit-button");
addBookButton.addEventListener("click", function () {
  if (validateForm()) {
    addBookButton.innerHTML = "Add Book";
    console.log(editIndex);
    addFormBookToLibrary(editIndex);
  }
});

//Toggle Hidden
$toggleHidden.addEventListener("click", function () {
  toggleDivs();
});

//Validate Form
function validateForm() {
  if ($title.value.length < 4 || $author.value.length < 4) {
    alert("Title/author must be at least 4 characters long.");
    return;
  }

  const numPagesValue = parseInt($numPages.value, 10);
  if (isNaN(numPagesValue)) {
    alert("Number of Pages must be a valid number.");
    return;
  }

  // Validate numPages is required
  if ($numPages.value.trim() === "") {
    alert("Number of Pages is required.");
    return;
  }

  return true;
}

function toggleDivs() {
  $toggleHidden.innerHTML = $toggleHidden.innerHTML === "+" ? "Return" : "+";
  $form.style.display = $form.style.display === "flex" ? "none" : "flex";
  $bookContainer.style.display =
    $bookContainer.style.display === "none" ? "grid" : "none";
}

function displayBooks(books) {
  $bookContainer.innerHTML = "";
  for (const [index, book] of books.entries()) {
    let bookData = document.createElement("div");
    bookData.className = "book-data";
    bookData.id = `book-${index}`;

    let bookImage = document.createElement("img");
    bookImage.className = "book-image";
    if (book.image === "") {
      bookImage.src = unavailableCover;
    } else {
      bookImage.src = book.image;
    }
    bookData.appendChild(bookImage);

    //Read percentage
    let bookLabel = document.createElement("div");
    let labelText;
    if (book.numPagesRead - book.numPages === 0) {
      bookImage.style.filter = "grayscale(100%)";

      bookImage.style.opacity = "0.3";
      labelText = document.createTextNode("READ");
      bookLabel.style.width = "200px";

      bookLabel.style.padding = "0.5rem 0 ";
    } else {
      let percentage = Math.round((book.numPagesRead / book.numPages) * 100);
      labelText = document.createTextNode(`${percentage} %`);
    }
    bookLabel.className = "read-label";
    bookLabel.appendChild(labelText);
    bookData.appendChild(bookLabel);

    let bookRemove = document.createElement("button");
    bookRemove.className = "book-remove";
    let bookRemoveIcon = document.createElement("img");
    bookRemoveIcon.src = "src/delete.png";
    bookRemove.addEventListener("click", function () {
      let confirmed = window.confirm(
        "Are you sure you want to delete this book?"
      );
      if (confirmed) {
        library.removeBook(index);
      }
    });
    bookRemove.appendChild(bookRemoveIcon);
    bookData.appendChild(bookRemove);

    let bookEdit = document.createElement("button");
    bookEdit.className = "book-edit";

    let bookEditIcon = document.createElement("img");
    bookEditIcon.src = "src/edit.png";
    bookEdit.addEventListener("click", function (e) {
      editIndex = index;
      console.log(editIndex);
      console.log(book.image);
      $image.value = `${book.image}`;
      $title.value = `${book.title}`;
      $author.value = `${library.books[index].author}`;
      $numPages.value = `${library.books[index].numPages}`;
      $numPagesRead.value = `${library.books[index].numPagesRead}`;
      addBookButton.innerHTML = "Edit Book";
      toggleDivs();
    });
    bookEdit.appendChild(bookEditIcon);
    bookData.appendChild(bookEdit);

    let bookInformation = document.createElement("div");
    bookInformation.className = "book-information";
    let bookTitle = document.createElement("p");
    bookTitle.className = "book-title";
    bookTitle.innerHTML = book.title;
    let bookAuthor = document.createElement("p");
    bookAuthor.className = "book-author";
    bookAuthor.innerHTML = book.author;
    bookInformation.appendChild(bookTitle);
    bookInformation.appendChild(bookAuthor);
    let bookPages = document.createElement("p");
    bookPages.className = "book-pages";
    bookPages.innerHTML = `${book.numPagesRead}/${book.numPages}`;
    bookInformation.appendChild(bookPages);

    bookData.appendChild(bookInformation);

    $bookContainer.appendChild(bookData);
  }
}
