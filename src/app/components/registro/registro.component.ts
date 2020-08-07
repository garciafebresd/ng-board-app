import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UserModel;
  remember = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {

    this.usuario = new UserModel();

  }

  onSubmit(formRegistro: NgForm) {

    if (formRegistro.invalid) { return; }

    Swal.fire({
      title: 'Cargando',
      text: 'Espere por favor',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();


    this.authService.register(this.usuario).subscribe(response => {

      Swal.close();

      if (this.remember) {
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/home');

    }, (err) => {

      console.log(err.error.error.message);

      Swal.fire({
        title: 'Error al registrar',
        text: err.error.error.message,
        icon: 'error'
      });

    });

  }

}
