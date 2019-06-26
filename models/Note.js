const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  body: {
    type: String,
    required: true,
    trim: true
  },
  // `article` is an object that stores a article id
  // The ref property links the ObjectId to the article model
  // This allows us to populate the article with an associated article
  article: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
    requred: true
  }
});

// This creates our model from the above schema, using mongoose's model method
const Note = mongoose.model('Note', NoteSchema);

// Export the Note model
module.exports = Note;
