const fs = require('fs');
const path = require('path');

module.exports = {
    /*addPlayerPage: (req, res) => {
        res.render('add-player.ejs', {
            title: "Welcome to Socka | Add a new player"
            ,message: ''
        });
    },*/
	getBooks : (req, res) => {
	  let allBooksQuery = "SELECT * FROM `books`";

          db.query(allBooksQuery, (err, result) => {
            if (err){
                return res.status(500).send(err);
            }
	    else {
		    return res.json(result);
	    }
       
	  });
	},

    getContentLink: (req, res) => {
        let id = req.params.id ; 
        let getContentQuery = "SELECT `content` FROM `books` WHERE `id` = " + id ;
        console.log(getContentQuery);
        db.query(getContentQuery, (err, result) => {
                             if (err) {
                                 return res.status(500).send(err);
                             }
                             else {
                                return res.json(result);
                             }
                         });
    },
	addBook : (req, res) => {
    
    let name = req.body.name ;
	let author = req.body.author ;
    let subject = req.body.subject ;
    let publishingYear = req.body.publishingYear ; 
    let type = req.body.type ; 
    //treba dodati i id publishera (kada budemo imali vise )
     	let addBookQuery = "INSERT INTO `books` (`name`, `author`, `subject`, `publishingYear`, `type`)  VALUES ('" +
                            name + "', '" + author + "', '" + subject + "', " + publishingYear + ", '" + type + "')" ; 
        db.query(addBookQuery, (err, result) => {
           // console.log(result);
                            if (err) {
                                return res.status(500).send(err);
                            }
                            else {
                            return res.status(200).send(result) ;
                            }
                        });
	},
    
    editBook: (req, res) => {
        let id = req.body.id ; 
        let name = req.body.name ;
        let author = req.body.author ;
        let subject = req.body.subject ;
        let publishingYear = req.body.publishingYear ; 
        let type = req.body.type ; 
     
        let editBookQuery = "UPDATE `books` SET `name` = '" + name + "', `author` = '" + author 
                            + "', `subject` = '" + subject + "', `publishingYear` = " + publishingYear + ", `type` = '" + type + "' WHERE `books`.`id` = " + id ;
 
        db.query(editBookQuery, (err, result) => {
            if(err) {
                return res.status(500).send(err) ;
            }
            return res.status(200).send(result);
        });
    },
    
    increaseCopies: (req, res )=> {
        let id = req.body.bookID ; 
        console.log(id);
        let increaseCopiesQuery = "UPDATE `books` SET `numberOfCopies` = `numberOfCopies`+ 1 WHERE `id` = " + id ;
        
        db.query(increaseCopiesQuery, (err, result) => {
            if(err) {
                return res.status(500).send(err) ;
            }
            return res.status(200).send(result);
            
        })

    },
 
    deleteBook: (req, res) => {
       	let bookID = req.params.id;
       	let deleteBookQuery = "DELETE  from `books` WHERE `id` = " +  bookID ;
       	console.log(deleteBookQuery);
       	db.query(deleteBookQuery, (err, result) => {
           if (err) {
               return res.status(500).send(err);
           }
           return res.status(200).send(result);
        });
       },
       
    downloadFile : (req, res) => {
        var file = req.params.file ;
        console.log("Our file for download is " + file); 
          var fileLocation = path.join('./loads',file);
          console.log(fileLocation);
          res.download(fileLocation, file, (err) => {
            if (err) {
               return res.status(400).send(err);
            }
            else {
                console.log("File " + file + " has been downloaded");
                //return res.status(200).send(result);
            }
        }); 
    }
    
    // getOneBook : (req, res) => {
    //     let bookID = req.params.id ;
    //     let getBookQuery = "SELECT * from `books` WHERE `id` =" + bookID ; 
    //     console.log(getBookQuery) ; 
    //     db.query(getBookQuery, (err, result) => {
    //         if (err) {
    //             return res.status(500).send(err);
    //         }
    //         else {
    //             return res.json(result);
    //         }
    //         //return res.status(200).send(result);
    //      });
    // }
}
