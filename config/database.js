if (process.env.NODE_ENV === 'production') {
   module.exports = { mongoURI: 'mongodb+srv://bongomin123:bongomin123@track-scholar-gsw6j.mongodb.net/test?retryWrites=true&w=majority' }
} else {
   module.exports = { mongoURI: 'mongodb://localhost/track-scholar' }

}