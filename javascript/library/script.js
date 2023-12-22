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
    numPagesRead: 400,
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
    numPagesRead: 19,
  },
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
    numPagesRead: 400,
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
    numPagesRead: 19,
  },
];
const unavailableCover =
  "https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif";

function Book(image, title, author, numPages, numPagesRead) {
  this.image = image;
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.numPagesRead = numPagesRead;
}
function addBookToLibrary() {
  image = $image.value;
  title = $title.value;
  author = $author.value;
  numPages = $numPages.value;
  numPagesRead = $numPagesRead.value;
  newBook = new Book(image, title, author, numPages, numPagesRead);

  books.push(newBook);
}

document.addEventListener("DOMContentLoaded", function () {
  //Selectors
  $form = document.querySelector("#form");
  $image = $form.querySelector("#image");
  $title = $form.querySelector("#title");
  $author = $form.querySelector("#author");
  $numPages = $form.querySelector("#numPages");
  $numPagesRead = $form.querySelector("#numPagesRead");

  //Add new books
  const addBookButton = document.getElementById("submit-button");
  addBookButton.addEventListener("click", function () {
    console.log("click");
    addBookToLibrary();
    console.log(books);
    displayBooks(books);
  });

  displayBooks(books);
//Toggle Hidden

$toggleHidden = document.querySelector("#toggle-hidden");

$bookContainer = document.querySelector("#book-container");

$toggleHidden.addEventListener("click", function () {
  $toggleHidden.innerHTML = $toggleHidden.innerHTML === '+' ?'Return' : '+'
  $form.style.display = $form.style.display === "flex" ? "none" : "flex";
  $bookContainer.style.display =
    $bookContainer.style.display === "none" ? "grid" : "none";
});
  

  function displayBooks(books) {
    const bookContainer = document.getElementById("book-container");
    console.log("boooks", bookContainer);
    bookContainer.innerHTML = "";
    for (const [index, book] of books.entries()) {
      let bookData = document.createElement("div");
      bookData.className = "book-data";
      bookData.id = `book-${index}`;

      let bookImage = document.createElement("img");
      bookImage.className = "book-image";
      console.log(book.image);
      if (book.image === "") {
        bookImage.src = unavailableCover;
      } else {
        bookImage.src = book.image;
      }
      bookData.appendChild(bookImage);
      let bookLabel = document.createElement("div");
      let labelText;
      if (book.numPagesRead - book.numPages === 0) {
        bookImage.style.filter = "grayscale(100%)";
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
        let confirmed =window.confirm('Are you sure you want to delete this book?')
        if (confirmed){
          removeBook(index);}
      });
      bookRemove.appendChild(bookRemoveIcon);
      bookData.appendChild(bookRemove);

      let bookEdit = document.createElement("button");
      bookEdit.className = "book-edit";

      let bookEditIcon = document.createElement("img");
      bookEditIcon.src = "src/edit.png";
      bookEdit.addEventListener("click", function () {
        console.log('edit')
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
      bookInformation.appendChild(bookTitle)
      bookInformation.appendChild(bookAuthor)
      bookData.appendChild(bookInformation);

      bookContainer.appendChild(bookData);
    }
  }

  function removeBook(index) {
    books.splice(index, 1);
    displayBooks(books);
  }
});



