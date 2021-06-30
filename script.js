init();

function init() {
  // create a method to parse out the local storage item called totalRaised
  var displayedRaised = localStorage.getItem("totalRaised");
  //append it to the widget-total-funds element (with a dollar sign)
  if (displayedRaised !== null) {
    $("#widget-total-funds").text("$" + displayedRaised + ".00");
  }
};

$(document).ready(function () {

    //when widget-submit is clicked
  $("#widget-submit").on("click", function () {
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
        error: function(err) {
            console.log(err);
        }
      });
    

    //hide widget-thermometer
    $("#widget-thermometer").hide();
    
    //change submit type to input with an id of widget-input and a placeholder of Enter Amount ($)
    $("#widget-submit").replaceWith('<input type="number" placeholder="Enter Amount ($)" id="widget-input">');
    
    //create a submit button that appears beneath the input with the id of widget-input-submit
    $("#widget-input-submit-hidden").replaceWith('<input value="Donate!" type="submit" id="widget-input-submit">');
    
    //disable widget-input-submit
    $('#widget-input-submit').attr('disabled',true);

    //if widget-input has a value entered, enable widget-input-submit
    $('#widget-input').keyup(function(){
        if($(this).val.length !=0){
            $('#widget-input-submit').attr('disabled', false);
        }
    })

    //ensure non-numerical values aren't able to be entered within widget-input
    $('#widget-input').keydown(function(evt){
        if(evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57){
            evt.preventDefault();
        }
    })

    //create an onclick event that takes in the entered value and console logs it, and sets a local storage item called donationAmount to it's value
    $("#widget-input-submit").click(function () {
      localStorage.setItem("donationAmount", $("#widget-input").val())

      //parse out the totalRaised local storage item value, set it equal to a variable
      let Raised = localStorage.getItem("totalRaised");
      
      //parse out the donationAmount local storage item value, set it equal to a variable
      let Donation = localStorage.getItem("donationAmount");
      
      //create a math function that adds the two together
      newTotal = parseInt(Raised) + parseInt(Donation);
      
      //formats newTotal to inclue 2 decimal spaces and sets it equal to a new variable called formattedTotal
      var formattedTotal = newTotal.toFixed(2);

      //perform an ajax POST request with local storage values pulled in for clientName, donationTotal, and current raisedFunds


      //set the totalRaised local storage item to the newTotal value (comment out while in development)
      // localStorage.setItem("totalRaised", newTotal);

      //replace the widget-input-submit element to a thank you/success message with a class name of success-message
      $("#widget-input-submit").replaceWith('<p class="success-message"> Success! We thank you for your contribution</p>');
      
      //hide the widget-input
      $("#widget-input").hide();
      
      //show the widget-thermometer span
      $("#widget-thermometer").show();
      
      //update the widget-total-funds html to the newTotal value
      $("#widget-total-funds").text("$" + formattedTotal);
      
      //if newTotal is less than 2000
      if (newTotal < 2000) {
        //replace the widget-fundsCounter-overlay with a new element called widget-overlay-partial
        $(".widget-fundsCounter-overlay").replaceWith('<div class="widget-overlay-partial"></div>');
       
        //if newTotal is equal to 2000 
      } else if (newTotal += 2000) {
        
        //replace the widget-fundsCounter-overlay with a new element called wigdet-overlay-complete
        $(".widget-fundsCounter-overlay").replaceWith('<div class="widget-overlay-complete"></div>');
      }





      //append a hard coded $ before the donation input area

    });
  });


});