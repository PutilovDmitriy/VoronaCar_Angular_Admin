import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../../env';

export interface Chat {
  id: number;
  messages: BotMessage[];
}

export interface BotMessage {
  _id: string;
  chatId: number;
  message: string;
}

@Injectable()
export class BotService {
  loading = false;
  deleting = false;
  chats: Chat[] = [];

  constructor(private http: HttpClient) {}

  getChats(): Observable<Chat[]> {
    this.loading = true;
    return this.http.get<Chat[]>(`${URL_SERVER}/bot/info`);
  }

  // getMessageById(chatId: number, messageId: string): Observable<BotMessage> {
  //   return new Observable<BotMessage>((observable) => {
  //     observable.next(
  //       this.chats
  //         .find((chat) => chat.id === chatId)
  //         .messages.find((mes) => mes._id === messageId)
  //     );
  //   });
  // }

  sendMessage(bot: BotMessage): Observable<string> {
    this.loading = true;
    return this.http.post<string>(`${URL_SERVER}/bot/send`, bot);
  }

  deleteMessage(id: string): Observable<string> {
    this.deleting = true;
    return this.http.delete<string>(`${URL_SERVER}/bot/${id}`);
  }
}
