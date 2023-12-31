
var httpStatusCode = {
    //1xx: Informational - Requested action is being initiated, expect an update with a status code indicating the progress of the request.
    //1xx: Informational - Requested action is being initiated, expect an update on the request's status before taking any action
    // Informational - the request was received, continuing processing.
    Continue: 100,
    // Processing of the request is being delayed.
    // Successful - the operation completed successfully.
    OK: 200,
    // The request has succeeded.
    Created: 201,
    // The request has been fulfilled and resulted in one or more new resources being created.
    Accepted: 202,
    NoContent: 204,
    PartialContent :206,
    // Used inside a 3xx redirection message to indicate the URI for access to the object in the source document.
    // Used inside a 3xx redirection message to indicate the URI for access to the object in the source host.
    // Client Error - the request contains bad syntax or cannot be fulfilled.
    BadRequest: 400,
    // The server cannot or will not process the request due to something that is perceived to be an error on the part of the client (e.g
    // The request cannot be fulfilled due to bad syntax or cannot be fulfilled at all.
    Unauthorized: 401,
    // The server understood the request, but is refusing to authorize it.
    // Authorization will not help and the request SHOULD NOT be repeated.
    NotFound: 404
};

module.exports = httpStatusCode;