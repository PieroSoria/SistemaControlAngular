import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.scss'],
})
export class RecuperarPasswordComponent implements OnInit {
  recuperarusuario: FormGroup;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService
  ) {
    this.recuperarusuario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  recuperar(){
    const email = this.recuperarusuario.value.correo;
    this.loading = true;
    this.afAuth.sendPasswordResetEmail(email).then(() => {
      this.toastr.info('Le enviamos un correo para restablecer su password ','recuperar Password')
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.loading = false;
      this.toastr.error(this.firebaseError.firebaseCodeError(error.code),"Error")
    })
  }

  ngOnInit(): void {}
}
