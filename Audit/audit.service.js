const events = require('events');
const audit = require('..\\Model\\audit.model');
const queries = require('../db/query');
const dbConnection = require('../db/connection');
var eventEmitter = new events.EventEmitter();

const eventName = "audit"
eventEmitter.on(eventName, (audit) => {

console.log("Check data of audit",JSON.stringify(audit.data));
    try{
    let values =[audit.auditAction,JSON.stringify(audit.data),audit.status,JSON.stringify(audit.auditErr),audit.auditBy,audit.auditOn];
    const addAudit = queries.queryList.addAuditAction;
    dbConnection.dbQuery(addAudit,values);
    console.log("Audit event received");
    }catch(error)
    {
        console.log("Audit event Emitter - error :",error);
    }

});


exports.prepareAudit = (auditAction , data,status, auditOn ,auditBy , auditErr)=>{

    var auditObj = new audit.Audit(auditAction, data,status, auditOn ,auditBy , auditErr);

    eventEmitter.emit(eventName,auditObj);
}