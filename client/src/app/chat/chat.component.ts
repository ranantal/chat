import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../_services/chat.service'
import { Message } from '../_models/message';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    @Input() name: string;

    constructor(
        private chatService: ChatService
    ) {
        this.chatService.connect();
    }

    ngOnInit(): void {
        let interval = setInterval(() => {
            console.log(interval);
            if (this.chatService.checkConnection() === WebSocket.OPEN) {
                this.chatService.sendMessage({
                    type: "CONNECT",
                    message: null,
                    name: this.name,
                    time: new Date().getTime()
                });
                clearInterval(interval);
            }
        }, 100)
    }
}
