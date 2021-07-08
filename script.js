/* eslint-disable max-classes-per-file, no-use-before-define */

let bookIncrement = 0;
if (localStorage.getItem("bookIncrement")) {
  bookIncrement = localStorage.getItem("bookIncrement");
}

function displayBook(...args) {
  const [bookTitle, bookAuthor, selectedBook] = args;
  const mainContainer = document.getElementById("BookContainer");
  const container = document.createElement("li");
  container.id = `book${selectedBook}`;
  container.classList.add("container", "container-style");
  const contentTitle = document.createElement("p");
  contentTitle.classList.add("title-style");
  contentTitle.textContent = `"${bookTitle}" by ${bookAuthor}`;
  container.appendChild(contentTitle);
  const removeButton = document.createElement("button");
  removeButton.classList.add("btn", "col-5", "my-2", "button-style");
  removeButton.id = selectedBook;
  removeButton.innerText = "Remove";
  container.appendChild(removeButton);
  mainContainer.appendChild(container);
  removeButton.addEventListener("click", () => {
    list.deleteBook(selectedBook);
  });
}

class Booklist {
  constructor(arr = []) {
    this.awesomeBooks = arr;
  }

  addBook(book) {
    this.awesomeBooks.push(book);
    displayBook(book.bookTitle, book.bookAuthor, book.bookId);
    bookIncrement += 1;
    localStorage.clear();
    localStorage.setItem("awesomeBooks", JSON.stringify(this.awesomeBooks));
    localStorage.setItem("bookIncrement", bookIncrement);
  }

  deleteBook(id) {
    const container = document.getElementById(`book${id}`);
    container.remove();
    this.awesomeBooks = this.awesomeBooks.filter((book) => book.bookId !== id);
    localStorage.clear();
    localStorage.setItem("awesomeBooks", JSON.stringify(this.awesomeBooks));
  }
}

class Book {
  constructor(bookTitle, bookAuthor, bookId) {
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
    this.bookId = bookId;
  }
}

function getBooks() {
  const tempStorage = JSON.parse(localStorage.getItem("awesomeBooks"));
  if (tempStorage) {
    list.awesomeBooks = tempStorage;
  }
}

let list = new Booklist();
if (localStorage.getItem("awesomeBooks")) {
  list = new Booklist(JSON.parse(localStorage.getItem("awesomeBooks")));
}

getBooks();

function getBookId() {
  let tempBoy = 0;
  try {
    tempBoy = list.awesomeBooks[list.awesomeBooks.length - 1].bookId + 1;
  } catch {
    tempBoy = 0;
  } finally {
    bookIncrement = tempBoy;
  }
}
getBookId();

document.getElementById("SubmitButton").addEventListener("click", () => {
  const bookTitleInput = document.getElementById("BookTitle").value;
  const bookAuthorInput = document.getElementById("BookAuthor").value;

  list.addBook(new Book(bookTitleInput, bookAuthorInput, bookIncrement));

  document.getElementById("BookTitle").value = "";
  document.getElementById("BookAuthor").value = "";
});

function printStorage() {
  if (localStorage.getItem("awesomeBooks")) {
    list.awesomeBooks.forEach((book) =>
      displayBook(book.bookTitle, book.bookAuthor, book.bookId)
    );
  }
}

let addBookDiv = document.getElementById("addBookDiv");
let listDiv = document.getElementById("bookListDiv");
let contactDiv = document.getElementById("contactDiv");

let navList = document.getElementById("listLink");
navList.addEventListener("click", () => {
  addBookDiv.classList.add("d-none");
  listDiv.classList.remove("d-none");
  contactDiv.classList.remove("d-block");
  contactDiv.classList.add("d-none");
});

let navAdd = document.getElementById("addNewLink");
navAdd.addEventListener("click", () => {
  addBookDiv.classList.remove("d-none");
  addBookDiv.classList.add("d-block");
  listDiv.classList.add("d-none");
  contactDiv.classList.remove("d-block");
  contactDiv.classList.add("d-none");
});

let navContact = document.getElementById("contactLink");
navContact.addEventListener("click", () => {
  contactDiv.classList.remove("d-none");
  contactDiv.classList.add("d-block");
  addBookDiv.classList.add("d-none");
  listDiv.classList.add("d-none");
});

document.addEventListener("DOMContentLoaded", printStorage());
