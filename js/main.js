// add scripts

$(document).on('ready', function() {

  $('#search-again').hide();

  $('#tag-search').on('submit', function(event){

    event.preventDefault();

    var imageURLs = [];

    var $searchString = $('#tag_query').val();

    console.log($searchString);

    var searchUrl = "https://api.instagram.com/v1/tags/" + $searchString + "/media/recent";

      $.ajax({
      url: searchUrl,
      type: 'GET',
      data: {client_id:'4eaa5c5b9a57499db1637e11d6c1d126'},
      dataType:'jsonp',
      success:function(data){

        console.log(data);
        console.log(data.data);
        console.log(data.data[0].images);
        // assign returned data to output variable
        var output = data.data;
        // clear image container
        $("#image-container").html('');
        // iterate through the returned data, appending the images to the dom
        for(var i = 0; i < output.length; i++) {
          imageURLs[i] = output[i].images.low_resolution.url;
          $("#image-container").append('<img src="' + imageURLs[i] + '"/>');
        }
        // clear form input
        $('#tag_query').val('');
        // hide the search form
        $('#search').hide();
        // add search term to the dom
        $('#search-term').html($searchString);
        // show the search again form
        $('#search-again').show();
      },
      error:function(data){
        alert("Sorry we're experiencing technical difficulties. Please try again later.");
      }
    });

  });

    function convertToJSON(data) {
      var datastring = JSON.stringify(data);
    }

});
