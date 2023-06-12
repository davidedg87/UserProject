import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaUtentiComponent } from './componenti/lista-utenti/lista-utenti.component';
import { AggiungiUtenteComponent } from './componenti/aggiungi-utente/aggiungi-utente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { DashboardComponent } from './componenti/dashboard/dashboard.component';
import { FooterComponent } from './componenti/footer/footer.component';
import { PopupComponent } from './componenti/popup/popup.component';
import { MatMenuModule } from '@angular/material/menu';


import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { HeaderComponent } from './componenti/header/header.component';
import { MenuMobileComponent } from './componenti/menu-mobile/menu-mobile.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ListaUtentiComponent,
    AggiungiUtenteComponent,
    FooterComponent,
    PopupComponent,
    HeaderComponent,
    MenuMobileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
