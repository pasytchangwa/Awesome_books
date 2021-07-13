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

 function bookLists (item) {
  return `
  <li>${item.title}</li>
  <li>${item.author}</li>
  <button type='button' id='${item.id}' class='remove-btn'>Remove</button>
  `;
 }

 // Removing book

 const removeItem = (ev) => {
  let removeId = ev.target.id;
  booksCollection = booksCollection.filter((x) => x !== booksCollection[booksCollection.findIndex((y) => y.id === parseInt(removeId, 10))]);
  localStorage.setItem('bookObject', JSON.stringify(booksCollection));
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
  addingBook.style.width = '100%';
  addingBook.style.display = 'flex';
  addingBook.style.flexDirection = 'column';
  addingBook.style.alignItems = 'start';
   addingBook.innerHTML = `${booksCollection.map(bookLists).join('')}`;
   addingBook.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
     removeItem(e);
    }
   });
   form.reset();
 };
 addBtn.addEventListener('click', addItem);
window.addEventListener('load', () => {
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
 });
