import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

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
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private aff: AngularFireFunctions,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    const messageRef = this.afs.doc<Message>('messages/1');

    this.form = this.fb.group({
      localMessage: [''],
      remoteMessage: [''],
    });

    this.form.controls.localMessage.valueChanges.pipe(
      tap(x => console.log('form valueChanges', x)),
      tap(x => messageRef.set({ body: x }))
    ).subscribe();

    messageRef.valueChanges().pipe(
      tap(x => console.log('messageRef valueChanges', x)),
      tap(x => this.message = x),
      tap(x => this.form.controls.remoteMessage.setValue(x.body, { emitEvent: false }))
    ).subscribe();
  }

  async callCloudFunctions() {
    this.functionsMessage = await this.aff.httpsCallable('helloWorld')(null).toPromise();
  }

  async logout() {
    await this.afa.signOut();
    this.router.navigate(['']);
  }
}
