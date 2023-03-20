import { Component } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  persona: Persona = new Persona("", "", "");

  constructor(public persoServ: PersonaService) {}
  
  ngOnInit(): void {
    this.persoServ.getPersona().subscribe(data => {
      this.persona = data
    })
  }
}
