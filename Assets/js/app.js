const addingBook = document.querySelector('.book-list');
const addTitle = document.querySelector('.title');
const addAuthor = document.querySelector('.author');
const mainSect = document.querySelector('.main-section');
const listSect = document.querySelector('awesome-list');
const form = document.querySelector('.add-book');
const datePar = document.querySelector('.cur-date');
const awesomelist = document.querySelector('#item1')
const addNew = document.querySelector('#item2')
const contactMe = document.querySelector('#item3')
// Creating the contact section
const contact = document.createElement('div');
contact.className = 'contact-section';
const contactHead = document.createElement('h2');
contactHead.className = 'main-title';
contactHead.innerHTML = 'contact information'
contact.appendChild(contactHead);
const contactPar = document.createElement('p');
contactPar.className = 'contact-par';
contactPar.innerHTML = 'Please do not hesitate to get in touch with us in case you have any questions!';
contact.appendChild(contactPar);
const contactInfo = document.createElement('ul');
contactInfo.className = 'contact-info'
const contactInfoEl1 = document.createElement('li');
contactInfoEl1.className = 'contact-infoItem';
contactInfoEl1.innerHTML = 'Our e-mail: mail@awesomebook.com';
contactInfo.appendChild(contactInfoEl1);
const contactInfoEl2 = document.createElement('li');
contactInfoEl2.className = 'contact-infoItem';
contactInfoEl2.innerHTML = 'Our phone number: 00418948732194';
contactInfo.appendChild(contactInfoEl2);
const contactInfoEl3 = document.createElement('li');
contactInfoEl3.className = 'contact-infoItem';
contactInfoEl3.innerHTML = 'Our address: streetname 134, apt number, 143189 City, Country';
contactInfo.appendChild(contactInfoEl3);
contact.appendChild(contactInfo);
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
  `
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
      (x) =>
        x !==
        this.collection[
          this.collection.findIndex((y) => y.id === parseInt(removeId, 10))
        ]
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
    alert.innerHTML = 'Please, the title and author are required!';
    alert.className = 'alert';
    alert.style.height = '25px';
    alert.style.textAlign = 'center';
    alert.style.color = 'white';
    alert.style.backgroundColor = 'red';
    alert.style.fontWeight = 'bold';
    form.appendChild(alert);
  } else {
    collectedBooks.addItem();
  }
  setTimeout(() => document.querySelector('.alert').remove(), 3000);
});
