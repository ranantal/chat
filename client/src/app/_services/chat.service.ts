import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { environment } from '../../environments/environment';

import { Message } from '../_models/message';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private ws: WebSocket = null;
    private observers: Observer<Message>[] = [];
    private observable: Observable<Message>;

    constructor() {
        this.observable = Observable.create(obs => {
            this.observers.push(obs);
        });
    }

    connect(url: string = environment.CONST_URL): void {
        this.observers = [];
        this.ws = new WebSocket(url);

        this.ws.onmessage = (event) => this.observers.forEach(obs => obs.next(JSON.parse(event.data)));
        this.ws.onerror = (event) => this.observers.forEach(obs => obs.error(event));
        this.ws.onclose = (event) => this.observers.forEach(obs => obs.complete());
    }

    close(): void {
        if (this.ws !== null)
            this.ws.close();
    }

    getObservable(): Observable<Message> {
        if (this.ws === null)
            this.connect();

        return this.observable;
    }

    sendMessage(message: Message): void {
        if (this.ws !== null) 
            this.ws.send(JSON.stringify(message)); 
    }

    checkConnection(): number {
        return this.ws.readyState;
    }
}