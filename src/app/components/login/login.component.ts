import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormBuilder, Validators, FormGroupName } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginusuario2: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService
  ) {
    this.loginusuario2 = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    const key = sessionStorage.getItem('Userdata');

    if (key) {
      // Navegar a la página de dashboard
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    const email = this.loginusuario2.value.email;
    const password = this.loginusuario2.value.password;
    this.loading = true;
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user.user?.emailVerified) {
          sessionStorage.setItem('Userdata',JSON.stringify(user));
          this.toastr.success('Ingreso correntamente');
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/verificar-correo']);
        }
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
        this.toastr.error(
          this.firebaseError.firebaseCodeError(error.code),
          'Error'
        );
      });
  }
}
