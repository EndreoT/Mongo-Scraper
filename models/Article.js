var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
  // `title` is required and of type String
  headline: {
    type: String,
    required: true,
    unique: true,
  },
  summary: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  url: {
    type: String,
    required: true
  },
}, { toJSON: { virtuals: true } }
);

ArticleSchema.virtual('notes', {
  ref: 'Note', // The model to use
  localField: 'notes', // Your local field, like a `FOREIGN KEY` in RDS
  foreignField: 'article', // Your foreign field which `localField` linked to. Like `REFERENCES` in RDS
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model('Article', ArticleSchema);

// Export the Article model
module.exports = Article;
