const queries = require("../db/query");
const dbConnection = require("../db/connection");

module.exports.getBookList = async (req, res) => {
  try {
    let bookQuery = queries.queryList.getBookListQuery;
    let values = await dbConnection.dbQuery(bookQuery);

    return res.status(200).json(JSON.stringify(values.rows));
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).send({ error: "Error at list book" });
  }
};

module.exports.getBookDetails = async (req, res) => {
  try {
    let bookId = req.params.bookId;
    let bookDetailsQuery = queries.queryList.getBookDetailsQuery;
    let values = await dbConnection.dbQuery(bookDetailsQuery,[bookId]);

    return res.status(200).json(JSON.stringify(values.rows[0]));
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).send({ error: "Error at get book" });
  }
};
module.exports.addNewBook = async (req, res) => {
  try {
    var createdBy = "admin";
    var createdOn = new Date();
    // req.body
    if (!req.body) {
      return res.status(401).json({message:"No data provided at books"});

    } else {
      //checking for required fields in the body of request
      if (!req.body.title || !req.body.author || !req.body.price) {
      return res.status(401).json({message:"Missing parameters , please fill all parameters"});

      } else {
        var bookName = req.body.title;
        var description = req.body.description;
        var author = req.body.author;
        var price = req.body.price;
        var publisher = req.body.publisher;
        var pages = req.body.pages;
        var storeCode = req.body.storeCode;

        let addBookQuery = queries.queryList.addBooksQuery;
        let values = [
            bookName,
            description,
            storeCode,
            publisher,
            author,
            pages,
            price,
            createdOn,
            createdBy,
            true
          ]
          console.log(values);
          let result = await dbConnection.dbQuery(addBookQuery, values);
        return res
          .status(201)
          .json(`your new book ${bookName} added successfully` );
      }
    }
  } catch (error) {
    console.log("Error: ", error);
    return res.status(403).send({ error: "error at add new book " });
  }
};


module.exports.updateBook = async (req, res) => {
  try {
    let bookId = req.params.bookId;
    var createdBy = "admin";
    var createdOn = new Date();
    // req.body
    if (!req.body) {
      return res.status(401).json({message:"No data provided at books"});

    } else {
      //checking for required fields in the body of request
      if (!req.body.title || !req.body.author || !req.body.price) {
      return res.status(401).json({message:"Missing parameters , please fill all parameters"});

      } else {
        var bookName = req.body.title;
        var description = req.body.description;
        var author = req.body.author;
        var price = req.body.price;
        var publisher = req.body.publisher;
        var pages = req.body.pages;
        var storeCode = req.body.storeCode;

        let updateBookQuery = queries.queryList.updateBookQuery;
        let values = [
          bookId,
            bookName,
            description,
            storeCode,
            publisher,
            author,
            pages,
            price,
            createdOn,
            createdBy,
            true
          ]
          console.log(values);
         await dbConnection.dbQuery(updateBookQuery, values);
        return res
          .status(201)
          .json(`your book  ${bookName} updated successfully` );
      }
    }
  } catch (error) {
    console.log("Error: ", error);
    return res.status(403).send({ error: "error at update  book " });
  }
};

module.exports.removeBookById= async (req, res) => {
  try {
    let bookId = req.params.bookId;
    if (!bookId) {
      return res.status(401).json({ message: "please provide a valid id" });
    }
    let deleteBookQuery = queries.queryList.deleteBookQuery;
    
    await dbConnection.dbQuery(deleteBookQuery, [bookId]);
    return res
      .status(201)
      .json(`your book  ${bookId} deleted successfully` );
  }
 catch (error) {
console.log("Error: ", error);
return res.status(403).send({ error: "error at delete  book " });
}
};