var newFriend;

$("#submit").on("click", function(event) {
    event.preventDefault();

    // Form validation
    function validateForm() {
      var isValid = true;
      $(".form-control").each(function() {
        if ($(this).val() === "") {
          isValid = false;
        }
      });

      $(".chosen-select").each(function() {

        if ($(this).val() === "") {
          isValid = false;
        }
      });
      return isValid;
    }

    // If all required fields are filled
    if (validateForm()) {
      // Create an object for the user"s data
      newFriend = {
        name: $("#nameInput").val(),
        photo: $("#photoInput").val(),
        scores: [
          $("#q1").val(),
          $("#q2").val(),
          $("#q3").val(),
          $("#q4").val(),
          $("#q5").val(),
          $("#q6").val(),
          $("#q7").val(),
          $("#q8").val(),
          $("#q9").val(),
          $("#q10").val()
        ]
      };

      

      console.log("form input validated");
      

      // AJAX post the data to the friends API.
      $.post("/api/friends", newFriend, function(data) {
        console.log(data)
        // Grab the result from the AJAX post so that the best match's name and photo are displayed.
        $("#match-name").text(data.name);
        $("#match-img").attr("src", data.photo);

        // Show the modal with the best match
        $("#results-modal").modal("show");

      });
    } else {
      alert("Please fill out all fields before submitting!");
    }

    
  });

  $('#results-modal').on('hidden.bs.modal', function () {
    location.reload();
   })
