import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headerbash',
  templateUrl: './headerbash.component.html',
  styleUrls: ['./headerbash.component.scss'],
})
export class HeaderbashComponent implements OnInit{
  constructor(private afAuth: AngularFireAuth, private router: Router) {}
  ngOnInit(): void {

  }
  logout() {
    this.afAuth.signOut().then(() => this.router.navigate(['/login']));
    sessionStorage.clear();
  }
}
