let awesomeBooks = [];
let bookIncrement = 0;
function Book(bookTitle, bookAuthor, bookId) {
  (this.bookTitle = bookTitle),
    (this.bookAuthor = bookAuthor),
    (this.bookId = bookId);
}
function getBooks() {
  // localStorage.clear();
  let tempStorage = JSON.parse(localStorage.getItem("awesomeBooks"));
  if (tempStorage) {
    awesomeBooks = tempStorage;
  }
}
getBooks();
function printStorage() {
  if (!awesomeBooks.empty) {
    for (let i = 0; i < awesomeBooks.length; i += 1) {
      displayBook(
        awesomeBooks[i].bookTitle,
        awesomeBooks[i].bookAuthor,
        awesomeBooks[i].bookId
      );
    }
  }
}
printStorage();
function getBookId() {
  let tempBoy = 0;
  try {
    tempBoy = awesomeBooks[awesomeBooks.length - 1].bookId + 1;
  } catch {
    tempBoy = 0;
  } finally {
    bookIncrement = tempBoy;
  }
}
getBookId();
document.getElementById("SubmitButton").addEventListener("click", addBook);

function addBook() {
  let bookTitleInput = document.getElementById("BookTitle").value;
  let bookAuthorInput = document.getElementById("BookAuthor").value;

  awesomeBooks.push(new Book(bookTitleInput, bookAuthorInput, bookIncrement));

  localStorage.setItem("awesomeBooks", JSON.stringify(awesomeBooks));

  displayBook(bookTitleInput, bookAuthorInput, bookIncrement);
  bookIncrement += 1;
}

function displayBook(...args) {
  let tempArray = ["Title", "Author"];
  let mainContainer = document.getElementById("BookContainer");
  let container = document.createElement("div");
  container.id = "book" + args[2];
  console.log(container.id);
  container.classList.add(
    "container",
    "mx-auto",
    "border",
    "rounded",
    "justify-content-center",
    "my-2"
  );
  console.log(args);
  for (let i = 0; i < tempArray.length; i += 1) {
    let titleContainer = document.createElement("div");
    titleContainer.classList.add(
      "col-md-8",
      "text-center",
      "justify-content-center",
      "mx-auto",
      "my-2",
      "d-flex"
    );
    let titleLabel = document.createElement("h3");
    titleLabel.classList.add("h3", "mx-2");
    titleLabel.textContent = tempArray[i] + ":";
    titleContainer.appendChild(titleLabel);
    let bookTitle = document.createElement("h2");
    bookTitle.classList.add("h2", "mx-2");
    bookTitle.innerText = args[i];
    titleContainer.appendChild(bookTitle);
    container.appendChild(titleContainer);
  }
  let removeButton = document.createElement("button");
  removeButton.id = args[2];
  removeButton.classList.add("btn", "btn-primary", "col-5", "my-2");
  removeButton.innerText = "Remove Book";
  container.appendChild(removeButton);
  mainContainer.appendChild(container);

  removeButton.addEventListener("click", function () {
    deleteBook(args[2]);
  });
}

function deleteBook(bookNum) {
  let container = document.getElementById('book' + bookNum);
  container.remove();
  awesomeBooks = awesomeBooks.filter(book => book.bookId !== bookNum);
  localStorage.clear();
  localStorage.setItem("awesomeBooks", JSON.stringify(awesomeBooks));
}
