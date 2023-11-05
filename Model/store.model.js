module.exports.store = class Store{
    constructor(storeID, storeName,description,code,storeAddress){
        this.storeID = storeID;
        this.storeName = storeName;
        this.description = description;
        this.code= code;
        this.storeAddress = storeAddress;      
    }
};