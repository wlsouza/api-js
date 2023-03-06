export class UserNotFoundError extends Error{
    constructor (message){
        super(message);
        this.message = message;
    }
}

export class InvalidIdError extends Error{
    constructor (message){
        super(message);
        this.message = message;
    }
}

export class UserConflictError extends Error{
    constructor (message){
        super(message);
        this.message = message;
    }
}