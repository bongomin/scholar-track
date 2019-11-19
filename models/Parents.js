const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Parents Schem
const ParentsSchema = new Schema(
   {
      sponsorship_No: {
         type: String,
         required: true
      },
      p_first_name: {
         type: String,
         required: true
      },
      p_second_name: {
         type: String,
         required: true
      },
      p_age: {
         type: String,
         required: true
      },
      p_occupation: {
         type: String,
         required: true
      },
      p_relationship: {
         type: String,
         required: true

      },
      p_no_siblings: {
         type: String,
      },
      p_contact: {
         type: String,
         required: true
      },
      p_residence: {
         type: String,
         required: true
      },
      sponsorship_No: {
         type: String,
         required: true
      },
      location_map: {
         data: Buffer,
         contentType: String
      }, user: {
         type: String,
         required: true
      }
   }
)

mongoose.model('parents', ParentsSchema);