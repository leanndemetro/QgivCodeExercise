init();

function init() {
 // create a local storage item that will store the client's name (development only)
 localStorage.setItem("clientName", "the-water-project");
 //get the local storage item totalRaised, and set it equal to a variable called displayedRaised 
 var displayedRaised = localStorage.getItem("totalRaised");
 //if displayedRaised has a value, 
  if (displayedRaised !== null) {
      //append it to the widget__total__funds element
    $(".widget__total__funds").text("$" + displayedRaised + ".00");
  }
};

$(document).ready(function () {

    //when widget__submit is clicked
  $(".widget__submit").on("click", function () {
    //perform an ajax GET request that takes in mock data for clientName, donationTotal, and current raisedFunds
    $.ajax({
        url: "mock-ajax.com",
        type: "get",
        data: { 
            //values written as string for mock purposes
          Name: "Name", 
          Goal: "Goal", 
          Raised: "Raised"
        },
        //parse this data out and update local storage items with the values 
        success: function(response) {
          //update local storage item clientName
          localStorage.setItem("clientName", (response.data.Name));
          //update local storage item donationGoal
          localStorage.setItem("donationGoal", (response.data.Goal));
          //update local storage item raisedFunds
          localStorage.setItem("raisedFunds", (response.data.Raised));
        },
        //on error, log error message to the console
        error: function(err) {
            console.log(err);
        }
      });
    

    //hide widget__thermometer__container
    $(".widget__thermometer__container").hide();
    
    //change submit type to number with an id of widget__input and a placeholder of Enter Amount ($)
    $(".widget__submit").replaceWith('<input type="number" placeholder="Enter Amount ($)" class="widget__input">');
    
    //create a submit button that replaces the hidden element widget__input__submit--hidden, 
    //it will appear beneath the input with the id of widget__input__submit
    $(".widget__input__submit--hidden").replaceWith('<input value="Donate!" type="submit" class="widget__input__submit">');
    
    //disable widget__input__submit
    $('.widget__input__submit').attr('disabled',true);

    //if widget__input has a value entered, enable widget__input__submit
    $('.widget__input').keyup(function(){
        if($(this).val.length !=0){
            $('.widget__input__submit').attr('disabled', false);
        }
    })

    //ensure non-numerical values aren't able to be entered within widget__input
    $('.widget__input').keydown(function(evt){
        if(evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57){
            evt.preventDefault();
        }
    })

    //create an onclick event that takes in the entered value, and sets a local storage item called donationAmount to it's value
    $(".widget__input__submit").click(function () {
      localStorage.setItem("donationAmount", $(".widget__input").val())

      //parse out the totalRaised local storage item value, set it equal to a variable called Raised
      let Raised = localStorage.getItem("totalRaised");
      
      //parse out the donationAmount local storage item value, set it equal to a variable called Donation
      let Donation = localStorage.getItem("donationAmount"); 
      
      //create a math function that adds the two together as integers
      newTotal = parseInt(Raised) + parseInt(Donation);
      
      //format newTotal to inclue 2 decimal spaces and sets it equal to a new variable called formattedTotal
      var formattedTotal = newTotal.toFixed(2);
        
      //set the totalRaised local storage item to the newTotal value
      localStorage.setItem("totalRaised", newTotal);

      //replace the widget__input__submit element with a thank you/success message with a class name of widget__successMessage
      $(".widget__input__submit").replaceWith('<p class="widget__successMessage"> Success! We thank you for your contribution</p>');
      
      //hide the widget__input
      $(".widget__input").hide();
      
      //show the widget__thermometer__container span
      $(".widget__thermometer__container").show();
      
      //update the widget__total__funds html to the newTotal value
      $(".widget__total__funds").text("$" + formattedTotal);
      
      //if newTotal is less than 2000
      if (newTotal < 2000) {
        //replace the widget__thermometer__overlay with a new element called widget__overlay__partial
        $(".widget__thermometer__overlay").replaceWith('<div class="widget__overlay__partial"></div>');
    
        //if newTotal is equal to 2000 
      } else if (newTotal += 2000) {
        
        //replace the widget__thermometer__overlay with a new element called wigdet__overlay__complete
        $(".widget__thermometer__overlay").replaceWith('<div class="widget__overlay__complete"></div>');
      }


    });
  });


});