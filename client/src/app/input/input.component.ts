import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../_services/chat.service';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html'
})
export class InputComponent implements OnInit {
    @Input() name: string;
    constructor(
        private chatService: ChatService
    ) { }

    sendMessage(message: string): void {
        if (message === "")
            return;

        this.chatService.sendMessage({
            type: "MESSAGE",
            message: message,
            name: this.name,
            time: new Date().getTime()
        });
    }

    ngOnInit(): void { }
}
