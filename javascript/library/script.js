
const myLibrary = [];

function Book(name, author,read, numPages, numPagesRead) {
    this.name = name;
    this.author = author;
    this.read = read;
    this.numPages = numPages;
    this.numPagesRead=numPagesRead;


}
function addBookToLibrary(book){
    myLibrary.push(book)
    
}

book1= new Book('new sun','nicholas blue', false,'500','300')

book2= new Book('new sun','nicholas blue', false,'500','300')

addBookToLibrary(book1)

addBookToLibrary(book2)
console.log(myLibrary)
