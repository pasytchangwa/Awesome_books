// calling DOM elements
const mainSect = document.querySelector('.main-section');
const mainTitle = document.querySelector('.main-title');
const addingBook = document.querySelector('.book-list');
const addBtn = document.querySelector('.add-btn');
const addTitle = document.querySelector('.title')
const addAuthor = document.querySelector('.author');
const form = document.querySelector('.add-book');

 // Create a collection that keeps a list of books (hint: you can use an array of objects for that).

 let booksCollection = [];
 let j = 0;

 function bookLists (b) {
  return `
  <li>${b.title}</li>
  <li>${b.author}</li>
  <button type='button' id='${b.id}' class='remove-btn'>Remove</button>
  `;
 }

 // Removing book

 const removeItem = (ev) => {
   let removeId = ev.target.id;
   booksCollection = booksCollection.filter((x) => x !== booksCollection[booksCollection.findIndex((y) => y.id === parseInt(removeId, 10))]);
   localStorage.setItem('bookObject', JSON.stringify(booksCollection));
   addingBook.style.listStyle = 'none';
   addingBook.innerHTML = `${booksCollection.map(bookLists).join('')}`;
 };

 const addItem = (ev) => {
  ev.preventDefault();
  j +=1;
  const singleBook = {
   id: j,
   title: addTitle.value,
   author: addAuthor.value,
  };
  booksCollection.push(singleBook);
  localStorage.setItem('bookObject', JSON.stringify(booksCollection));
  addingBook.style.listStyle = 'none';
   addingBook.innerHTML = `${booksCollection.map(bookLists).join('')}`;
   addingBook.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
     removeItem(e);
    }
   });
 };

 window.onload = () => {
  const getData = localStorage.getItem('bookObject');
  const data = JSON.parse(getData);
  if (data) {
   booksCollection = data;
  }
  addingBook.style.listStyle = 'none';
  addingBook.innerHTML = `${booksCollection.map(bookLists).join('')}`;
  addingBook.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      removeItem(e);
    }
  });
 };
 addBtn.addEventListener('click', addItem);



 