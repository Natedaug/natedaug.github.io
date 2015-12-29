jQuery(function() {
  // Initalize lunr with the fields it will be searching on. I've given title
  // a boost of 10 to indicate matches on this field are more important.
  window.idx = lunr(function () {
    this.field('id');
    this.field('title', { boost: 10 });
    this.field('subtitle' ,{ boost: 10 });
    this.field('tags' ,{ boost: 10 });
    this.field('date');
    this.field('author');
    this.field('category');
  });

  // Download the data from the JSON file we generated
  window.data = $.getJSON('/search_data.json');

  // Wait for the data to load and add it to lunr
  window.data.then(function(loaded_data){
    $.each(loaded_data, function(index, value){
      window.idx.add(
        $.extend({ "id": index }, value)
      );
    });
  });

  // Event when the form is submitted
  $("#site_search").submit(function(){
      event.preventDefault();
      var query = $("#search_box").val(); // Get the value for the text field
      var results = window.idx.search(query); // Get lunr to perform a search
      display_search_results(results); // Hand the results off to be displayed
  });

  function display_search_results(results) {
    var $search_results = $("#search_results");
    $('body').animate({
      scrollTop: 0
  }, 500);
    // Wait for data to load
    window.data.then(function(loaded_data) {

      // Are there any results?
      if (results.length) {
        $search_results.empty(); // Clear any old results
        $search_results.css({'display': 'none'});
        var appendString = '<li class="collection-header"><h5>Search Results<span class="right"><i class="material-icons closeResults">clear</i></span></h5></li>'
        // Iterate over the results
        results.forEach(function(result) {
          var item = loaded_data[result.ref];

          // Build a snippet of HTML for this result
          appendString += '<a href="' + item.url + '" class="collection-item">' + item.title +'<span class="secondary-content"><small>' + item.date + '</small></span>'+ '</a>';
        });
        // Add it to the results
        $search_results.append(appendString);
      } else {
        $search_results.html('<li class="collection-item">No results found<span class="right"><i class="material-icons closeResults">clear</i></span></li>');
      }
      $('.closeResults').click(function(){
        $("#search_results").slideUp();
      });
      $search_results.slideDown();
    });
  }
});
