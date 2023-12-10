module.exports.Audit = class Audit {
    constructor(auditAction , data,status, auditOn ,auditBy , auditErr) {
        this.auditAction = auditAction;
        this.data = data;
        this.status = status;
        this.auditOn = auditOn;
        this.auditBy = auditBy;
        this.auditErr = auditErr;
    }
};
