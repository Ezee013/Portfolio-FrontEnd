import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEducacionComponent } from './components/educacion/edit-educacion.component';
import { EditExperienciaComponent } from './components/experiencia/edit-experiencia.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { Pagina404Component } from './components/pagina404/pagina404.component';
import { EditProyectoComponent } from './components/proyectos/edit-proyecto.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EditSkillComponent } from './components/skills/edit-skill.component';
import { GuardGuard } from './servicios/guard.guard';

const routes: Routes = [
  {path: "Home", component: MainComponent},
  {path: "LogIn", component : LoginComponent},
  {path: "SignUp", component : RegistroComponent},
  {path: "", redirectTo: "Home", pathMatch: 'full'},
  {path: "editaredu/:id", component: EditEducacionComponent, canActivate:[GuardGuard]},
  {path: "editarexp/:id", component: EditExperienciaComponent, canActivate:[GuardGuard]},
  {path: "editarproy/:id", component: EditProyectoComponent, canActivate:[GuardGuard]},
  {path: "editarskill/:id", component: EditSkillComponent, canActivate:[GuardGuard]},
  {path:'**', component: Pagina404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
