module.exports.book = class Book {
  constructor(
    bookId,
    title,
    publisher,
    author,
    pages,
    description,
    storeCode,
    inStock,
    price
  ) {
    this.bookId = bookId;
    this.title = title;
    this.description = description;
    this.storeCode = storeCode;
    this.publisher = publisher;
    this.author = author;
    this.pages = pages;
    this.price = price;
    this.inStock = inStock;
  }
};
