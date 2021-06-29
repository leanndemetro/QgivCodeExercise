

init();

function init() {
  // create a method to parse out the local storage item called totalRaised
  localStorage.setItem("totalRaised", 1158);
  var displayedRaised = localStorage.getItem("totalRaised");
  //append it to the widget-total-funds element (with a dollar sign)
  if (displayedRaised !== null) {
    $("#widget-total-funds").text("$" + displayedRaised);
  }
};

$(document).ready(function () {

  $("#widget-submit").on("click", function () {
    
    //hide widget-thermometer
    $("#widget-thermometer").hide();
    
    //change submit type to input with an id of widget-input and a placeholder of Enter Amount ($)
    $("#widget-submit").replaceWith('<input type="input" placeholder="Enter Amount ($)" id="widget-input">');
    
    //create a submit button that appears beneath the input with the id of widget-input-submit
    $("#widget-input-submit-hidden").replaceWith('<input value="Donate!" type="submit" id="widget-input-submit">');

    //create an onclick event that takes in the entered value and console logs it, and sets a local storage item called donateAmount to it's value
    $("#widget-input-submit").click(function () {
      localStorage.setItem("donateAmount", $("#widget-input").val())

      //parse out the totalRaised local storage item value, set it equal to a variable
      let Raised = localStorage.getItem("totalRaised");
      
      //parse out the donateAmount local storage item value, set it equal to a variable
      let Donation = localStorage.getItem("donateAmount");
      
      //create a math function that adds the two together
      newTotal = parseInt(Raised) + parseInt(Donation);
      console.log(newTotal);

      //set the totalRaised local storage item to the new total value (comment out while in development)
      // localStorage.setItem("totalRaised", newTotal);

      //replace the widget-input-submit element to a thank you/success message with a class name of success-message
      $("#widget-input-submit").replaceWith('<p class="success-message"> Success! We thank you for your contribution</p>');
      
      //hide the widget-input
      $("#widget-input").hide();
      
      //show the widget-thermometer span
      $("#widget-thermometer").show();
      
      //update the widget-total-funds html to the newTotal value
      $("#widget-total-funds").text("$" + newTotal);
      
      //if newTotal is less than 2000
      if (newTotal < 2000) {
        //replace the widget-fundsCounter-overlay with a new element called widget-overlay-partial
        $(".widget-fundsCounter-overlay").replaceWith('<div class="widget-overlay-partial"></div>');
       
        //if newTotal is equal to 2000 
      } else if (newTotal += 2000) {
        
        //replace the widget-fundsCounter-overlay with a new element with a width of 100% of the thermometer
        $(".widget-fundsCounter-overlay").replaceWith('<div class="widget-overlay-complete"></div>');
      }





      //append a hard coded $ before the donation input area
      //format funds and donation values to be in USD decimal format

    });
  });


});
