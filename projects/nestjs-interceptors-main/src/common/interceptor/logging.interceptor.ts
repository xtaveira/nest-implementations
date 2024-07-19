import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const now = Date.now();
    const request = context.switchToHttp().getRequest()
    return next
    .handle()
    .pipe(
        tap(() => {
            console.log(`A request durou... ${Date.now() - now}ms`)
            console.log(`A URL e Nome do Método são:
            URL: ${request.url}
            Method: ${request.method}`)
        })
      );
  }
}