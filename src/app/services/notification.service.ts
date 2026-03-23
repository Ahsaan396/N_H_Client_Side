import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // The 'Subject' is our internal transmitter
  private messageSubject = new Subject<string>();

  // The 'message$' is what the AppComponent will listen to
  message$: Observable<string> = this.messageSubject.asObservable();

  show(msg: string): void {
    this.messageSubject.next(msg); // This "pushes" the string into the stream
  }
}