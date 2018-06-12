import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { IModel } from '../models/model';
import { catchError, retry, map, delay } from 'rxjs/operators';
import { List } from 'immutable';

export abstract class ApiService<T extends IModel> {
    protected http: Http;
    protected domain: string;
    protected entity: string;
    protected retryCount: number;
    protected delayMs: number;

    constructor(http: Http, domain: string, entity: string, retryCount = 2, delayMs = 5000) {
        this.http = http;
        this.domain = domain;
        this.entity = entity;
        this.retryCount = retryCount;
        this.delayMs = delayMs;
    }

    protected handleError(err) {
        return Observable.throw(err);
    }

    public getAll(): Observable<List<T>> {
        return this.http.get(`/${this.domain}/${this.entity}`).pipe(
            retry(this.retryCount),
            delay(this.delayMs),
            map(resp => List<T>(resp.json())),
            catchError(this.handleError));
    }

    public getOne(id: string): Observable<T> {
        return this.http.get(`/${this.domain}/${this.entity}/${id}`).pipe(
            retry(this.retryCount),
            delay(this.delayMs),
            map(resp => resp.json() as T),
            catchError(this.handleError));
    }

    public post(obj: T): Observable<string> {
        return this.http.post(`/${this.domain}/${this.entity}`, obj).pipe(
            retry(this.retryCount),
            delay(this.delayMs),
            map(resp => resp.json().id),
            catchError(this.handleError));
    }

    public put(obj: T): Observable<boolean> {
        return this.http.put(`/${this.domain}/${this.entity}`, obj).pipe(
            retry(this.retryCount),
            delay(this.delayMs),
            map(resp => resp.status === 200),
            catchError(this.handleError));
    }

    public delete(id: string): Observable<boolean> {
        return this.http.delete(`/${this.domain}/${this.entity}/${id}`).pipe(
            retry(this.retryCount),
            delay(this.delayMs),
            map(resp => resp.status === 200),
            catchError(this.handleError));
    }
}
