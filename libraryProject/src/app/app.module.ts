import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms' ;
import { FileSelectDirective } from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { LoadContentComponent } from './load-content/load-content.component';
import { AddContentComponent } from './add-content/add-content.component';
import { EditContentComponent } from './edit-content/edit-content.component';
import { Routes, RouterModule } from '@angular/router' ;
import { manageService } from './manageService.service' ;
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { LoginComponent } from './login/login.component';
import {APP_BASE_HREF} from '@angular/common';
import { UploadContentComponent } from './upload-content/upload-content.component';  

const appRoutes : Routes = [ 
  { path: '', component: LoginComponent},
  { path: 'editBook', component: EditContentComponent} , 
  { path: 'addBook', component: AddContentComponent }, 
  { path: 'loadBooks', component: LoadContentComponent}
] ;

@NgModule({
  declarations: [
    AppComponent,
    LoadContentComponent,
    AddContentComponent,
    EditContentComponent,
    LoginComponent,
    FileSelectDirective,
    UploadContentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [manageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
