// JavaScript file for Project#1
// var street;
// var city;
// var state;
// var zip;


$(".btn").on("click", function(event) {
    event.preventDefault();
    var street = $("#street").val().trim();
    var city = $("#city").val().trim();
    var state = $("#state").val().trim();
    var zip = $("#zip").val().trim();
    console.log(street, city, state, zip);
})

