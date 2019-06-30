// const localhostUrl = 'http://localhost:3000/';
const productionUrl = 'https://mongo-scrape-it.herokuapp.com/';

// const baseUrl = localhostUrl;
const baseUrl = productionUrl;

$(document).ready(function () {

  const createArticleUrl = baseUrl + 'articles/';
  const deleteArticleUrl = baseUrl + 'articles/';
  const getArticleNotesUrl = baseUrl + 'articles/';
  const saveArticleUrl = baseUrl + 'articles/';
  const deleteNoteUrl = baseUrl + 'notes/';

  const notesElem = $('#notes');

  // Create note on page
  function createNoteLiItem(note) {
    const li = $('<li class="list-group-item">');
    const noteBody = $('<p>').text(note.body);
    const deleteNoteBtn = $('<button class="btn btn-danger delete-note">').text('Delete Note');
    deleteNoteBtn.attr('data-note-id', note._id);
    li.append(noteBody, deleteNoteBtn);
    notesElem.append(li);
  }

  // Save article handler
  $(document).on('click', '.save-article', function (event) {
    event.preventDefault();
    const buttonPressed = $(event.target);
    if (!buttonPressed.hasClass('save-article')) { // Check if the button is pressed and not anywhere else on the document
      return;
    }
    const headline = buttonPressed.attr('data-headline');
    const url = buttonPressed.siblings('.headline').find('a').attr('href');
    const summary = buttonPressed.siblings('.summary').text();

    const article = {
      headline,
      url,
      summary,
    };

    $.ajax({
      type: 'POST',
      url: createArticleUrl,
      data: article,
    }).then(article => {
      console.log(article);
    });

    // Remove article from DOM
    buttonPressed.parent().remove();
  });

  // Show article notes modal
  $(document).on('click', '.article-notes', function (event) {
    event.preventDefault();
    const buttonPressed = $(event.target);
    if (!buttonPressed.hasClass('article-notes')) {
      return;
    }
    const articleId = buttonPressed.attr('data-article-id');
    $('#save-note').attr('data-article-id', articleId);
    $.ajax({
      type: 'GET',
      url: getArticleNotesUrl + articleId,
    }).then(article => {
      notesElem.empty();
      article.notes.forEach(note => {
        createNoteLiItem(note);
      });

      $('#notes-modal').modal('show');
    });
  });

  // Remove article from DB and from page
  $(document).on('click', '.delete-article', function (event) {
    event.preventDefault();
    const buttonPressed = $(event.target);
    if (!buttonPressed.hasClass('delete-article')) {
      return;
    }
    const articleId = buttonPressed.attr('data-article-id');

    $.ajax({
      type: 'DELETE',
      url: deleteArticleUrl + articleId,
    }).then(article => {
      console.log(article);
    });

    buttonPressed.parent().remove();
  });

  // Save note for article
  $('#save-note').click((event) => {
    event.preventDefault();
    const articleId = $('#save-note').attr('data-article-id');
    const noteText = $('#note-text-input').val().trim();
    $('#note-text-input').val('');

    $.ajax({
      type: 'POST',
      url: saveArticleUrl + articleId,
      data: {body: noteText},
    }).then(note => {
      createNoteLiItem(note);
    });
  });

  // Delete note from article
  $(document).on('click', '.delete-note', function (event) {
    event.preventDefault();
    const buttonPressed = $(event.target);
    if (!buttonPressed.hasClass('delete-note')) {
      return;
    }
    const noteId = buttonPressed.attr('data-note-id');

    $.ajax({
      type: 'DELETE',
      url: deleteNoteUrl + noteId,
    }).then((note) => {
      console.log(note);
      buttonPressed.parent().remove();
    });
  });

});
