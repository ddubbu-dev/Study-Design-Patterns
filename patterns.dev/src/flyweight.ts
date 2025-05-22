class Book {
  title: string;
  author: string;
  isbn: string;

  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// 고유 책 리스트 by isbn 식별자
export const books = new Map();
// 전체 북 리스트 (중복 포함)
export const bookList = [];

const createBook = (title, author, isbn) => {
  const existingBook = books.has(isbn);

  if (existingBook) {
    return books.get(isbn);
  }

  const book = new Book(title, author, isbn);
  books.set(isbn, book);

  return book;
};

export const addBook = (title, author, isbn, availability, sales) => {
  const book = {
    ...createBook(title, author, isbn),
    sales,
    availability,
    isbn,
  };

  bookList.push(book);
  return book;
};
