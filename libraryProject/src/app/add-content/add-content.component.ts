import { Component, OnInit } from '@angular/core';
import { manageService } from '../manageService.service' ; 
import { Router } from '@angular/router' ; 
import { Book } from '../book.model' ; 

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {
  oneBook: Book = new Book(); 

  constructor(private manageService: manageService, private router: Router) { }

  ngOnInit() {
  }

    testFunction(){
    document.getElementById('hCopy').onclick = showNumberOfCopies;
  
  function showNumberOfCopies(){
    document.getElementById('copyNo').style.visibility="visible"; 
  }
}
  
  onConfirmAddingBook() {
    console.log("New book " + this.oneBook) ; 
    this.manageService.addBook(this.oneBook).toPromise().then((result)=> {
      //this.books.push(this.oneBook);
       this.oneBook = new Book() ;
    });
    this.router.navigate(['/loadBooks']);
  }

}
