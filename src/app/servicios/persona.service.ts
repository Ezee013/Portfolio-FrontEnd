import { AUTO_STYLE } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../model/persona.model';


@Injectable({
  providedIn: 'root'
})


export class PersonaService {

  URL = "http://localhost:8080/persona/traer/";

  constructor(private htpp:HttpClient) { }
  
  public getPersona(): Observable<Persona> {
    return this.htpp.get<Persona>(this.URL + "2")
  }
   
}
