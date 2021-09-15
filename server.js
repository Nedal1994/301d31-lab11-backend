'use strict'

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const server = express();
server.use(cors());
server.use(express.json())

const PORT = process.env.PORT;
let BookModel;
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    url: String,
    email: String
  });
  BookModel = mongoose.model('Books', bookSchema);

  // getData()
}

async function getData() {
  const book1 = new BookModel
    ({
      title: 'Fundamentals of Information Technology',
      description: 'Fundamentals of Information Technology comprehensively covers both the basic and advanced aspects of information technology. It starts with a simple but comprehensive discussion of basic concepts of IT as well as computer science.',
      status: 'OK',
      url: 'https://images-na.ssl-images-amazon.com/images/I/516LBMUyGQL._SX331_BO1,204,203,200_.jpg',
      email: 'nedal_al_saleh94@hotmail.com'
    });
  const book2 = new BookModel
    ({
      title: 'Cybersecurity For Dummies',
      description: 'NetwoCybersecurity is the protection against the unauthorized or criminal use of electronic data and the practice of ensuring the integrity, confidentiality, and availability of information. Being "cyber-secure" means that a person or organization has both protected itself against attacks by cyber criminals and other online scoundrels, and ensured that it has the ability to recover if it is attacked.rking',
      status: 'Available',
      url: 'https://images-na.ssl-images-amazon.com/images/I/51lYp5ZHjXL._SX397_BO1,204,203,200_.jpg',
      email: 'nedal_al_saleh94@hotmail.com'
    });
  const book3 = new BookModel
    ({
      title: 'Project Management All-in-One For Dummies',
      description: 'Perform Be Agile! Time-crunch! Right now, the business world has never moved so fast and project managers have never been so much in demand—the Project Management Institute has estimated that industries will need at least 87 million employees with the full spectrum of PM skills by 2027. To help you meet those needs and expectations in time, Project Management All-in-One For Dummies provides with all the hands-on information and advice you need to take your organizational, planning, and execution skills to new heights.',
      status: 'Available',
      url: 'https://images-na.ssl-images-amazon.com/images/I/51Qwa5tnUdL._SX397_BO1,204,203,200_.jpg',
      email: 'nedal_al_saleh94@hotmail.com'
    });

  await book1.save()
  await book2.save()
  await book3.save()

}


server.get('/', homeHandler)
server.get('/getBooks', booksHandler)
server.post('/addBook', addbookHandler)
server.delete('/deleteBook/:id', deletebookHandler)
server.put('/updateBook/:id', updatebookHandler)

function homeHandler(req, res) {
  res.send('Homepage')
}

function booksHandler(req, res) {
  const email = req.query.email
  BookModel.find({ email: email }, (error, result) => {
    if (error) {
      console.log(error);
    }
    else {
      res.send(result)
      console.log(result);
    }
  })
}
async function addbookHandler(req, res) {
  const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;
  const email = req.body.email;

  await BookModel.create({
    title: title,
    description: description,
    status: status,
    email: email
  });

BookModel.find({ email: email }, (error, result) => 
  {
    if (error) 
    {
      console.log(error);
    }
    else
     {
      res.send(result)
      console.log(result);
    }
  })
  
}
async function deletebookHandler(req, res)
 {
  const bookId = req.params.id
  const email = req.query.email
  BookModel.deleteOne({ _id: bookId }, (error, result) => 
  {
    BookModel.find({ email: email }, (error, result) => 
    {
      if (error) 
      {
        console.log(error);
      }
      else
       {
        res.send(result)
        console.log(result);
      }
    })
  })
}
async function updatebookHandler(req, res)
 {
  const bookId = req.params.id
  const {title,description,status,email} = req.body
  BookModel.findByIdAndUpdate(bookId,{title,description,status}, (error, result) => 
  {
    BookModel.find({ email: email }, (error, result) => 
    {
      if (error) 
      {
        console.log(error);
      }
      else
       {
        res.send(result)
        console.log(result);
      }
    })
  })
}

server.listen(PORT, () => {
  console.log(`${PORT}`);
})