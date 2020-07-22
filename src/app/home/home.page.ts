import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';

interface Message { body: string };

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  message$: Observable<Message>;
  functionsMessage: Message;

  constructor(
    private afs: AngularFirestore,
    private aff: AngularFireFunctions
  ) { }

  ngOnInit() {
    this.message$ = this.afs.doc<Message>('messages/1').valueChanges();
  }

  messageChangeHandler(event: CustomEvent) {
    this.afs.doc<Message>('messages/1').set({ body: event.detail.value });
  }

  async callCloudFunctions() {
    this.functionsMessage = await this.aff.httpsCallable('helloWorld')(null).toPromise();
  }

}
