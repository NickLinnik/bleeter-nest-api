export class UserNotFoundError extends Error {
    constructor(response: string | undefined = 'User not found') {
        super(response);
    }
}

export class UserByLoginNotFoundError extends UserNotFoundError {
    constructor() {
        super('User with such login not found');
    }
}

export class UniqueLoginViolationError extends Error {
    constructor(response: string | undefined = 'login must be unique') {
        super(response);
    }
}
