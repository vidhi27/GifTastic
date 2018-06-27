$(document).ready(function() {

    var topics = ["Snow White", "The Incredibles", "Dumbo", "Peter Pan", "Aladdin", "Bambi", "Finding Nemo", "Mickey Mouse", "Donald Duck", "Goofy"]
    const theme = new Audio("assets/disney-theme.mp3");
    var musicPlaying = false;
    var results;
    //var giphyURL = "https://api.giphy.com/v1/gifs/trending?api_key=n0iYuuvuErvl9tdbv64IkR9sB1JCYbJk";
    
        // MUSIC FUNCTION 
    
        $("#title-button").on("click", function() {
            if(musicPlaying == false){
                theme.play();
                musicPlaying = true;
               }else {
                theme.pause();
                musicPlaying = false;
            }
        });
    
        // MAKE BUTTONS	AND ADD ONCLICK FUNCTION
    
        function makeButtons() {
    
            $("#disney-buttons").empty();
    
            for (i = 0; i < topics.length; i++) {
                
                var b = $("<button>");
    
                b.addClass("disney-btn");
                b.attr("data-name", topics[i]);
                b.text(topics[i]);
    
                $("#disney-buttons").append(b);
            };
        };
    
        $("#add-movies").on("click", function(event) {
    
            event.preventDefault();
    
            var character = $("#disney-input").val().trim();
    
            topics.push(character);
            $("#disney-input").val("");
    
            makeButtons();
    
            console.log(topics);
        });
    
        makeButtons();
    
        //FUNCTION FOR GRABBING GIPHY API CONTENT
    
          function displayGifs() {
    
             var movieName = $(this).attr("data-name");
             var movieStr = movieName.split(" ").join("+");
             var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + movieStr + "&api_key=dc6zaTOxFJmzC&limit=10";
    
             $.ajax({
            url: giphyURL,
            method: "GET"
          }).done(function(response) {
            
            console.log(giphyURL);
            console.log(response);
    
            results = response.data;
    
            $("#gifs").empty();
            for (var i = 0; i < results.length; i++) {
                
                var movieDiv = $("<div>");
                var para = $("<p class='rating'>").text("Rating: " + results[i].rating);
                var movieImage = $("<img>");
    
                para.addClass("rating-text")
                
              movieImage.addClass("image-gifs")
                movieImage.attr("src", results[i].images.fixed_height_still.url);
                movieImage.attr("data-state", "still");
              movieImage.attr("data-position", i);
    
                movieDiv.append(para);
              movieDiv.append(movieImage);
              movieDiv.addClass("individual-gifs")
    
              $("#gifs").prepend(movieDiv);
    
            }; //ENDS FOR LOOP
          }); // ENDS AJAX FUNCTION
      
        };
    
      // Use document on click function to apply function for elements AFTER the page has loaded
    
        $(document).on("click", ".disney-btn", displayGifs);
    
        // ANIMATE GIFS
    
        function gifAnimation() {
          var state = $(this).attr("data-state");
          var position = $(this).attr("data-position"); //will return a string
          position = parseInt(position); //string to integer
    
          console.log(results[position].images.fixed_height.url);
          console.log(position);
    
          if (state === "still") {
            console.log("we're here");
            $(this).attr("src", results[position].images.fixed_height.url);
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", results[position].images.fixed_height_still.url);
            $(this).attr("data-state", "still");
          }
        };
    
      $(document).on("click", ".image-gifs", gifAnimation);
    
    }); //document.ready