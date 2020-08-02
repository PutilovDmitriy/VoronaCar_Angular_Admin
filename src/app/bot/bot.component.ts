import { Component, OnInit } from '@angular/core';
import { BotMessage, BotService, Chat } from '../services/bot.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss'],
  providers: [BotService],
})
export class BotComponent implements OnInit {
  currentChat: Chat;
  currentMessage: BotMessage;
  send: string;
  /** Отображать сообщение о фалидации */
  warning = false;

  constructor(
    public botService: BotService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.botService.getChats().subscribe(
      (chats) => {
        this.botService.chats = chats;
        this.botService.loading = false;
      },
      (err) => {
        this.botService.loading = false;
      }
    );
  }

  cleatData() {
    this.warning = false;
    this.send = '';
  }

  changeCurrentChat(chat: Chat) {
    this.currentChat = chat;
    this.currentMessage = chat.messages[0];
    this.cleatData();
  }

  sendMessage() {
    if (this.send.trim()) {
      const send = {
        _id: this.currentMessage._id,
        chatId: this.currentMessage.chatId,
        message: this.send,
      };
      this.botService.sendMessage(send).subscribe(
        (res) => {
          this.botService.loading = false;
          this.notificationService.showInfo('Сообщение отправлено!');
          this.getChats();
        },
        (err) => {
          this.botService.loading = false;
          this.notificationService.showError(err.error.message);
        }
      );
    } else {
      this.warning = true;
    }
  }

  getChats() {
    this.cleatData();
    this.botService.getChats().subscribe(
      (chats) => {
        this.botService.loading = false;
        this.botService.chats = chats;
        if (this.botService.chats.length > 0) {
          const currentChat = this.botService.chats.find(
            (chat) => chat.id === this.currentChat.id
          );
          if (currentChat) {
            this.changeCurrentChat(currentChat);
          } else {
            this.changeCurrentChat(this.botService.chats[0]);
          }
        } else {
          this.currentMessage = null;
          this.currentChat = null;
        }
      },
      (error) => {
        this.notificationService.showError(error.error.message);
      }
    );
  }

  deleteMessage() {
    this.cleatData();
    this.botService.deleteMessage(this.currentMessage._id).subscribe(
      (res) => {
        this.botService.loading = false;
        this.notificationService.showInfo('Сообщение удалено');
        this.getChats();
      },
      (err) => {
        this.botService.loading = false;
        this.notificationService.showError(err.error.message);
      }
    );
  }
}
