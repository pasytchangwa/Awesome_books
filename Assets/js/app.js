// calling DOM elements
const mainSect = document.querySelector('.main-section');
const mainTitle = document.querySelector('.main-title');
const addingBook = document.querySelector('book-list');
const addBtn = document.querySelector('.add-btn');
const addTitle = document.querySelector('.title').value;
const addAuthor = document.querySelector('.author').value;

 // Create a collection that keeps a list of books (hint: you can use an array of objects for that).

 let bookList = [];