import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dataUser: any;
  constructor(private afAuth: AngularFireAuth, private router: Router) {}
  ngOnInit(): void {
    const userDataString = sessionStorage.getItem('Userdata');

    if (!userDataString) {
      // No se encontraron datos en sessionStorage, redirigir al login
      this.router.navigate(['/login']);
      return; // Salir de la función para evitar errores adicionales
    }

    const userData = JSON.parse(userDataString);

    if (userData && userData.user) {
      this.dataUser = userData.user.email;
      if (userData.user.emailVerified) {
        // La dirección de correo electrónico está verificada
        const emailVerified = userData.user.emailVerified;
        console.log('emailVerified:', emailVerified);
      } else {
        // La dirección de correo electrónico no está verificada, redirigir al login
        this.router.navigate(['/login']);
      }
    } else {
      // No se encontraron datos válidos en userData, redirigir al login
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.afAuth.signOut().then(() => this.router.navigate(['/login']));
    sessionStorage.clear();
  }
}
