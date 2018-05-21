import { Component, OnInit } from '@angular/core';
import { ChatService } from '../_services/chat.service';

import { Message } from '../_models/message';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {
    private users: Map<string, number> = new Map(); 

    constructor(private chatService: ChatService) {
        this.chatService.getObservable().subscribe((data: Message) => {
            if (data.type === 'CONNECT') {
                if (this.users.has(data.name))
                    this.users.set(data.name, this.users.get(data.name) + 1);
                else
                    this.users.set(data.name, 1);
            }

            if (data.type === 'DISCONNECT') {
                if (this.users.has(data.name))
                    this.users.set(data.name, this.users.get(data.name) - 1);
                else
                    this.users.set(data.name, -1);
            }
        })
    }


    getUsers(): string[] {
        let users: string[] = [];
        this.users.forEach((value: number, key: string, map: Map<string, number>) => {
            if (value > 0)
                users.push(key + ` (${value})`);
        });
        return users;
    }

    ngOnInit(): void { }
}
