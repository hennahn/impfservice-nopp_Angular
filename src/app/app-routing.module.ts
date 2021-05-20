import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { VaccinationDetailsComponent } from './vaccination-details/vaccination-details.component';
import { VaccinationFormComponent } from './vaccination-form/vaccination-form.component';
import { VaccinationListComponent } from './vaccination-list/vaccination-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'vaccinations', component: VaccinationListComponent },
  { path: 'vaccinations/:id', component: VaccinationDetailsComponent },
  { path: 'admin', component: VaccinationFormComponent },
  { path: 'admin/:id', component: VaccinationFormComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
