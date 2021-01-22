class GeneralError extends Error {
    constructor(message) {
        super();
        this.response = message;
    }
  
    getCode() {
        if (this instanceof BadRequest) {
            return 400;
        } if (this instanceof Unauthorized) {
            return 401
        } if (this instanceof NotFound) {
            return 404;
        } if (this instanceof Conflict) {
            return 409;
        }
        return 500;
    }
}

class BadRequest extends GeneralError { }
class Conflict extends GeneralError { }
class NotFound extends GeneralError { }
class Unauthorized extends GeneralError { }
  
module.exports = {
    Conflict,
    GeneralError,
    Conflict,
    BadRequest,
    NotFound,
    Unauthorized
};
