import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/servicios/persona.service';
import { TokenService } from 'src/app/servicios/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  persona : Persona = new Persona("","","","","");
  isLogged = false;


  constructor(
    private persoService: PersonaService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.cargarPersona();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarPersona(): void {
    this.persoService.detail(1).subscribe((data) => {
      this.persona = data;
    });
  }

  onUpdate(): void {
    this.persoService.update(1, this.persona).subscribe(
      data => {
        Swal.fire({
          title: 'Perfecto',
          text: 'La persona se edito con exito',
          icon: 'success',
          background: '#0000',
          timer: 5000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          allowEscapeKey: true,
          stopKeydownPropagation: false,
          showConfirmButton: false
        })
      }, err =>{
        Swal.fire({
          title: 'Ooops',
          text: 'La persona no pudo ser editada',
          icon: 'error',
          background: '#0000',
          timer: 5000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          allowEscapeKey: true,
          stopKeydownPropagation: false,
          showConfirmButton: false
        })
        this.cargarPersona();
      }
    );
  }
}
