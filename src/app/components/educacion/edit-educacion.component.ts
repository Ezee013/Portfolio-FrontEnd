import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-educacion',
  templateUrl: './edit-educacion.component.html',
  styleUrls: ['./edit-educacion.component.css']
})
export class EditEducacionComponent {
  edu: Educacion;

  constructor(private eduService: EducacionService, private activatedRouter: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.eduService.detail(id).subscribe(
      data =>{
        this.edu = data;
      }, err =>{
        Swal.fire({
          title: 'Ooops',
          text: 'La educacion no pudo ser editada',
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
    this.eduService.update(id, this.edu).subscribe(
      data => {
        Swal.fire({
          title: 'Ooops',
          text: 'La educacion se edito con exito',
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
          text: 'La educacion no pudo ser editada',
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
