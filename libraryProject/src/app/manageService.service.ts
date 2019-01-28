//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/map';
import { map, filter, scan , catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Router } from '@angular/router';

import {Book} from './book.model' ; 

@Injectable()
export class manageService {

    private postUrl = 'localhost:2000';
    bookForEdit : Book = new Book() ; 

    constructor( private http: HttpClient) {
    }

    importBooks() {
          console.log("Service works");
          return this.http.get('http://localhost:2000/getAllBooks');
    }

    addBook(book: Book) {
        console.log("AddBook service " + book) ;
        return this.http.post(
            'http://localhost:2000/add', book , 
             {headers: this.getHeader()})
           .pipe(
           catchError((error) => this.handleError(error)));
    }

    // getBookById(bookID: number): Promise<Book> {
    //     return this.http.get<Book>('http://localhost:2000/getBookById/' + bookID).toPromise();
    // }

    updateBook(book: Book) {
        console.log("EDIT BOOK" + book) ;

            return this.http.post(
            'http://localhost:2000/editBook', book , 
             {headers: this.getHeader()})
           .pipe(
           catchError((error) => this.handleError(error)));
    }

    deleteBook(bookID: number) {
       // const url = this.postUrl + '/deleteBook/:' + bookID ;
       console.log('calling service', bookID);
       const route = 'http://localhost:2000/deleteBook/' + bookID;
       console.log('route', route);
        return this.http.get(route);
    }

    uploadBook(bookID: number) {
        
    }
    
    private handleError(err) {
        return throwError(err);
    }

    private getHeader() {
        const headerProperties = {
            'Content-Type': 'application/json',
        };
        return new HttpHeaders (headerProperties);
    }

    routeToEdit(editBook: Book) {
        this.bookForEdit = editBook ; 
    }

    getToEdit() {
        return this.bookForEdit ; 
    }

}