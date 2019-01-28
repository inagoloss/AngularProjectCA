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
  linkForDownload: string  ; 
  orderCriteria = 'A' ; 
  sortCriteria = 'Name' ; 

  constructor(private manageService : manageService, private router: Router ) {
  }

  ngOnInit() {
    this.manageService.importBooks().subscribe((res: any[]) => {
      this.books = res;
      console.log("Broj knjiga je " + this.books.length) ; 
      this.manageService.saveBooks(this.books);
      this.sortByName();
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

  onDownloadBook(bookID: number) {
    this.manageService.getLinkForDownload(bookID).subscribe( (res: string) => {
      console.log("res[0]  " +  res[0]["content"]);
        this.linkForDownload = res[0]["content"] ;
        console.log("Link for download is " + this.linkForDownload) ; 
        this.manageService.downloadFileWithLink(this.linkForDownload).toPromise().then((result) => {
          console.log("Downloaded");
        });
    });
  }

  onSort(sortCriteria: string) {
    this.sortCriteria = sortCriteria ; 
   if ( sortCriteria == 'Name' ) 
      this.sortByName();
   else if ( sortCriteria == 'Author' ) 
      this.sortByAuthor();
   else if ( sortCriteria == 'Subject' ) 
      this.sortBySubject();
  }

  onChangeOrder(orderCriteria: string) {
    this.orderCriteria = orderCriteria ;
    this.onSort(this.sortCriteria); 
  }

  sortByName() { 
    if ( this.orderCriteria === 'A')
       this.books.sort((a,b)=>a.name.localeCompare(b.name));
    else 
      this.books.sort((a,b)=>b.name.localeCompare(a.name));
  }

   sortByAuthor() { 
    if ( this.orderCriteria === 'A')
      this.books.sort((a,b)=>a.author.localeCompare(b.author));
    else 
      this.books.sort((a,b)=>b.author.localeCompare(a.author));
   }

   sortBySubject() { 
    if ( this.orderCriteria === 'A')
      this.books.sort((a,b)=>a.subject.localeCompare(b.subject));
    else 
      this.books.sort((a,b)=>b.subject.localeCompare(a.subject));
   }

}
