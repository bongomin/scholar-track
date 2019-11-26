if (process.env.NODE_ENV === 'production') {
   module.exports = { mongoURI: 'mongodb+srv://candano:Today@123@scholar-track-7e7n6.mongodb.net/test?retryWrites=true&w=majority' }
} else {
   module.exports = { mongoURI: 'mongodb://localhost/track-scholar' }

}