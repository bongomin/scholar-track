const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Contactform = new Schema(
   {
      f_name: {
         type: String
      },
      s_name: {
         type: String
      },
      email: {
         type: String
      },
      phone: {
         type: String
      },
      message: {
         type: String
      }


   }
)

mongoose.model('contacts', Contactform);