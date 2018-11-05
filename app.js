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

    var address = (street + " " + city +  " " + state +  " " + zip)
    $("#street").val("");
    $("#city").val("");
    $("#state").val("");
    $("#zip").val("");


    console.log(address);


// var mainDiv = document.createElement('div');
// var form = document.createElement('input');
//     $(form).attr('id', 'searchBox');
//     $(form).attr('type', 'text');
//     $(form).attr('placeholder', 'searchBox')
// var button = document.createElement('button');
//     $(button).attr('id', 'searchBtn');
//     $(button).attr('class', 'btn btn-md btn-danger');
//     $(button).text('SEARCH!!')
//     $(form).appendTo(mainDiv);
//     $(button).appendTo(mainDiv);
//     $(mainDiv).appendTo('body');
var key = 'AIzaSyBA-3v7EkN8Hx_Fw2si5KDWgvJQtP54JKA'
// curl "https://www.googleapis.com/civicinfo/v2/voterinfo?key=<YOUR_API_KEY>&address=1263%20Pacific%20Ave.%20Kansas%20City%20KS&electionId=2000"

// $(".btn").on('click', function(){
    //address = address.replace(/[,]+/g, '%2C');
    console.log(address);
    var civicAPI = 'https://www.googleapis.com/civicinfo/v2/voterinfo?address=' + address + '&key=' + key;
    $.ajax({
        url: civicAPI,
        method: 'GET'
    }).then(function(response){
        var location = response.pollingLocations[0].address.locationName;
        var street = response.pollingLocations[0].address.line1;
        var city = response.pollingLocations[0].address.city;
        var state = response.pollingLocations[0].address.state;
        var zip = response.pollingLocations[0].address.zip;
        //var info = JSON.stringify(results);
        //console.log(results);
        console.log(location, address, city, state, zip);
        //var pollAddress = info.pollingLocations; 
        //console.log(info);
        var pollLocDiv = $("<h2>").append(location);
        var pollStreetDiv = $("<h2>").append(street);
        var pollAddDiv = $("<h2>").append(city + ", " + state + " &nbsp; " + zip);
        
        //var pollAddress = (pollLocDiv, pollAddDiv, pollCityDiv, pollStateDiv, pollZipDiv);
        
        
        $("#poll-address").append(pollLocDiv, pollStreetDiv, pollAddDiv);
    });
});









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

