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
    booksForLoad: Book[] = [];

    constructor( private http: HttpClient) {
    }

    checkInformations(book: Book) {
        if ( book.name === undefined || book.author === undefined|| 
             book.subject === undefined || book.type === undefined|| 
             (book.publishingYear === undefined) )
             return true ; 
        return false ;
    }

    importBooks() {
          return this.http.get('http://localhost:2000/getAllBooks');
    }

    saveBooks(books: Book[]) {
        this.booksForLoad = books ; 
    }

    checkIfBookExists(book: Book) {
        for(let i=0; i<this.booksForLoad.length ; i++) {
            if ( book.name === this.booksForLoad[i].name) {
                if ( book.type === 'copy' ) { 
                    console.log("Knjiga je kopija" + this.booksForLoad[i].id) ; 
                    return this.booksForLoad[i].id ; 
                }
            } 
         }
        return -1 ; 
    }

    addBook(book: Book) {
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

    increaseNumberOfCopies(bookID: number) {
        console.log("Incrase " + bookID) ; 
        return this.http.post(
            'http://localhost:2000/increaseCopies', { "bookID" : bookID }, 
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
    
    getLinkForDownload(bookID: number) {
        return this.http.get(
            'http://localhost:2000/getDownloadLink/' + bookID); 
        }


    downloadFileWithLink(link: string){
        console.log("Link koji saljemo da se downloaduje je " + link );
        return this.http.get('http://localhost:2000/download/'+link);    
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