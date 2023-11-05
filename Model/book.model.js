module.exports.book = class Book{
    constructor(bookId, title,publisher,author,pages,description,storeCode){
        this.bookId = bookId;
        this.title = title;
        this.description = description;
        this.storeCode= storeCode;
        this.publisher = publisher;  
        this.author = author;
        this.pages = pages;
    }
};