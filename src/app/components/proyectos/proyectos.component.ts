import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TokenService } from 'src/app/servicios/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {
  proyecto: Proyecto[] = [];
  isLogged = false;
  //variable crear
  crearForm! : FormGroup;

  constructor(
    private proyectoService: ProyectoService,
    private tokenService: TokenService,
    private router : Router,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.cargarProyecto();
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
      descripcion : ['', [Validators.required, Validators.minLength(5)]],
      link : ['', [Validators.required]],
      img : ['']
    })
  }


  cargarProyecto(): void {
    this.proyectoService.list().subscribe((data) => {
      this.proyecto = data;
    });
  }

  onCreate(form):void{
    const xp = new Proyecto(form.nombre,  form.descripcion, form.link, form.img);
    this.proyectoService.save(xp).subscribe(data => {
      Swal.fire({
        title: 'Perfecto',
        text: 'El proyecto se creo con exito',
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
      this.cargarProyecto();
      this.crearForm = this.initForm();
    }, err =>{
      Swal.fire({
        title: 'Ooops',
        text: 'El proyecto no pudo ser añadido',
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
      this.proyectoService.delete(id).subscribe(
        (data) => {
          this.cargarProyecto();
          Swal.fire({
            title: 'Perfecto',
            text: 'El proyecto se borro con exito',
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
            text: 'El proyecto no pudo ser añadido',
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

  get Descripcion () {
    return this.crearForm.get('descripcion');
  }

  get Link () {
    return this.crearForm.get('link');
  }

  get Img () {
    return this.crearForm.get('img');
  }
}
