import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async authWithGoogle() {
    const userCredential = await this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.authSuccess(userCredential);
  }

  async authAnonymously() {
    const userCredential = await this.auth.signInAnonymously();
    this.authSuccess(userCredential);
  }

  async authSuccess(userCredential: auth.UserCredential) {
    console.log(userCredential);
    await this.router.navigate(['home'], { replaceUrl: true });
  }
}
