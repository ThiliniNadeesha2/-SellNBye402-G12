const express = require('express');
const app = express();
const bodyPaser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const DeliverRoute = express.Router();
const PORT = 4000;

app.use(cors());
app.use(bodyPaser.json());

const Deliver = require('./Deliver.model');

mongoose.connect('mongodb://127.0.0.1:27017/Books',{useNewUrlParser: true}, function (err) {
    if(err){
        throw err;
    }
    else{
        console.log("Mongodb database connection established successfully");
    }
});

DeliverRoute.route('/').get(function (req, res) {
    Deliver.find(function (err, Books) {
        if(err){
            console.log(err);
        }else {
            res.json(Books);
        }
    });
});


DeliverRoute.route('/:id').get(function (req, res) {

    let id = req.params.id;
    Deliver.findById(id,function (err, Books) {
        res.json(Books);
    });
});

DeliverRoute.route('/add').post(function (req, res) {
    let deliver = new Deliver(req.body);
    deliver.save()
        .then(deliver => {
            res.status(200).json({'deliver': 'Deliver details added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new deliver detail was failed')
        });
});


DeliverRoute.route('/update/:id').post(function (req, res) {
    Deliver.findById(req.params.id, function (err, Books) {
        if(!Books)
            res.status(404).send('data is not found');


        else
            Books.contact_name = req.body.contact_name;
            Books.email = req.body.email;
            Books.contact_number = req.body.contact_number;
            Books.address = req.body.address;
            Books.zip_code = req.body.zip_code;
            Books.deliver_completed = req.body.deliver_completed;



        Books.save().then(deliver => {
            res.json('deliver details updated');
        })

            .catch(err => {
                res.status(400).send("update not possible")
            });
    });
});

app.use('/deliver', DeliverRoute);
app.listen(PORT, function () {
    console.log("server is running on port:" +PORT);
});

