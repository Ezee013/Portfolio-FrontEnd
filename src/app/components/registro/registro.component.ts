import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  authorities: string[];
  crearForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.crearForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      nombreUsuario: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  onRegister(form): void {
    const nuevoUsuario = new NuevoUsuario(form.nombre, form.nombreUsuario, form.email, form.password);
    this.authService.nuevo(nuevoUsuario).subscribe(data => {
      Swal.fire({
        title: 'Perfecto',
        text: 'El usuario se creo con exito',
        icon: 'success',
        background: '#0000',
        backdrop: true,
        timer: 5000,
        timerProgressBar: true,
        toast: true,
        position: 'top-end',
        allowOutsideClick: true,
        allowEscapeKey: true,
        allowEnterKey: true,
        stopKeydownPropagation: false,
        showConfirmButton: false
      })
      this.router.navigate(['/LogIn']);
    }, err => {
      Swal.fire({
        title: 'Ooops',
        text: 'El usuario no pudo ser creado',
        icon: 'error',
        background: '#0000',
        backdrop: true,
        timer: 5000,
        timerProgressBar: true,
        toast: true,
        position: 'top-end',
        allowOutsideClick: true,
        allowEscapeKey: true,
        allowEnterKey: true,
        stopKeydownPropagation: false,
        showConfirmButton: false
      })
      this.router.navigate(['/LogIn']);
    })
  }

  get Nombre() {
    return this.crearForm.get('nombre');
  }

  get NombreUsuario () {
    return this.crearForm.get('nombreUsuario');
  }

  get Email () {
    return this.crearForm.get('email');
  }

  get Password () {
    return this.crearForm.get('password');
  }

}
