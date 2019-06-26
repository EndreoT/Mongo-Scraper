const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true,
    unique: true,
  },
  summary: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
}, { toJSON: { virtuals: true } }
);

// Reverse population lookup since Note models have an article id property
ArticleSchema.virtual('notes', { // population name
  ref: 'Note', // The model to use
  localField: '_id', // Your local field, like a `FOREIGN KEY` in RDS
  foreignField: 'article', // Your foreign field which `localField` linked to. Like `REFERENCES` in RDS
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false
});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model('Article', ArticleSchema);

// Export the Article model
module.exports = Article;
