const myLibrary = [];
const newBookBtn = document.getElementById('newBookBtn')
const addBookPopup = document.getElementById('addBookPopup')

function Book (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary () {
  const title = document.querySelector("#bookTitle").value;
  const author = document.querySelector("#bookAuthor").value;
  const pages = document.querySelector("#bookPages").value;
  const read = document.querySelector("#isRead").checked;

  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  createBookCard();
}

function createBookCard() {
  const libGrid = document.querySelector("#libraryGrid");
  libGrid.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let bookCard = document.createElement("div");
    bookCard.setAttribute("id", "bookCard");
    bookCard.innerHTML = 
      `<div id="title"><p>${book.title}</p></div>
      <div id="author"><p> by ${book.author}</p></div>
      <div id="pages"><p>${book.pages} pages</p></div>
      <div id="isRead"><p id=isRead">${book.read ? "Read" : "Not Read Yet"}</p></div>
      <div id="buttonGroup">
        <button class="remove-btn" onclick="removeBook(${i})">Remove</button>
        <button class="toggle-read-btn" onclick="toggleRead(${i})">Toggle Read</button>
      </div`;
    libGrid.appendChild(bookCard);
  }
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

function toggleRead(index) {
  myLibrary[index].toggleRead();
  createBookCard();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  createBookCard();
}

document.querySelector("#newBookForm").addEventListener("submit", function(event) {
  event.preventDefault();
  addBookToLibrary();
  createBookCard()
})

const openAddBookPopup = () => {
  newBookForm.reset()
  addBookPopup.classList.add('active')
  overlay.classList.add('active')
}

const closeAddBookPopup = () => {
  addBookPopup.classList.remove('active')
  overlay.classList.remove('active')
}

const closeAllPopup = () => {
  closeAddBookPopup()
}

const handleKeyboardInput = (e) => {
  if (e.key === 'Escape') closeAllPopup()
}

newBookBtn.onclick = openAddBookPopup
overlay.onclick = closeAllPopup