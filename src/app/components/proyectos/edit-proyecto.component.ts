import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css']
})
export class EditProyectoComponent {
  proy : Proyecto;

  constructor(private proyectoService: ProyectoService, private activatedRouter: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.proyectoService.detail(id).subscribe(
      data =>{
        this.proy = data;
      }, err =>{
        Swal.fire({
          title: 'Ooops',
          text: 'El proyecto no pudo ser editado',
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
      }
    )
  }

  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.proyectoService.update(id, this.proy).subscribe(
      data => {
        Swal.fire({
          title: 'Perfecto',
          text: 'El proyecto se edito con exito',
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
        this.router.navigate(['']);
      }, err =>{
        Swal.fire({
          title: 'Ooops',
          text: 'El proyecto no pudo ser editado',
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
      }
    )
  }

  regresar() : void {
    this.router.navigate(['']);
  }
}
