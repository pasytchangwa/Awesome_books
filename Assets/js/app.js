// calling DOM elements
const addingBook = document.querySelector('.book-list');
const addTitle = document.querySelector('.title');
const addAuthor = document.querySelector('.author');
const form = document.querySelector('.add-book');
let j = 0;

// Create a book class
class BooksCollection {
  constructor() {
    this.collection = [];
  }

  DisplayBooks = (bookarr) => {
    const bookLists = bookarr.map((item) => `
  <li>${item.title}</li>
  <li>${item.author}</li>
  <button type='button' id='${item.id}' class='remove-btn'>Remove</button>
  `).join('');
    addingBook.innerHTML = bookLists;
  }

  addItem = () => {
    j += 1;
    const singleBook = {
      id: j,
      title: addTitle.value,
      author: addAuthor.value,
    };
    this.collection.push(singleBook);
    localStorage.setItem('bookObject', JSON.stringify(this.collection));
    this.DisplayBooks(this.collection);
    addingBook.style.listStyle = 'none';
    addingBook.style.width = '100%';
    addingBook.style.display = 'flex';
    addingBook.style.flexDirection = 'column';
    addingBook.style.alignItems = 'start';
    addingBook.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-btn')) {
        this.removeItem(e);
      }
    });
    form.reset();
  }

  removeItem = (ev) => {
    const removeId = ev.target.id;
    this.collection = this.collection.filter(
      (x) => x !== this.collection[this.collection.findIndex((y) => y.id === parseInt(removeId, 10))]
    );
    localStorage.setItem('bookObject', JSON.stringify(this.collection));
    this.DisplayBooks(this.collection);
  }
}
window.onload = () => {
  const getData = localStorage.getItem('bookObject');
  const data = JSON.parse(getData);
  if (data) {
    collectedBooks.collection = data;
  }
  addingBook.style.listStyle = 'none';
  collectedBooks.DisplayBooks(collectedBooks.collection);
  addingBook.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      collectedBooks.removeItem(e);
    }
  });
};
form.addEventListener('submit', (e) => {
  e.preventDefault();
  collectedBooks.addItem();
});
