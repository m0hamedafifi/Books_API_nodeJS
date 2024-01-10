
const Logger = require("../services/logger");
const auditService = require("../Audit/audit.service");




exports.AuditLoggerSubmit = (fileName,LoggerMessage,objData,auditAction,statusCode ,dateNow,Username,err )=>{

    const logger = new Logger(fileName);
auditService.prepareAudit( auditAction,
    objData,
    statusCode,
    dateNow,
    Username,
    err
  );

  logger.info(LoggerMessage, objData);

}