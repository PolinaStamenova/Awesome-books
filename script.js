let bookIncrement = 0;

class Book {
  constructor(bookTitle, bookAuthor, bookId) {
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
    this.bookId = bookId;
  }
  awesomeBooks;

  addBook() {

    localStorage.setItem("awesomeBooks", JSON.stringify(Book.awesomeBooks));

    displayBook(this.bookTitle, this.bookAuthor, this.bookId);
    bookIncrement += 1;
    Book.awesomeBooks.filter(element => element !== null)
  }

  deleteBook() {
    const container = document.getElementById(`book${this.bookId}`);
    container.remove();
    Book.awesomeBooks.splice(this.bookId, 1);
    localStorage.clear();
    localStorage.setItem("awesomeBooks", JSON.stringify(Book.awesomeBooks))
  }
}
Book.awesomeBooks = [];
function getBooks() {
  const tempStorage = JSON.parse(localStorage.getItem("awesomeBooks"));
  if (tempStorage) {
    Book.awesomeBooks = tempStorage;
  }
}

getBooks();

function getBookId() {
  let tempBoy = 0;
  try {
    tempBoy = Book.awesomeBooks[Book.awesomeBooks.length - 1].bookId + 1;
  } catch {
    tempBoy = 0;
  } finally {
    bookIncrement = tempBoy;
  }
}
getBookId();

function displayBook(...args) {
  const tempArray = ["Title", "Author"];
  const mainContainer = document.getElementById("BookContainer");
  const container = document.createElement("div");
  container.id = `book${args[2]}`;
  container.classList.add(
    "container",
    "mx-auto",
    "border",
    "rounded",
    "justify-content-center",
    "my-2"
  );
  for (let i = 0; i < tempArray.length; i += 1) {
    const titleContainer = document.createElement("div");
    titleContainer.classList.add(
      "col-md-8",
      "text-center",
      "justify-content-center",
      "mx-auto",
      "my-2",
      "d-flex"
    );
    const titleLabel = document.createElement("h3");
    titleLabel.classList.add("h3", "mx-2");
    titleLabel.textContent = `${tempArray[i]}:`;
    titleContainer.appendChild(titleLabel);
    const bookTitle = document.createElement("h2");
    bookTitle.classList.add("h2", "mx-2");
    bookTitle.innerText = args[i];
    titleContainer.appendChild(bookTitle);
    container.appendChild(titleContainer);
  }
  const removeButton = document.createElement("button");
  const [, , selectedBook] = args;
  removeButton.id = selectedBook;
  removeButton.classList.add("btn", "btn-primary", "col-5", "my-2");
  removeButton.innerText = "Remove Book";
  container.appendChild(removeButton);
  mainContainer.appendChild(container);
  removeButton.addEventListener("click", () => {
    Book.awesomeBooks[selectedBook].deleteBook();
  });

}

document.getElementById("SubmitButton").addEventListener("click", () => {
  const bookTitleInput = document.getElementById("BookTitle").value;
  const bookAuthorInput = document.getElementById("BookAuthor").value;

  Book.awesomeBooks[bookIncrement] = new Book(bookTitleInput, bookAuthorInput, bookIncrement);
  Book.awesomeBooks[bookIncrement].addBook();

});

function printStorage() {
  if (!Book.awesomeBooks.empty && !Book.awesomeBooks.null) {
    for (let i = 0; i < Book.awesomeBooks.length; i += 1) {
      displayBook(
        Book.awesomeBooks[i].bookTitle,
        Book.awesomeBooks[i].bookAuthor,
        Book.awesomeBooks[i].bookId
      );
    }
  }
}

document.addEventListener("DOMContentLoaded", printStorage());
