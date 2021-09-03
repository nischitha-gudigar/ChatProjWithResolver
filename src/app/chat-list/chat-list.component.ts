import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { chatActionState, MyAppState } from '../app.state';
import { ChatData, ChatResolver } from '../chat-data';
import { ChatList } from '../chat-list.service';
import { addChatOnLoad } from '../store/chat-load.action';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  public contactsForDisplay$: Observable<ChatData[]>;
  public messageDisplay$: Observable<chatActionState[]>;
  public errorMessage: string;
  constructor(
    private chatService: ChatList,
    private store: Store<MyAppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // this.chatService.getChatList().subscribe(contacts => {
    //   this.store.dispatch(addChatOnLoad({ contacts }));
    // });
    const resolvedData: ChatResolver = this.route.snapshot.data['resolvedData'];
    this.errorMessage = resolvedData.error;
    this.store.dispatch(addChatOnLoad(resolvedData));
    console.log(resolvedData);
    /* Get contacts and messages from store */
    this.contactsForDisplay$ = this.store.select('contacts');
    this.messageDisplay$ = this.store.select('messages');
  }
}
