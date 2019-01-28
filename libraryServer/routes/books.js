const fs = require('fs');

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

	addBook : (req, res) => {
    
    let name = req.body.name ;
	let author = req.body.author ;
    let subject = req.body.subject ;
    let publishingYear = req.body.publishingYear ; 
    let type = req.body.type ; 
    //treba provjeriti ako je type 'copy' da se broj kopija inkrementira
 	let addBookQuery = "INSERT INTO `books` (`name`, `author`, `subject`, `publishingYear`, `type`)  VALUES ('" +
                            name + "', '" + author + "', '" + subject + "', " + publishingYear + ", '" + type + "')" ; 
        db.query(addBookQuery, (err, result) => {
           // console.log(result);
                            if (err) {
                                return res.status(500).send(err);
                            }
                            return res.status(200).send(result) ;
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

app.post('/api/uploads',upload.single('file'),function (req, res) {
 
    console.log('file received');
    console.log(req);
    var sql = "UPDATE `books` SET `content` =  '" + req.file.filename +"' WHERE `id`= 1" ;
  
    db.query(sql, function(err, result) {
      console.log('inserted data');
      if (err) {
        return res.status(500).send(err);
    }
    return res.status(200);
   });

message = "Successfully! uploaded";

    });