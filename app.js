// JavaScript file for Project#1
// var street;
// var city;
// var state;
// var zip;


$(".btn").on("click", function (event) {

    event.preventDefault();
    var street = $("#street").val().trim();
    var city = $("#city").val().trim();
    var state = $("#state").val().trim();
    var zip = $("#zip").val().trim();

    var address = (street + " " + city + " " + state + " " + zip)
    $("#street").val("");
    $("#city").val("");
    $("#state").val("");
    $("#zip").val("");


    console.log(address);
    var key = 'AIzaSyBA-3v7EkN8Hx_Fw2si5KDWgvJQtP54JKA'
    // curl "https://www.googleapis.com/civicinfo/v2/voterinfo?key=<YOUR_API_KEY>&address=1263%20Pacific%20Ave.%20Kansas%20City%20KS&electionId=2000"

    console.log(address);
    var civicAPI = 'https://www.googleapis.com/civicinfo/v2/voterinfo?address=' + address + '&key=' + key;
    $.ajax({
        url: civicAPI,
        method: 'GET'
    }).then(function (response) {
        var location = response.pollingLocations[0].address.locationName;
        var street = response.pollingLocations[0].address.line1;
        var city = response.pollingLocations[0].address.city;
        var state = response.pollingLocations[0].address.state;
        var zip = response.pollingLocations[0].address.zip;
        var date = response.election.electionDay;
        var time = response.pollingLocations[0].pollingHours;
        date = moment(date).format("MMMM Do YYYY");
    
        console.log(location, address, city, state, zip);
        //var pollAddress = info.pollingLocations; 
        //console.log(info);
        var pollLocDiv = $("<h2>").append(location);
        var pollStreetDiv = $("<h2>").append(street);
        var pollAddDiv = $("<h2>").append(city + ", " + state + " &nbsp; " + zip);
        var dateDiv = $("<h3>").append(date + " from " + time);
        dateDiv.addClass("highlight");
        $("#poll-address").append(pollLocDiv, pollStreetDiv, pollAddDiv, "<br />", dateDiv);
        console.log(response);
        address = (location, address, city, state, zip);
        var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyCZ9gE6d7ErOm-7IfFV-eHZqk5L0VQ1PJ4"
        // queryURL with $ajax, then taking the response data and displaying it in the div with an id of address-view
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $("#address-view").text(JSON.stringify(response));
            console.log("map stuff" + response);
        });


        // Here we get the address from the input box
        //var address = $("#address-input").val();
        // Constructing our URL
        //console.log('address: ' + address)
        
    });




});
// function initMap() {
//     // The location of adress (1890 Buford Ave, St. Paul, MN 55108, USA)
//     var address = { lat: 45, lng: -93.180521 };
//     // The map, centered at address
//     var map = new google.maps.Map(
//         document.getElementById('poll-map'), { zoom: 18, center: address });
//     // The marker, positioned at address
//     var marker = new google.maps.Marker({ position: address, map: map });
// }

//   var geocode = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + geoApiKey
// This .on("click") function will trigger the AJAX Call
// $("#find-address").on("click", function (event) {
//     event.preventDefault();
//     // Here we get the address from the input box
//     var address = $("#address-input").val();
//     // Constructing our URL
//     console.log('address: ' + address)
//     var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyCZ9gE6d7ErOm-7IfFV-eHZqk5L0VQ1PJ4"
//     // queryURL with $ajax, then taking the response data and displaying it in the div with an id of address-view
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         $("#address-view").text(JSON.stringify(response));
//     });
// });






/**
   * Sample JavaScript code for civicinfo.elections.electionQuery
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/guides/code_samples#javascript
   */

//   function loadClient() {
//     gapi.client.setApiKey("AIzaSyCZ9gE6d7ErOm-7IfFV-eHZqk5L0VQ1PJ4");
//     return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/civicinfo/v2/rest")
//         .then(function() { console.log("GAPI client loaded for API"); },
//               function(err) { console.error("Error loading GAPI client for API", err); });
//   }
//   // Make sure the client is loaded before calling this method.
//   function execute() {
//     return gapi.client.civicinfo.elections.electionQuery({})
//         .then(function(response) {
//                 // Handle the results here (response.result has the parsed body).
//                 console.log("Response", response);
//               },
//               function(err) { console.error("Execute error", err); });
//   }
//   gapi.load("client");

