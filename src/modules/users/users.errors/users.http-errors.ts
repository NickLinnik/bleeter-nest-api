import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundHttpException extends HttpException {
    constructor(response: string | Record<string, any> = 'User not found') {
        super(response, HttpStatus.NOT_FOUND);
    }
}

export class UserByLoginNotFoundHttpException extends UserNotFoundHttpException {
    constructor() {
        super('User with such login not found');
    }
}