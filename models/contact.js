const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ContactForm = new Schema({
   f_name: {
      type: String,
      required: true
   },
   s_name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   phone: {
      type: String,
      required: true
   },
   meassage: {
      type: String,
      required: true
   }


})

mongoose.model('contacts', ContactForm);