import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpUrlEncodingCodec } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
 

let users = [
    { id: 11, name: 'aye', email: 'aye@gmail.com', password: 'ayeaye' },
    { id: 12, name: 'mya', email: 'mya@gmail.com', password: 'myamya' },
    { id: 13, name: 'john', email: 'john@gmail.com', password: 'johnjohn' },
    { id: 14, name: 'andy', email: 'andy@gmail.com', password: 'andyandy' },
    { id: 15, name: 'smith', email: 'smith@gmail.com', password: 'smith' },
    { id: 16, name: 'black', email: 'black@gmail.com', password: 'blackblack' },
    { id: 17, name: 'elle', email: 'elle@gmail.com', password: 'elleelle' },
    { id: 18, name: 'aung', email: 'aung@gmail.com', password: 'aungaung' },
    { id: 19, name: 'min', email: 'min@gmail.com', password: 'minmin' },
    { id: 20, name: 'july', email: 'july@gmail.com', password: 'julyjuly' },
    { id: 21, name: 'june', email: 'june@gmail.com', password: 'junejune' },
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const { url, method, headers, body } = request;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                default:
                    return next.handle(request);
            }
        }

        function authenticate(){
            const { email, password } = body;
            const user = users.find( x => x.email === email && x.password === password);
            if(!user) return error('User email or password is incorrect');
            return ok({
                id: user.id,
                username: user.name,
                email: user.email,
                token: 'fake-jwt-token'
            });
            
        }

        // helpers functions 

        function ok(body?){
            return of(new HttpResponse({ status: 200, body}));
        }

        function error(message){
            return throwError({ error: { message } });
        }
        

    }
}

export const fackeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};