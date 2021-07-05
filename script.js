let awesomeBooks = [];
let bookIncrement = 0;
function Book(bookTitle, bookAuthor, bookId) {
  (this.bookTitle = bookTitle), (this.bookAuthor = bookAuthor), (this.bookId = bookId);
}
function getBooks(){
  let tempStorage = JSON.parse(localStorage.getItem('awesomeBooks'));
  if(tempStorage){
    awesomeBooks = awesomeBooks.concat(tempStorage);
  }
}
getBooks();
function getBookId(){
  let tempBoy = 0;
  try{
    tempBoy = awesomeBooks[awesomeBooks.length-1].bookId+1;
  }
  catch{
    tempBoy = 0;
  }
  finally{
    bookIncrement = tempBoy;
  }
}
getBookId();
document.getElementById('SubmitButton').addEventListener('click', addBook);

function addBook() {
  let bookTitleInput = document.getElementById("BookTitle").value;
  let bookAuthorInput = document.getElementById("BookAuthor").value;
  
  awesomeBooks.push(new Book(bookTitleInput,bookAuthorInput, bookIncrement));

  localStorage.setItem('awesomeBooks', JSON.stringify(awesomeBooks));

  displayBook(bookTitleInput, bookAuthorInput, bookIncrement)
  bookIncrement += 1;
}

function displayBook(...args) {
  let tempArray = ["Title", "Author"];
  let mainContainer = document.getElementById('BookContainer');
  let container = document.createElement('div');
  container.classList.add('container','mx-auto','border', 'rounded', 'justify-content-center')
  console.log(args);
  for(let i = 0; i<tempArray.length; i +=1){
    let titleContainer = document.createElement('div');
    titleContainer.classList.add('col-md-8', 'text-center', 'justify-content-center', 'mx-auto', 'my-3', 'd-flex')
    let titleLabel = document.createElement('h3');
    titleLabel.classList.add('h3', 'mx-2');
    titleLabel.textContent = tempArray[i]+":";
    titleContainer.appendChild(titleLabel);
    let bookTitle =  document.createElement('h2');
    bookTitle.classList.add('h2', 'mx-2');
    bookTitle.innerText = args[i];
    titleContainer.appendChild(bookTitle);
    container.appendChild(titleContainer);
  }

  mainContainer.appendChild(container);
}
//div>div>div*2>h3+h2^+btn
