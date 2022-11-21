const express = require('express');
const router = express.Router();
const Contact = require('../model/contact');
const validator = require('validator');

router.post('/addContact',(req,res)=>{
    const { user_name, email, contact_no } = req.body;

    if(!validator.isEmail(email)){
        return res.status(400).json('Invalid Email Id');
    }
    if(!validator.isMobilePhone(contact_no)){
        return res.status(400).json('Invalid Contact No');
    }

    Contact.findOne({ email }).then((user) => {
        if (user) {
          if (user.email === email)
            return res.status(400).json({ email: "Email already exists" });
        } 
        else {
          const newContact = new Contact({ user_name, email, contact_no });
          newContact
            .save()
            .then((user) => {
              return res.status(200).json(user);
            })
            .catch((err) => {
              return res
                .status(400)
                .json({ error: "Something Went Wrong. Please Try Again !" });
            });
        }
      }).catch((err) => {
        return res
          .status(400)
          .json({ error: "Something Went Wrong. Please Try Again !" });
      });
    
})

router.post('/deleteContact',(req,res)=>{
    const { email } = req.body;

    if(!validator.isEmail(email)){
        return res.status(400).json('Invalid Email Id');
    }

    Contact.findOne({ email }).then((user) => {
        if (user) {
            Contact.deleteOne({email})
            .then((r) => {
                return res.status(200).json('Contact Deleted')
            }).catch(err => {
                return res.status(400).json({ error: "Something Went Wrong. Please Try Again !" });
            })
        } 
        else {
          return res.status(400).json('No user found')
        }
      }).catch(err => {
        return res.status(400).json({ error: "Something Went Wrong. Please Try Again !" });
    });
    
})

router.post('/editContact',(req,res)=>{
    const { email,contact_no } = req.body;

    if(!validator.isEmail(email)){
        return res.status(400).json('Invalid Email Id');
    }
    if(!validator.isMobilePhone(contact_no)){
        return res.status(400).json('Invalid Contact No');
    }
    

    Contact.findOne({ email }).then((user) => {
        if (user) {
            Contact.updateOne({email},{$set : {contact_no : contact_no}})
            .then((user_) => {
                return res.status(200).json('Contact Edited')
            }).catch(err => {
                return res.status(400).json({ error: "Something Went Wrong. Please Try Again !" });
            })
        } 
        else {
          return res.status(400).json('No user found')
        }
      }).catch(err => {
        return res.status(400).json({ error: "Something Went Wrong. Please Try Again !" });
    });
    
});

router.get('/searchByName/:page',(req,res)=>{
    const { user_name } = req.body;
    const page = parseInt(req.params.page);

    Contact.find({ user_name },)
        .skip(10*(page-1))
        .limit(10)
        .then((users) => {
            if (users.length) {
                return res.status(200).json(users);
            } 
            else {
                return res.status(400).json('No users found');
            }
        }).catch(err => {
            return res.status(400).json({ error: "Something Went Wrong. Please Try Again !" });
        });
    
});


router.get('/searchByEmail/:page',(req,res)=>{
    const { email } = req.body;
    const page = parseInt(req.params.page);

    Contact.find({ email },)
        .skip(10*(page-1))
        .limit(10)
        .then((users) => {
            if (users.length) {
                return res.status(200).json(users);
            } 
            else {
                return res.status(400).json('No users found');
            }
        }).catch(err => {
            return res.status(400).json({ error: "Something Went Wrong. Please Try Again !" });
        });
    
});

module.exports = router;
