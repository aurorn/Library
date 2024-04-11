



function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  } 

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return(title +" by " + author + ", " + pages + ", " + read);
    };
}

function addBookToLibrary() {
    
}

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', '295 Pages', 'not read');
Object.getPrototypeOf(theHobbit) === Book.prototype;

console.log(theHobbit.info());

