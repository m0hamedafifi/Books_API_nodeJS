exports.queryList = {
  getStoreListQuery: `SELECT STORE_ID, STORE_NAME, DESCRIPTION, STORE_CODE
                        FROM BMS.STORE;`,

  getOneStoreQuery: `SELECT STORE_ID, STORE_NAME, DESCRIPTION, STORE_CODE
      FROM BMS.STORE
      where STORE_ID = $1;
      `,

  saveStoreQuery: `INSERT INTO BMS.STORE
    ( STORE_NAME, DESCRIPTION, STORE_CODE, ADDRESS, CREATED_ON, CREATED_BY )
    VALUES($1,$2 ,$3 ,$4 ,$5 ,$6); `,

  updateStoreQuery: `
    UPDATE BMS.STORE
    SET STORE_NAME=$2, DESCRIPTION=$3, STORE_CODE=$4, CREATED_ON=$5, CREATED_BY=$6, ACTIVE=$7, ADDRESS=$8
    WHERE STORE_ID= $1;
    `,

    removeStoreQuery : `delete
    FROM BMS.STORE
    where STORE_ID = $1;
    `,

  getBookListQuery: `SELECT BOOK_ID, BOOK_TITLE, DESCRIPTION,PRICE,IN_STOCK
                        FROM BMS.BOOK; `,

  getBookDetailsQuery: `SELECT BOOK_ID, BOOK_TITLE, DESCRIPTION, STORE_CODE, PUBLISHER, AUTHOR, PAGES, CREATED_ON, CREATED_BY, IN_STOCK, PRICE
  FROM BMS.BOOK 
  WHERE BOOK_ID = $1;`,

  addBooksQuery: `INSERT INTO BMS.BOOK
    ( BOOK_TITLE, DESCRIPTION, STORE_CODE, PUBLISHER, AUTHOR, PAGES, PRICE ,CREATED_ON, CREATED_BY, IN_STOCK)
    VALUES( $1,$2, $3, $4, $5, $6, $7, $8, $9, $10); `,

    updateBookQuery: `UPDATE BMS.BOOK
    SET BOOK_TITLE=$2, DESCRIPTION=$3, STORE_CODE=$4, PUBLISHER=$5,AUTHOR=$6, PAGES=$7, PRICE=$8 ,CREATED_ON=$9, CREATED_BY=$10, IN_STOCK=$11
    WHERE BOOK_ID= $1;
    `,
    deleteBookQuery : `DELETE FROM BMS.BOOK
    WHERE BOOK_ID = $1;
    `,
    
    addAuditAction : `INSERT INTO BMS.AUDIT
    (AUDIT_ACTION, AUDIT_DATA, STATUS, AUDIT_ERROR, AUDIT_BY, AUDIT_ON)
    VALUES( $1, $2, $3, $4, $5, $6);`

    
};
