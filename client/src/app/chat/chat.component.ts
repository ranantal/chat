import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../_services/chat.service'
import { Message } from '../_models/message';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
    messages: Message[] = [];
    myMessage: string;
    @Input() name: string;

    constructor(
        private chatService: ChatService
    ) {
        this.chatService.getObservable().
        subscribe((data: Message) => {
            this.messages.push(data);
        });
    }

    sendMessage(_message: string, _type: string = "MESSAGE"): void {
        console.log({
            type: _type,
            message: _message,
            name: this.name,
            time: 123
        });
        this.chatService.sendMessage({
            type: _type,
            message: _message,
            name: this.name,
            time: 123
        });
    }

    ngOnInit(): void {
        this.sendMessage(null, "CONNECT")
    }
}
