const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Users Schem
const UsersSchema = new Schema(
   {
      first_name: {
         type: String,
         required: true
      },
      second_name: {
         type: String,
         required: true
      },
      phone_number: {
         type: String,
         required: true
      },
      gender: {
         type: String
      },
      email: {
         type: String
      },
      password: {
         type: String,
         required: true
      },
      role: [{
         admin: {
            type: String,
            default: ''
         },
         user: {
            type: String,
            default: ''
         },
         aproved: {
            type: Boolean,
            default: false
         }
      }],
      status: [{
         del: String,
         yes: String
      }
      ],
      resetToken: String,
      resetTokenExpiration: Date,
      date: {
         type: Date,
         default: Date.now
      }
   }
)
mongoose.model('users', UsersSchema);