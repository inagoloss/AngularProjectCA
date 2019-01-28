import { Component, OnInit } from '@angular/core';
import { Book} from '../book.model' ; 
import { manageService } from '../manageService.service'; 
import { Routes, Router } from '@angular/router' ;  

@Component({
  selector: 'app-load-content',
  templateUrl: './load-content.component.html',
  styleUrls: ['./load-content.component.css']
})
export class LoadContentComponent implements OnInit {
  editBook: Book = new Book() ; 
  books: Book[] = [];

  constructor(private manageService : manageService, private router: Router ) {
  }

  ngOnInit() {
    this.manageService.importBooks().subscribe((res: any[]) => {
      this.books = res;
    });
  }

   onAddBook() {
    this.router.navigate(['/addBook']);
   }
  

  onEditBook(index: number) {
    this.editBook = this.books[index];
    this.manageService.routeToEdit(this.editBook);
    this.router.navigate(['/editBook']);     
  }

  onDeleteBook(bookID: number, index: number) {
    this.manageService.deleteBook(bookID).toPromise().then((result) => {
      this.books.splice(index,1);
    });
  }


}
