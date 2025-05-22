import { addBook, bookList, books } from "./flyweight";

describe("[Flyweight]", () => {
  beforeAll(() => {
    addBook("Harry Potter", "JK Rowling", "AB123", false, 100);
    addBook("Harry Potter", "JK Rowling", "AB123", true, 50);
    addBook("To Kill a Mockingbird", "Harper Lee", "CD345", true, 10);
    addBook("To Kill a Mockingbird", "Harper Lee", "CD345", false, 20);
    addBook("The Great Gatsby", "F. Scott Fitzgerald", "EF567", false, 20);
  });

  it("Total amount of copies:", () => {
    expect(bookList.length).toBe(5);
  });

  it("Total amount of books:", () => {
    expect(books.size).toBe(3);
  });
});
