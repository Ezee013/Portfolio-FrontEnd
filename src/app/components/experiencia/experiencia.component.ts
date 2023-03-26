import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { TokenService } from 'src/app/servicios/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {
  experiencia: Experiencia[] = [];
  isLogged = false;
  //variable crear
  crearForm! : FormGroup;

  constructor(
    private xpService: ExperienciaService,
    private tokenService: TokenService,
    private router : Router,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.cargarExperiencia();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.crearForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre : ['', [Validators.required, Validators.minLength(3)]],
      inicio : ['', [Validators.required, Validators.min(1000)]],
      fin : ['', [Validators.required, Validators.min(1000)]],
      descripcion : ['', [Validators.required, Validators.minLength(5)]],
      img : ['']
    })
  }

  cargarExperiencia(): void {
    this.xpService.lista().subscribe((data) => {
      this.experiencia = data;
    });
  }

  onCreate(form):void{
    const xp = new Experiencia(form.nombre, form.inicio, form.fin, form.descripcion, form.img);
    this.xpService.save(xp).subscribe(data => {
      Swal.fire({
        title: 'Perfecto',
        text: 'La experiencia se creo con exito',
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
      this.cargarExperiencia();
    }, err =>{
      Swal.fire({
        title: 'Ooops',
        text: 'La experiencia no pudo ser añadida',
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
      this.router.navigate(['']);
    })
  }

  delete(id?: number) {
    if (id != undefined) {
      this.xpService.delete(id).subscribe(
        (data) => {
          this.cargarExperiencia();
          Swal.fire({
            title: 'Perfecto',
            text: 'La experiencia se borro con exito',
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
        },
        (err) => {
          Swal.fire({
            title: 'Ooops',
            text: 'La experiencia no pudo ser añadida',
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
        }
      );
    }
  }

  get Nombre() {
    return this.crearForm.get('nombre');
  }

  get Inicio () {
    return this.crearForm.get('inicio');
  }

  get Fin () {
    return this.crearForm.get('fin');
  }

  get Descripcion () {
    return this.crearForm.get('descripcion');
  }

  get Img () {
    return this.crearForm.get('img');
  }
}
