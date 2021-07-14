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

  DisplayBooks = (itemarr) => {
    const bookLists = itemarr
      .map(
        (item) => `
  <li class='list-item'><p>"${item.title}" by ${item.author}</p>
  <button type='button' id='${item.id}' class='remove-btn'>Remove</button></li>
  `,
      )
      .join('');
    addingBook.innerHTML = bookLists;
  };

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
    if (addingBook.children.length > 0) {
      addingBook.classList.add('border-on');
    } else {
      addingBook.classList.remove('border-on');
    }
    addingBook.style.listStyle = 'none';
    addingBook.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-btn')) {
        this.removeItem(e);
        if (addingBook.children.length > 0) {
          addingBook.classList.add('border-on');
        } else {
          addingBook.classList.remove('border-on');
        }
      }
    });
    form.reset();
  };

  removeItem = (ev) => {
    const removeId = ev.target.id;
    this.collection = this.collection.filter(
      (x) => x
        !== this.collection[
          this.collection.findIndex((y) => y.id === parseInt(removeId, 10))
        ],
    );
    localStorage.setItem('bookObject', JSON.stringify(this.collection));
    this.DisplayBooks(this.collection);
  };
}
const collectedBooks = new BooksCollection();
window.onload = () => {
  const getData = localStorage.getItem('bookObject');
  const data = JSON.parse(getData);
  if (data) {
    collectedBooks.collection = data;
  }
  addingBook.style.listStyle = 'none';
  collectedBooks.DisplayBooks(collectedBooks.collection);
  if (addingBook.children.length > 0) {
    addingBook.classList.add('border-on');
  } else {
    addingBook.classList.remove('border-on');
  }
  addingBook.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      collectedBooks.removeItem(e);
      if (addingBook.children.length > 0) {
        addingBook.classList.add('border-on');
      } else {
        addingBook.classList.remove('border-on');
      }
    }
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (addTitle.value === '' || addAuthor.value === '') {
    const alert = document.createElement('p');
    alert.innerHTML = 'Please you must enter a value for both inputs';
    alert.style.color = 'red';
    alert.style.fontWeight = 'bold';
    form.appendChild(alert);
  } else {
    collectedBooks.addItem();
  }
});
