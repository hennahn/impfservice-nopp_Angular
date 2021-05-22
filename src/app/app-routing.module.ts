import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { VaccinationDetailsComponent } from './vaccination-details/vaccination-details.component';
import { VaccinationFormComponent } from './vaccination-form/vaccination-form.component';
import { VaccinationListComponent } from './vaccination-list/vaccination-list.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'vaccinations', component: VaccinationListComponent },
  { path: 'vaccinations/:id', component: VaccinationDetailsComponent },
  { path: 'editor', component: VaccinationFormComponent },
  { path: 'editor/:id', component: VaccinationFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserListComponent },
  { path: 'vaccinations/:id/book', component: VaccinationDetailsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
