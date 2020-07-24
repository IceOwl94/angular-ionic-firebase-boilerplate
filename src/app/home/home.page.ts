import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FormGroup, FormBuilder } from '@angular/forms';

interface Message { body: string };

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  message: Message;
  functionsMessage: Message;
  form: FormGroup;

  constructor(
    private afs: AngularFirestore,
    private aff: AngularFireFunctions,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const messageRef = this.afs.doc<Message>('messages/1');

    this.form = this.fb.group({
      message: ['']
    });

    this.form.controls.message.valueChanges.pipe(
      tap(x => console.log('form valueChanges', x)),
      tap(x => messageRef.set({ body: x }))
    ).subscribe();

    messageRef.valueChanges().pipe(
      tap(x => console.log('messageRef valueChanges', x)),
      tap(x => this.message = x),
      tap(x => this.form.controls.message.setValue(x.body, { emitEvent: false }))
    ).subscribe();
  }

  async callCloudFunctions() {
    this.functionsMessage = await this.aff.httpsCallable('helloWorld')(null).toPromise();
  }

}
