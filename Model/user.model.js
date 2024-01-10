module.exports.User = class USER {
  constructor(
    userName, fullName, password, email, 
    UserTypeCode, userDisabled, verifiedUser, createdBy,
    createdOn, updatedBy, updatedOn ) {
        
    this.userName = userName;
    this.password = password;
    this.fullName = fullName;
    this.email = email;
    this.UserTypeCode = UserTypeCode;
    this.userDisabled = userDisabled;
    this.verifiedUser = verifiedUser;
    this.createdBy = createdBy;
    this.createdOn = createdOn;
    this.updatedBy = updatedBy;
    this.updatedOn = updatedOn;
  }
};
