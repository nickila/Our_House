// JavaScript file for Project#1
// var street;
// var city;
// var state;
// var zip;


$(".btn").on("click", function (event) {

    event.preventDefault();
    $("#representatives").empty();
    var street = $("#street").val().trim();
    var city = $("#city").val().trim();
    var state = $("#state").val().trim();
    var zip = $("#zip").val().trim();

    var address = (street + " " + city + " " + state + " " + zip)
    $("#street").val("");
    $("#city").val("");
    $("#state").val("");
    $("#zip").val("");
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
        console.log(response);
        //officials[0].address[0].city
        for (i = 0; i < response.offices.length; i++) {
            
            var repName = response.officials[i].name;
            var repParty = response.officials[i].party;
            var repPhone = response.officials[i].phones;
            var repAddress = ((response.officials[i].address[0].line1) + "<br />" + 
            (response.officials[i].address[0].city) + ", " +
            (response.officials[i].address[0].state) + " &nbsp;" +
            (response.officials[i].address[0].zip));
            var repName2 = response.officials[i + 1].name;
            var repParty2 = response.officials[i + 1].party;
            var repPhone2 = response.officials[i + 1].phones;
            var repAddress2 = ((response.officials[i + 1].address[0].line1) + "<br />" + 
            (response.officials[i + 1].address[0].line2) + "<br />" + 
            (response.officials[i + 1].address[0].city) + ", " + 
            (response.officials[i + 1].address[0].state) + " &nbsp;" + 
            (response.officials[i + 1].address[0].zip));
            
            if (i < 2) {
                var repDiv = $('<div>');
                var repDivTitle = $("<h3>").append(response.offices[i].name);
                var repNameDiv = $("<p>").append(repName);
                var repPartyDiv = $("<p>").append(repParty);
                var repPhoneDiv = $("<p>").append(repPhone);
                var repAddressDiv = $("<p>").append(repAddress);
                var repInfoDiv = $("<div>").append(repNameDiv, repPartyDiv, repPhoneDiv, repAddressDiv);
                //var repName = $("<h3>").append(response.officials[i].name);
                repDiv.append(repDivTitle);
                repDiv.addClass("rep");
                repInfoDiv.addClass("info");
                
                // repInfoDiv.attr("data-state", "hide");
                // repInfoDiv.addClass('hide');
                repDiv.append(repInfoDiv);
                $("#representatives").append(repDiv);
            } else if (i == 2) {
                var repDiv = $('<div>');
                var repDivTitle = $("<h3>").append(response.offices[i].name);
                var repNameDiv = $("<p>").append(repName);
                var repPartyDiv = $("<p>").append(repParty);
                var repPhoneDiv = $("<p>").append(repPhone);
                var repAddressDiv = $("<p>").append(repAddress);
                var repNameDiv2 = $("<p>").append(repName2);
                var repPartyDiv2 = $("<p>").append(repParty2);
                var repPhoneDiv2 = $("<p>").append(repPhone2);
                var repAddressDiv2 = $("<p>").append(repAddress2);
                var repInfoDiv = $("<div>").append(repNameDiv, repPartyDiv, repPhoneDiv, repAddressDiv, repNameDiv2, repPartyDiv2, repPhoneDiv2, repAddressDiv2);
                //repDiv.append()
                //var repName = $("<h3>").append(response.officials[i].name, "<br />", response.officials[i, 1].name);
                repDiv.append(repDivTitle);
                repDiv.addClass("rep");
                repInfoDiv.addClass("info");
                repDiv.append(repInfoDiv);
                $("#representatives").append(repDiv);
            } else if (i > 2) {
                var repDiv = $('<div>');
                var repDivTitle = $("<h3>").append(response.offices[i].name);
                var repNameDiv = $("<p>").append(repName2);
                var repPartyDiv = $("<p>").append(repParty2);
                var repPhoneDiv = $("<p>").append(repPhone2);
                var repAddressDiv = $("<p>").append(repAddress2);
                var repInfoDiv = $("<div>").append(repNameDiv, repPartyDiv, repPhoneDiv, repAddressDiv);
                repDiv.append(repDivTitle);
            repDiv.addClass("rep");
            repInfoDiv.addClass("info");
            repDiv.append(repInfoDiv);
            $("#representatives").append(repDiv);
            }
        }


        $(".rep").unbind();
        $(".rep").on("click", function () {
            console.log($(this).children(".info"))
            $(this).children(".info").toggleClass('show')
        });

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

