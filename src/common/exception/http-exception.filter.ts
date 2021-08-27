import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import * as lodash from 'lodash';
// import * as Sentry from '@sentry/node';
import { ERROR_MESSAGES } from '../utils/error-messages';
import { configService } from '../config/config.service';



@Catch()
@Injectable()
export class AllExceptionsFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let error: Error[] = [];

    if (!configService.isProduction)
      console.log('error: ' + (exception));

    // HttpException
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      error = this.extractHttpExceptionObject(exception);
    }

    // Sequelize ValidationError
    // else if (exception instanceof ValidationError) {
    //   status = HttpStatus.BAD_REQUEST;
    //   error = this.extractSequelizeValidationError(exception);
    // }

    // Sequelize DatabaseError
    else if (exception['name'] === 'SequelizeDatabaseError') {
      error.push({ message: ERROR_MESSAGES.InternalServerError });
    }

    response.status(status).json({
      statusCode: 0,
      error : error || exception
    });
  }


  // private methods
  private extractHttpExceptionObject(exception: HttpException): Error[] {
    let message;
    let messageType;
    let error = [];

    try {
      const response = exception.getResponse();
      message = response['message'];
      messageType = typeof (message);

      // *class-validator* error returns a string as HttpException
      if (Array.isArray(message)) {
        error = message.map(errorText => ({ message: errorText }));
      }

      // typical errors thrown
      if (messageType === 'string')
        error.push({ message });
    }
    catch (e) {
      // console.log('e: ' + JSON.stringify(e));
      error.push({ message: ERROR_MESSAGES.InternalServerError });
    }
    finally {
      return error;
    }
  }

  // private extractSequelizeValidationError(exception: ValidationError): Error[] {
  //   return exception.errors.map((obj) =>
  //     lodash.pick(obj, ['message', 'type', 'path', 'value'])
  //   );
  // }
}

class Error {
  message: string;
  type?: string;
  path?: string;
  value?: string;
}
