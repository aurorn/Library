let library = [];
const newBookBtn = document.getElementById('newBookBtn');
const addBookPopup = document.getElementById('addBookPopup');
const libGrid = document.getElementById('libraryGrid');
const overlay = document.getElementById('overlay');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function loadFromLocalStorage() {
  const storedLibrary = JSON.parse(localStorage.getItem('library'));
  if (storedLibrary) {
    library = storedLibrary.map(book => new Book(book.title, book.author, book.pages, book.read));
    displayLibrary();
  }
}

function saveToLocalStorage() {
  localStorage.setItem('library', JSON.stringify(library));
}

function displayLibrary() {
  libGrid.innerHTML = '';
  library.forEach((book, index) => {
    const bookCard = createBookCard(book, index);
    libGrid.appendChild(bookCard);
  });
}

function createBookCard(book, index) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.dataset.index = index;

  bookCard.innerHTML = `
    <div class="title"><p>${book.title}</p></div>
    <div class="author"><p> by ${book.author}</p></div>
    <div class="pages"><p>${book.pages} pages</p></div>
    <div class="isRead"><p>${book.read ? "Read" : "Not Read Yet"}</p></div>
    <div class="buttonGroup">
      <button class="remove-btn">Remove</button>
      <button class="toggle-read-btn">Toggle Read</button>
    </div>
  `;

  const removeBtn = bookCard.querySelector('.remove-btn');
  const toggleReadBtn = bookCard.querySelector('.toggle-read-btn');

  removeBtn.addEventListener('click', () => removeBook(index));
  toggleReadBtn.addEventListener('click', () => toggleRead(index));

  return bookCard;
}

function addBookToLibrary() {
  const title = document.querySelector("#bookTitle").value;
  const author = document.querySelector("#bookAuthor").value;
  const pages = document.querySelector("#bookPages").value;
  const read = document.querySelector("#isRead").checked;

  if (!title || !author || !pages) {
    alert('Please fill out all fields!');
    return;
  }

  const newBook = new Book(title, author, pages, read);
  library.push(newBook);
  displayLibrary();
  saveToLocalStorage();
}

function toggleRead(index) {
  library[index].read = !library[index].read;
  updateBookCard(index);
  saveToLocalStorage();
}

function removeBook(index) {
  library.splice(index, 1);
  displayLibrary();
  saveToLocalStorage();
}

function updateBookCard(index) {
  const book = library[index];
  const bookCards = document.querySelectorAll('.book-card');
  const bookCard = bookCards[index];

  bookCard.querySelector('.isRead p').textContent = book.read ? "Read" : "Not Read Yet";
}

document.querySelector("#newBookForm").addEventListener("submit", function (event) {
  event.preventDefault();
  addBookToLibrary();
  closeAddBookPopup();
});

function openAddBookPopup() {
  document.querySelector("#newBookForm").reset();
  addBookPopup.classList.add('active');
  overlay.classList.add('active');
}

function closeAddBookPopup() {
  addBookPopup.classList.remove('active');
  overlay.classList.remove('active');
}

function closeAllPopup() {
  closeAddBookPopup();
}

function handleKeyboardInput(e) {
  if (e.key === 'Escape') closeAllPopup();
}

newBookBtn.addEventListener('click', openAddBookPopup);
overlay.addEventListener('click', closeAllPopup);
document.addEventListener('keydown', handleKeyboardInput);

loadFromLocalStorage();
