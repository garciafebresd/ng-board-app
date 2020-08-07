import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginModel } from 'src/app/models/login.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: LoginModel;
  remember = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new LoginModel();

    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.remember = true;
    }
  }

  login(formRegistro: NgForm) {

    if (formRegistro.invalid) { return; }

    Swal.fire({
      title: 'Cargando',
      text: 'Espere por favor',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    this.authService.login(this.usuario).subscribe(response => {

      Swal.close();

      if (this.remember) {
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/home');

    }, (err) => {
      console.log(err.error.error.message);

      Swal.fire({
        title: 'Error al autenticar',
        text: 'Email o password invalidos',
        icon: 'error'
      });
    });
  }
}
