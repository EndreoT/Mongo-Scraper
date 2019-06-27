$(document).ready(function () {
  const localhostUrl = 'http://localhost:3000/';
  // const productionUrl = 'https://mongo-scrape-it.herokuapp.com/';
  
  const baseUrl = localhostUrl;

  const createArticleUrl = baseUrl + 'articles/';

  $(document).click('.save-article', function (event) {
    event.preventDefault();
    const buttonPressed = $(event.target)
    const headline = buttonPressed.attr('data-headline')
    const url = buttonPressed.siblings('.headline').find('a').attr('href')
    const summary = buttonPressed.siblings('.summary').text()
    
    const article = {
      headline,
      url,
      summary,
    };
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      success: success,
      dataType: dataType
    });

     
  });

  $(document).click('. article-notes', function (event) {
    event.preventDefault();
    console.log('notes')


  });

  $(document).click('.delete-article', function (event) {
    event.preventDefault();
    console.log('delete')


  });

});