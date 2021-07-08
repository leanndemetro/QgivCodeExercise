
$(document).ready(function () {
    //creates a JavaScript object called thermometer
    let thermometer = {
        //set thermometer.name 
        name: "The Water Project - Global Water Initiative",
        //set thermometer.goal
        goal: "2000",
        //set thermometer.amountRaised
        amountRaised: localStorage.getItem("amountRaised"),

        //initialize widget
        init: function () {

            //if thermometer.amountRaised has no value
            if (thermometer.amountRaised == null || NaN) {
                //append a hard coded value of 1158 to the widget__total__funds element
                $(".widget__total__funds").text("$" + "1158" + ".00");
                thermometer.amountRaised = "1158"
                //if thermometer.amountRaised has a value
            } else {
                //append thermometer.amountRaised value to the widget__total__funds element
                $(".widget__total__funds").text("$" + thermometer.amountRaised + ".00");
            }

            //append thermometer.name to widget__text element
            $(".widget__text").text(thermometer.name);

            //calls the giveButtonClick method
            thermometer.giveButtonClick();

        },

        giveButtonClick: function () {
            //AJAX call (mock)
            //when widget__submit button is clicked
            $(".widget__submit").on("click", function () {
                $.ajax({
                    url: "",
                    type: "GET",
                    data: {
                        //values written as string for mock purposes
                        Raised: "Raised"
                    },
                    dataType: "json",

                    //if GET request successful, update thermometer.amountRaised variable value with returned AJAX data
                    success: function (data) {
                        thermometer.amountRaised = this.data.Raised;

                        //set local storage item amount raised to the new values of thermometer.amountRaised
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
        },

        //take in input value
        getInputValue: function () {
            //hide widget__thermometer__container
            $(".widget__thermometer__container").hide();
            //change widget__submit type to number with an id of widget__input and a placeholder of Enter Amount ($)
            $(".widget__submit").replaceWith('<input type="number" pattern="[0-9]*" placeholder="Enter Amount ($)" class="widget__input">');
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
                if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57 ) {
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
            //if thermometer.amountRaised is less than thermometer.goal value
            if (thermometer.amountRaised < thermometer.goal) {
                //replace the widget__thermometer__overlay with a new element called widget__overlay__partial
                $(".widget__thermometer__overlay").replaceWith('<div class="widget__overlay__partial"></div>');
                //if thermometer.amountRaised is equal to or greater than thermometer.goal value
            } else if (thermometer.amountRaised += thermometer.goal) {
                //replace the widget__thermometer__overlay with a new element called wigdet__overlay__complete
                $(".widget__thermometer__overlay").replaceWith('<div class="widget__overlay__complete"></div>');
            }
        },
    };

    //call thermometer.init function
    thermometer.init();
});
