import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './componenti/dashboard/dashboard.component';
import { ListaUtentiComponent } from './componenti/lista-utenti/lista-utenti.component';
import { AggiungiUtenteComponent } from './componenti/aggiungi-utente/aggiungi-utente.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'ListaUtenti', pathMatch: 'full' }, //Se il path è vuoto allora faccio una redirect alla Lista Utenti
      { path: 'ListaUtenti', component: ListaUtentiComponent },
      { path: 'AggiungiUtente', component: AggiungiUtenteComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
