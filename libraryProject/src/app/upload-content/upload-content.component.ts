import { Component, OnInit } from '@angular/core';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { manageService } from '../manageService.service' ; 
import { Router } from '@angular/router' ; 

const URL = 'http://localhost:3000/api/uploads';

@Component({
  selector: 'app-upload-content',
  templateUrl: './upload-content.component.html',
  styleUrls: ['./upload-content.component.css']
})
export class UploadContentComponent implements OnInit {
path: string = '' ; 

  constructor(private manageService: manageService, private router: Router) { }
  
  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
     };
  }

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'file'});


  getPath(){
    console.log(this.path);
    }
    
}
