import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/servicios/skill.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent {
  skill : Skill;

  constructor(private skillService: SkillService, private activatedRouter: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.skillService.detail(id).subscribe(
      data =>{
        this.skill = data;
      }, err =>{
        Swal.fire({
          title: 'Ooops',
          text: 'La habilidad no pudo ser editada',
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
    this.skillService.update(id, this.skill).subscribe(
      data => {
        Swal.fire({
          title: 'Perfecto',
          text: 'La habilidad se edito con exito',
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
          text: 'La habilidad no pudo ser editada',
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
