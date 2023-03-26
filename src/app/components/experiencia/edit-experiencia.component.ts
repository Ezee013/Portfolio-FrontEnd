import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css']
})
export class EditExperienciaComponent {
  exp: Experiencia;

  constructor(private xpService: ExperienciaService, private activatedRouter: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.xpService.detail(id).subscribe(
      data =>{
        this.exp = data;
      }, err =>{
        Swal.fire({
          title: 'Ooops',
          text: 'La experiencia no pudo ser editada',
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
    this.xpService.update(id, this.exp).subscribe(
      data => {
        Swal.fire({
          title: 'Perfecto',
          text: 'La experiencia se edito con exito',
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
          text: 'La experiencia no pudo ser editada',
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
