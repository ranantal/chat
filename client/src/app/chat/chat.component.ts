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

    }

    ngOnInit(): void {
        this.chatService.sendMessage({
            type: "CONNECT",
            message: null,
            name: this.name,
            time: new Date().getMilliseconds()
        });
    }
}
