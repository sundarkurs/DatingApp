import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/paginatedResult';
import { map } from 'rxjs/operators';
import { Message } from '../_models/message';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMessages(id: number, page?, itemsPerPage?, messageContainer?) {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<
      Message[]
    >();

    let params = new HttpParams();

    params = params.append('MessageContainer', messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http
      .get<Message[]>(this.baseUrl + 'users/' + id + '/messages', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }

          return paginatedResult;
        })
      );
  }

  getMessageThread(id: number, recipientId: number) {
    return this.http.get<Message[]>(
      this.baseUrl + 'users/' + id + '/messages/thread/' + recipientId
    );
  }

  sendMessage(id: number, message: Message) {
    return this.http.post(this.baseUrl + 'users/' + id + '/messages', message);
  }

  deleteMessage(id: number, userId: number) {
    return this.http.post(
      this.baseUrl + 'users/' + userId + '/messages/' + id,
      {}
    );
  }

  markAsRead(userId: number, messageId: number) {
    this.http
      .post(
        this.baseUrl + 'users/' + userId + '/messages/' + messageId + '/read',
        {}
      )
      .subscribe();
  }
}
