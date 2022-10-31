class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    let { statusCode } = err;
    const { message } = err;
    if (!statusCode) {
        statusCode = 500;
    }

    res.status(statusCode).json({
        errors: [
            {
                statusCode: statusCode,
                title: message,
            },
        ],
    });
};
class AppError extends Error{
    constructor(message, status){
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.status = status || 1;
    }
}
class NotFoundError extends AppError{
    constructor(message, status){
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.status = status || 1;
    }
}

class ValidationError extends AppError{
    constructor(message, status, data){
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.status = status || 1;
        this.data = data || null;
    }
}

module.exports = {
    ErrorHandler,
    handleError,
    NotFoundError,
    ValidationError
}