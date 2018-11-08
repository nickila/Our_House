// JavaScript file for Project#1
// var street;
// var city;
// var state;
// var zip;

var config = {
    apiKey: "AIzaSyDNXjUQnKfu8hdcgqie-p00TE7smKb1Vcc",
    authDomain: "polling-place-info.firebaseapp.com",
    databaseURL: "https://polling-place-info.firebaseio.com",
    projectId: "polling-place-info",
    storageBucket: "polling-place-info.appspot.com",
    messagingSenderId: "258816478675"
};
    firebase.initializeApp(config);
var database = firebase.database();
var address;
var userId;
var counter;
$(document).ready(function(){
    idChecker();
});

  var idChecker = function(){
    //check localStorage for previously saved 'userId'
    userId = window.localStorage.getItem('userId');
    if (userId == undefined){
        userIdGenerator();
        window.localStorage.setItem('counter', counter);
    } 
    else{
        console.log('welcome back #' + userId);
        counter = window.localStorage.counter;
        }
};

//Generates unique 10 digit number for user for firebase reference
function userIdGenerator(){
    var pt1 = Math.floor((Math.random() * 9 ) + 1);
    var pt2 = Math.floor((Math.random() * 9 ) + 1);
    var pt3 = Math.floor((Math.random() * 9 ) + 1);
    var pt4 = Math.floor((Math.random() * 9 ) + 1);
    var pt5 = Math.floor((Math.random() * 9 ) + 1);
    var pt6 = Math.floor((Math.random() * 9 ) + 1);
    var pt7 = Math.floor((Math.random() * 9 ) + 1);
    var pt8 = Math.floor((Math.random() * 9 ) + 1);
    var pt9 = Math.floor((Math.random() * 9 ) + 1);
    var pt0 = Math.floor((Math.random() * 9 ) + 1);
    var userIdAssembled = "'" + pt1 + pt2 + pt3 + pt4 + pt5 + pt6 + pt7 + pt8 + pt9 + pt0 + "'";
    userId = userIdAssembled.replace(/['"]+/g, '');
    database.ref(userId).set({
        userId: userId,
    });
    window.localStorage.setItem('userId', userId);
    // window.localStorage.setItem('userId', userId.replace(/['"]+/g, ''));
};
var arrayizer = function(address){
    arrayLocation = database.ref('/' + userId + '/addresses');
    arrayLocation.once('value', function(snap){
        var arrayOriginal = snap;
        var arrayVal = arrayOriginal.val();
        if(counter == undefined){
            arrayLocation.child('0').set(address);
            counter = 0;
            window.localStorage.counter = counter;
            buttonMaker();
            // window.localStorage.counter++;
            // counter = window.localStorage.counter;

            
        }
        else if(counter != undefined){
            counter++;
            window.localStorage.counter = counter
            var newArray = arrayLocation.child(counter).set(address);
            $('#buttonDiv').empty()
            buttonMaker();
        }
    });
};
var buttonMaker = function(){
    var buttonDiv = document.createElement('div');
    $(buttonDiv).attr('id', 'buttonDiv');
    $('.needs-validation').prepend(buttonDiv)
    for( var i = 0; i <= counter; i++){
        var button = document.createElement('button');
        var lineBreak = '<br>'
        var db = database.ref('/' + userId + '/addresses').child(i);
        db.on('value', function(snap){
            var adrText = snap.val()
            $(button).text(adrText);
            $(button).attr('class', 'recall-button btn btn-sm btn-outline-light');
            $(button).appendTo(buttonDiv);
            $(lineBreak).appendTo(buttonDiv)
        })
    }

};

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

    //save address to firebase
    // database.ref(userId).update
    arrayizer(address);


    function initMap(address) {

        // The map, centered at address
        var map = new google.maps.Map(
            document.getElementById('poll-map'), { zoom: 18, center: address });
        // The marker, positioned at address
        var marker = new google.maps.Marker({ position: address, map: map });
        document.getElementById("poll-map").style.height = "400px";
        $("#poll-map").addClass("animated bounceInDown");

        console.log("poll place " + address);
    }
    var key = 'AIzaSyCZ9gE6d7ErOm-7IfFV-eHZqk5L0VQ1PJ4'
    // curl "https://www.googleapis.com/civicinfo/v2/voterinfo?key=<YOUR_API_KEY>&address=1263%20Pacific%20Ave.%20Kansas%20City%20KS&electionId=2000"

    console.log(address);
    var civicAPI = 'https://www.googleapis.com/civicinfo/v2/representatives?address=' + address + '&key=' + key;
    $.ajax({
        url: civicAPI,
        method: 'GET'
    }).then(function (response) {
        // var title = response.offices[0].name
        // var name = response.officials[0].name;
        // var party = response.officials[0].party;
        // var phone = response.officials[0].phones;

        for (i = 0; i < response.offices.length; i++) {
            var repDiv = $("<div>");
            var repDivTitle = $("<h3>").append(response.offices[i].name);
            
            if (i < 2) {
            var repInfoDiv = $("<p>").append(response.officials[i].name + ", " + response.officials[i].party + " " + response.officials[i].phones);
            } else if (i == 2) {
                var repInfoDiv = $("<p>").append(response.officials[i].name  + ", " + response.officials[i].party + " " + response.officials[i].phones + "<br />" + 
                response.officials[i+1].name  + ", " + response.officials[i+1].party + " " + response.officials[i+1].phones);
            } else {
                var repInfoDiv = $("<p>").append(response.officials[i+1].name  + ", " + response.officials[i+1].party + " " + response.officials[i+1].phones);
            }
            repDiv.append(repDivTitle);
            repDiv.addClass("title");
            repInfoDiv.addClass("info");
            repDiv.append(repInfoDiv);
            $("#representatives").append(repDiv);
            $("#representatives").addClass("animated bounceInDown");
        }
        //$("<h4>").on("click", this)
       


        // var address = response.pollingLocations[0].address.state;
        // var email = response.pollingLocations[0].address.zip;
        // var date = response.election.electionDay;
        // var time = response.pollingLocations[0].pollingHours;
        // date = moment(date).format("MMMM Do YYYY");

        // console.log(location, address, city, state, zip);

        // var titleDiv = $("<h2>").append(title);
        // var nameDiv = $("<h2>").append(name);
        // var partyDiv = $("<h2>").append(party);
        // var phoneDiv = $("<h3>").append(phone);
        // var repDiv = $("<div>").append(titleDiv, nameDiv, partyDiv, phoneDiv);
        // // repDiv.addClass("col-8");
        // $("#poll-address").append(repDiv);
        // $("#poll-address").addClass("animated bounceInDown");
        // console.log(response);
        // var mapAddress = (street + " " + city + " " + state + " " + zip);
        // var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + mapAddress + "&key=AIzaSyDSt2GC8tAx5o4zox7mVX7Kne_fTD3ekLA";
        // // queryURL with $ajax, then taking the response data and displaying it in the div with an id of address-view
        // console.log("map address " + mapAddress);
        // $.ajax({
        //     url: queryURL,
        //     method: "GET"
        // }).then(function (response) {
        //     initMap(response.results[0].geometry.location);

        // });


        // Here we get the address from the input box
        //var address = $("#address-input").val();
        // Constructing our URL
        //console.log('address: ' + address)

    });




});


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

