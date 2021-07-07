$(document).ready(function () {

    //creates a JavaScript object called thermometer
    let thermometer = {

        //local storage values preset while in development, however code on lines 112-114 and line 59 will update local storage items dynamically according to AJAX and input returned data

        //set thermometer.name 
        name: localStorage.getItem("name"),
        //set thermometer.goal
        goal: localStorage.getItem("goal"),
        //set thermometer.amountRaised
        amountRaised: localStorage.getItem("amountRaised"),

        //initialize widget
        init: function () {

            //set local storage item "name" (for use in development stages only) 
            localStorage.setItem("name", "The Water Project - Global Water Initiative");
            //set local storage item "goal" (for use in development stages only)
            localStorage.setItem("goal", "2000"),
            //set local storage item "amountRaised" (for use in development stages only) 
            localStorage.setItem("amountRaised", "1158"),

                //get the thermometer.amountRaised value and append it to the widget__total__funds element
                $(".widget__total__funds").text("$" + thermometer.amountRaised + ".00");

            //append thermometer.name to widget__text element
            $(".widget__text").text(thermometer.name);

        },

        //take in input value
        getInputValue: function () {

            //hide widget__thermometer__container
            $(".widget__thermometer__container").hide();

            //change widget__submit type to number with an id of widget__input and a placeholder of Enter Amount ($)
            $(".widget__submit").replaceWith('<input type="number" placeholder="Enter Amount ($)" class="widget__input">');

            //create a submit button that replaces the hidden element widget__input__submit--hidden, 
            //it will appear beneath the input with the id of widget__input__submit
            $(".widget__input__submit--hidden").replaceWith('<input value="Donate!" type="submit" class="widget__input__submit">');

            //disable widget__input__submit
            $('.widget__input__submit').attr('disabled', true);

            //if widget__input has a value entered, enable widget__input__submit
            $('.widget__input').keyup(function () {
                if ($(this).val.length != 0) {
                    $('.widget__input__submit').attr('disabled', false);
                }
            })

            //ensure non-numerical values aren't able to be entered within widget__input
            $('.widget__input').keydown(function (evt) {
                if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
                    evt.preventDefault();
                }
            })

            //create an onclick event that takes in the entered value, and sets a variable called donationAmount to it's value
            $(".widget__input__submit").click(function () {
                let donationAmount = $(".widget__input").val();

                //create a math function that adds donationAmount and thermometer.amountRaised together as integers, and updates the value of thermometer.amountRaised 
                thermometer.amountRaised = parseInt(donationAmount) + parseInt(thermometer.amountRaised);

                //set the local storage item called totalRaised to the new value of thermometer.amountRaised
                localStorage.setItem("amountRaised", thermometer.amountRaised);
                
                //call the updateThermometer method
                thermometer.updateThermometer();
            });
        },

        updateThermometer: function () {

            //format thermometer.amountRaised to inclue 2 decimal spaces, set it equal to a variable called formattedAmountRaised
            var formattedTotal = thermometer.amountRaised.toFixed(2);

            //replace the widget__input__submit element with a thank you/success message with a class name of widget__successMessage
            $(".widget__input__submit").replaceWith('<p class="widget__successMessage"> Success! We thank you for your contribution</p>');
            
            //hide the widget__input
            $(".widget__input").hide();
            
            //show the widget__thermometer__container span
            $(".widget__thermometer__container").show();
            
            //update the widget__total__funds html to the formattedTotal value + "$"
            $(".widget__total__funds").text("$" + formattedTotal);
            
            //if newTotal is less than 2000
            if (thermometer.amountRaised < 2000) {
                
                //replace the widget__thermometer__overlay with a new element called widget__overlay__partial
                $(".widget__thermometer__overlay").replaceWith('<div class="widget__overlay__partial"></div>');
                
                //if newTotal is equal to or greater than 2000
            } else if (thermometer.amountRaised += 2000) {
                
                //replace the widget__thermometer__overlay with a new element called wigdet__overlay__complete
                $(".widget__thermometer__overlay").replaceWith('<div class="widget__overlay__complete"></div>');
            }
        },
    };

    //AJAX call (mock)
    //when widget__submit button is clicked
    $(".widget__submit").on("click", function () {
        $.ajax({

            url: "",
            type: "GET",
            data: {
                //values written as string for mock purposes
                Name: "Name",
                Goal: "Goal",
                Raised: "Raised"
            },
            dataType: "json",

            //if GET request successful, update variable values with returned AJAX data
            success: function (data) {
                thermometer.name = this.data.Name;
                thermometer.goal = this.data.Goal;
                thermometer.amountRaised = this.data.Raised;

                //set local storage items name, goal, and amount raised to the new values of thermometer.name, 
                //thermometer.goal,  and thermometer.amountRaised to be pull in upon widget initialization (function init())
                localStorage.setItem("name", thermometer.name);
                localStorage.setItem("goal", thermometer.goal);
                localStorage.setItem("amountRaised", thermometer.amountRaised);
            },
            //else, console log the error
            error: function (err) {
                console.log(err);
            }
        });

        //call the getInputValue method
        thermometer.getInputValue();
    });


    //call thermometer.init function
    thermometer.init();
});

