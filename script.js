/*function openForm() {
  document.getElementById("myForm").style.display = "block";
  document.getElementById("overlay").style.display = "block";
} 
  
function closeForm() {
  document.getElementById("newBookForm").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}  */

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

function toggleRead(index) {
  myLibrary[index].toggleRead();
  render()
}

function render() {
  let bookCard = document.querySelector("#libraryGrid");
  bookCard.innerHTML = "";
  for ( let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let bookEl = document.createElement("div");
    bookEl.innerHTML = `
    <div class="book-card" id="bookCard">
      <div id="bookTitle"><p>${book.title}</p></div>
      <div id="bookAuthor"><p> by ${book.author}</p></div>
      <div id="bookPages"><p>${book.pages} pages</p></div>
      <div id="bookRead"><p class="read-status">${book.read ? "Read" : "Not Read Yet"}</p></div>
    </div>`;
    bookCard.appendChild(bookEl);
  }

}

function addBookToLibrary () {
  let title = document.querySelector("#bookTitle").value;
  let author = document.querySelector("#bookAuthor").value;
  let pages = document.querySelector("#bookPages").value;
  let read = document.querySelector("#isRead").checked;
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  render();

}


let addBookBtn = document.querySelector("#newBookBtn");
addBookBtn.addEventListener("click", function() {
  let newBookForm = document.querySelector("#addBookPopup");
  let overlay = document.querySelector("#overlay");
  newBookForm.style.display = "block";
  overlay.style.display = "block";
})

let submitBtn = document.querySelector("#submitBtn");
submitBtn.addEventListener("click", function() {
  let newBookForm = document.querySelector("#addBookPopup");
  let overlay = document.querySelector("#overlay");
  newBookForm.style.display = "none";
  overlay.style.display = "none";
})

document.querySelector("#addBookPopup").addEventListener("submit", function(event) {
  event.preventDefault();
  addBookToLibrary();
})