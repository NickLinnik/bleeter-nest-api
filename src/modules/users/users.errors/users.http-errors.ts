import {BadGatewayException, BadRequestException, HttpStatus, NotFoundException} from '@nestjs/common';

export class UserNotFoundHttpException extends NotFoundException {
    constructor(response: string | Record<string, any> = 'User not found') {
        super(response);
    }
}

export class UserByLoginNotFoundHttpException extends UserNotFoundHttpException {
    constructor() {
        super('User with such login not found');
    }
}

export class UniqueLoginViolationHttpException extends BadRequestException {
    constructor(response: string | Record<string, any> = 'login must be unique') {
        super(response);
    }
}
