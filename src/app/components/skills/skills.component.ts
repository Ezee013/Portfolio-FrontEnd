import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/servicios/skill.service';
import { TokenService } from 'src/app/servicios/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  skills : Skill[] = [];
  isLogged = false;
   //variable crear
   crearForm! : FormGroup;

  constructor(
    private skillService: SkillService,
    private tokenService: TokenService,
    private router : Router,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.cargarHabilidad();
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
      porcentaje : ['', [Validators.required, Validators.min(1)]],
    })
  }

  onCreate(form):void{
    const xp = new Skill(form.nombre, form.porcentaje);
    this.skillService.save(xp).subscribe(data => {
      Swal.fire({
        title: 'Perfecto',
        text: 'La habilidad se creo con exito',
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
      this.cargarHabilidad();
    }, err =>{
      Swal.fire({
        title: 'Ooops',
        text: 'La habilidad no pudo ser añadida',
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

  cargarHabilidad(): void {
    this.skillService.lista().subscribe((data) => {
      this.skills = data;
    });
  }

  delete(id?: number) {
    if (id != undefined) {
      this.skillService.delete(id).subscribe(
        (data) => {
          this.cargarHabilidad();
          Swal.fire({
            title: 'Perfecto',
            text: 'La habilidad se borro con exito',
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
            text: 'La habilidad no pudo ser borrada',
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

  get Porcentaje () {
    return this.crearForm.get('porcentaje');
  }
}

