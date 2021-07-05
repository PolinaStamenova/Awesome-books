let awesomeBooks = [];

function Book(bookTitle, bookAuthor) {
  (this.bookTitle = bookTitle), (this.bookAuthor = bookAuthor);
}

document.getElementById('SubmitButton').addEventListener('click',addBook)

function addBook() {
  let bookTitleInput = document.getElementById("BookTitle").value;
  let bookAuthorInput = document.getElementById("BookAuthor").value;

  awesomeBooks.push(new Book(bookTitleInput,bookAuthorInput));

  localStorage.setItem('awesomeBooks', JSON.stringify(awesomeBooks));

  displayBook(book)
}

function displayBook(book) {

let mainContainer = document.getElementById('BookContainer');
let container = document.createElement('div');
container.classList.add('container',' mx-auto', 'rounded', 'justify-content-center')
mainContainer.appendChild(container);

let titleContainer = document.createElement('div');
titleContainer.classList.add('col-md-8' 'text-center' 'justify-content-center' 'mx-auto' 'mt-3' 'd-flex')
container.appendChild(titleContainer);

let titleLabel =  document.createElement('h3');
titleLabel.classList('h3');
titleLabel.textContent = "Title";
titleContainer.appendChild(titleLabel);

let bookTitle =  document.createElement('h2');
bookTitle.classList('h2');
titleContainer.appendChild(bookTitle);

let authorLabel =  document.createElement('h3');
authorLabel.classList('h3');
authorLabel.textContent = "Title";
titleContainer.appendChild(authorLabel);

let bookAuthor =  document.createElement('h2');
bookAuthor.classList('h2');
titleContainer.appendChild(bookAuthor);

let removeButton = document.createElement('button');

}

//div>div>div*2>h3+h2^+btn
event listener >submit button click