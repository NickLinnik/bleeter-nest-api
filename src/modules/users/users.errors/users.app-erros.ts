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