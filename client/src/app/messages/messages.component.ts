import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { ChatService } from '../_services/chat.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
    messages: Message[] = [];

    constructor(
        private chatService: ChatService
    ) { 
        this.chatService.getObservable().
        subscribe((data: Message) => {
            this.messages.push(data);
            this.messages.sort((a, b) => {
                return a.time - b.time;
            })
        });
    }

    ngOnInit(): void { }
}
