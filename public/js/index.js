$(document).ready(function () {
  const localhostUrl = 'http://localhost:3000/';
  // const productionUrl = 'https://mongo-scrape-it.herokuapp.com/';

  const baseUrl = localhostUrl;
  // const baseUrl = productionUrl;

  const createArticleUrl = baseUrl + 'articles/';
  const deleteArticleUrl = baseUrl + 'articles/';
  const getArticleNotesUrl = baseUrl + 'articles/';
  const saveArticleUrl = baseUrl + 'articles/';
  const deleteNoteUrl = baseUrl + 'notes/';

  const notesElem = $('#notes');

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

    buttonPressed.parent().remove();
  });

  function createNoteLiItem(note) {
    const li = $('<li class="list-group-item">');
    li.text(note.body);
    const deleteNoteBtn = $('<button class="btn btn-danger delete-note">').text('Delete Note');
    deleteNoteBtn.attr('data-note-id', note._id);
    li.append(deleteNoteBtn);
    notesElem.append(li);
  }

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

  $('#save-note').click((event) => {
    event.preventDefault();
    const articleId = $('#save-note').attr('data-article-id');
    const noteText = $('#note-text').val().trim();
    $('#note-text').val('');

    $.ajax({
      type: 'POST',
      url: saveArticleUrl + articleId,
      data: {body: noteText},
    }).then(note => {
      createNoteLiItem(note);
    });
  });

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
