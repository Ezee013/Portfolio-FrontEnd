import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { TokenService } from 'src/app/servicios/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent {
  educacion : Educacion[] = [];
  isLogged = false;
  //variable crear
  crearForm! : FormGroup;

  constructor(
    private eduService: EducacionService,
    private tokenService: TokenService,
    private router : Router,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.cargarEducacion();
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

  cargarEducacion(): void {
    this.eduService.list().subscribe((data) => {
      this.educacion = data;
    });
  }

  onCreate(form):void{
    const xp = new Educacion(form.nombre, form.inicio, form.fin, form.descripcion, form.img);
    this.eduService.save(xp).subscribe(data => {
      Swal.fire({
        title: 'Perfecto',
        text: 'La educacion se creo con exito',
        // html:
        icon: 'success',
        // confirmButtonText:
        // footer:
        // width:
        // padding:
        background: '#0000',
        // grow:
        timer: 5000,
        timerProgressBar: true,
        toast: true,
        position: 'top-end',
        allowEscapeKey: true,
        stopKeydownPropagation: false,

        // input:
        // inputPlaceholder:
        // inputValue:
        // inputOptions:
        
        //  customClass: {
           	// container:
           	// popup:
           	// header:
           	// title: 
           	// closeButton
           	// icon:
           	// image:
           	// content:
           	// input:
           	// actions:
           	// confirmButton:
           	// cancelButton:
           	// footer:	
        //  }

        showConfirmButton: false
        // confirmButtonColor:
        // confirmButtonAriaLabel:

        // showCancelButton:
        // cancelButtonText:
        // cancelButtonColor:
        // cancelButtonAriaLabel:
        
        // buttonsStyling:
        // showCloseButton:
        // closeButtonAriaLabel:


        // imageUrl:
        // imageWidth:
        // imageHeight:
        // imageAlt:
      })
      this.cargarEducacion();
      this.crearForm = this.initForm();
    }, err =>{
      Swal.fire({
        title: 'Ooops',
        text: 'La educacion no pudo ser añadida',
        icon: 'error',
        background: '#0000',
        backdrop: true,
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
      this.eduService.delete(id).subscribe(
        (data) => {
          this.cargarEducacion();
          Swal.fire({
            title: 'Perfecto',
            text: 'La educacion se borro con exito',
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
            text: 'La educacion no pudo ser borrada',
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
