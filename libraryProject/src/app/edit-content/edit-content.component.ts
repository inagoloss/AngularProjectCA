import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' ; 
import { manageService } from '../manageService.service' ; 
import { Book } from '../book.model' ; 

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.css']
})
export class EditContentComponent implements OnInit {
editingBook: Book = new Book() ; 

  constructor(private manageService: manageService, private router: Router) { }

  ngOnInit() {
  this.editingBook = this.manageService.getToEdit() ;
  }

  onSubmitEdit() {
    this.manageService.updateBook(this.editingBook).toPromise().then( (result) => {
      this.editingBook = new Book();
      this.router.navigate(['/loadBooks']);
    }); 
  }


}
