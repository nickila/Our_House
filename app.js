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
var mapNum = 0;
var key = 'AIzaSyCZ9gE6d7ErOm-7IfFV-eHZqk5L0VQ1PJ4'
$(document).ready(function(){
    idChecker();
    buttonMaker();
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
};
var arrayizer = function(address){
    arrayLocation = database.ref('/' + userId + '/addresses');
    arrayLocation.once('value', function(snap){
        var arrayOriginal = snap;
        var arrayVal = arrayOriginal.val();
        //if(address == ''){}

        if(counter == undefined){
            arrayLocation.child('0').set(address);
            counter = 0;
            window.localStorage.counter = counter;
            $('#buttonDiv').remove();
            buttonMaker();
        }
        else if(counter != undefined){
            counter++;
            window.localStorage.counter = counter
            arrayLocation.child(counter).set(address);
            $('#buttonDiv').remove();
            buttonMaker();
        }
    });
};
var buttonMaker = function(){
    var buttonDiv = document.createElement('div');
    $(buttonDiv).attr('id', 'buttonDiv');
    $(buttonDiv).attr('class', 'container animated bounceInRight address-form');
    $(buttonDiv).html('<h4>Past Searches:</h4>');
    $('#searchDiv').append(buttonDiv);

    for( var i = 0; i <= counter; i++){
        function buttonizer(){
            var button = document.createElement('button');
            // var lineBreak = '<br>'
            var db = database.ref('/' + userId + '/addresses').child(i);
            db.on('value', function(snap){
                var adrText = snap.val();
                $(button).text(adrText);
                $(button).attr('class', 'recall-button btn btn-sm btn-outline-light');
                $(button).appendTo(buttonDiv);
                // $(lineBreak).appendTo(buttonDiv)
            });
        };
        buttonizer();
    };

};

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
    $("#representatives").append("<h4 class='blue animated bounceInUp'>Select an office:</h4>");
   
    arrayizer(address);

    var civicAPI = 'https://www.googleapis.com/civicinfo/v2/representatives?address=' + address + '&key=' + key;
    $.ajax({
        url: civicAPI,
        method: 'GET'
    }).then(function (response) {      
        for (i = 0; i < response.offices.length; i++) {
            var repName = response.officials[i].name;
            var repParty = response.officials[i].party;
            var repPhone = response.officials[i].phones;
            var repUrl = response.officials[i].urls;
            var repAddress = ((response.officials[i].address[0].line1) + "<br />" +
                (response.officials[i].address[0].city) + " " +
                (response.officials[i].address[0].state) + " &nbsp;" +
                (response.officials[i].address[0].zip));
            var repName2 = response.officials[i + 1].name;
            var repParty2 = response.officials[i + 1].party;
            var repPhone2 = response.officials[i + 1].phones;
            var repUrl2 = response.officials[i + 1].urls;
            var repAddress2 = ((response.officials[i].address[0].line1) + "<br />" +
                (response.officials[i].address[0].line2) + "<br />" +
                (response.officials[i].address[0].city) + " " +
                (response.officials[i].address[0].state) + " &nbsp;" +
                (response.officials[i].address[0].zip));
            var repAddress3 = ((response.officials[i + 1].address[0].line1) + "<br />" +
                (response.officials[i + 1].address[0].line2) + "<br />" +
                (response.officials[i + 1].address[0].city) + " " +
                (response.officials[i + 1].address[0].state) + " &nbsp;" +
                (response.officials[i + 1].address[0].zip));
            var repAddress4 = ((response.officials[i + 1].address[0].line1) + "<br />" +
                (response.officials[i + 1].address[0].city) + " " +
                (response.officials[i + 1].address[0].state) + " &nbsp;" +
                (response.officials[i + 1].address[0].zip));

            if (i < 2) {
                var repDiv = $('<div>');
                var repDivTitle = $("<h3>").append(response.offices[i].name);
                var repNameDiv = $("<p>").append(repName + " (" + repParty + ")<br />" + "<span style='color:#e03748;'>" + repPhone + "</span><br /><span class = 'repAddress'>" + repAddress2 + "</span><br />" + "<a href='" + repUrl + "' target='_blank'>" + repUrl + "</a>");
                // var repAddressDiv = $("<p>").append(repAddress2);
                var repInfoDiv = $("<div>").append(repNameDiv);
                repDiv.append(repDivTitle);
                repDiv.addClass("rep animated bounceInUp");
                repInfoDiv.addClass("info");
                repDiv.append(repInfoDiv);
                $("#representatives").append(repDiv);

            } else if (i == 2) {
                var repDiv = $('<div>');
                var repDivTitle = $("<h3>").append(response.offices[i].name);
                // var repNameDiv = $("<p>").append(repName + " (" + repParty + ") &nbsp; " + repPhone);
                
                if (response.officials[i].address[0].line2) {
                    var repNameDiv = $("<p>").append(repName + " (" + repParty + ")<br />" + "<span style='color:#e03748;'>" + repPhone + "</span><br /><span class = 'repAddress'>" + repAddress2 + "</span><br />" + "<a href='" + repUrl + "' target='_blank'>" + repUrl + "</a>");
                } else {
                    var repNameDiv = $("<p>").append(repName + " (" + repParty + ")<br />" + "<span style='color:#e03748;'>" + repPhone + "</span><br /><span class = 'repAddress'>" + repAddress + "</span><br />" + "<a href='" + repUrl + "' target='_blank'>" + repUrl + "</a>");
                }
                if (response.officials[i + 1].address[0].line2) {
                    var repNameDiv2 = $("<p>").append(repName2 + " (" + repParty + ")<br />" + "<span style='color:#e03748;'>" + repPhone2 + "</span><br /><span class = 'repAddress'>" + repAddress3 + "</span><br />" + "<a href='" + repUrl2 + "' target='_blank'>" + repUrl2 + "</a>");
                } else {
                    var repNameDiv2 = $("<p>").append(repName2 + " (" + repParty + ")<br />" + "<span style='color:#e03748;'>" + repPhone2 + "</span><br /><span class = 'repAddress'>" + repAddress4 + "</span><br />" + "<a href='" + repUrl2 + "' target='_blank'>" + repUrl2 + "</a>");
                }
                var repInfoDiv = $("<div>").append(repNameDiv, "<br />", repNameDiv2);
                //repDiv.append()
                //var repName = $("<h3>").append(response.officials[i].name, "<br />", response.officials[i, 1].name);
                repDiv.append(repDivTitle);
                repDiv.addClass("rep animated bounceInUp");
                repInfoDiv.addClass("info");
                repDiv.append(repInfoDiv);
                $("#representatives").append(repDiv);
            } else if (i > 2) {
                var repDiv = $('<div>');
                var repDivTitle = $("<h3>").append(response.offices[i].name);
                // var repNameDiv = $("<p>").append(repName2 + " (" + repParty2 + ") &nbsp; " + repPhone2);
                // var repPartyDiv = $("<p>").append(repParty2);
                // var repPhoneDiv = $("<p>").append(repPhone2);
                if (response.officials[i + 1].address[0].line2) {
                    var repNameDiv = $("<p>").append(repName2 + " (" + repParty2 + ")<br />" + "<span style='color:#e03748;'>" + repPhone2 + "</span><br /><span class = 'repAddress'>" + repAddress3 + "</span><br />" + "<a href='" + repUrl2 + "' target='_blank'>" + repUrl2 + "</a>");
                } else {
                    var repNameDiv = $("<p>").append(repName2 + " (" + repParty2 + ")<br />" + "<span style='color:#e03748;'>" + repPhone2 + "</span><br /><span class = 'repAddress'>" + repAddress4 + "</span><br />" + "<a href='" + repUrl2 + "' target='_blank'>" + repUrl2 + "</a>");
                }
                var repInfoDiv = $("<div>").append(repNameDiv);
                repDiv.append(repDivTitle);
                repDiv.addClass("rep animated bounceInUp");
                repInfoDiv.addClass("info");
                repDiv.append(repInfoDiv);
                
                $("#representatives").append(repDiv);
            }
        }
        $("h3").unbind();
        $("h3").on("click", function () {
            console.log($(this).children(".info"));
            $(this).parent().children(".info").toggleClass('show infoDiv');
        });
    });

});

$(document).on('click', '.recall-button', function(event){
    event.preventDefault();
    $('#representatives').empty();
    var address = $(this).text();

    var civicAPI = 'https://www.googleapis.com/civicinfo/v2/representatives?address=' + address + '&key=' + key;
    $.ajax({
        url: civicAPI,
        method: 'GET'
    }).then(function (response) {      
        for (i = 0; i < response.offices.length; i++) {
            var repName = response.officials[i].name;
            var repParty = response.officials[i].party;
            var repPhone = response.officials[i].phones;
            var repUrl = response.officials[i].urls;
            var repAddress = ((response.officials[i].address[0].line1) + "<br />" +
                (response.officials[i].address[0].city) + " " +
                (response.officials[i].address[0].state) + " &nbsp;" +
                (response.officials[i].address[0].zip));
            var repName2 = response.officials[i + 1].name;
            var repParty2 = response.officials[i + 1].party;
            var repPhone2 = response.officials[i + 1].phones;
            var repUrl2 = response.officials[i + 1].urls;
            var repAddress2 = ((response.officials[i].address[0].line1) + "<br />" +
                (response.officials[i].address[0].line2) + "<br />" +
                (response.officials[i].address[0].city) + " " +
                (response.officials[i].address[0].state) + " &nbsp;" +
                (response.officials[i].address[0].zip));
            var repAddress3 = ((response.officials[i + 1].address[0].line1) + "<br />" +
                (response.officials[i + 1].address[0].line2) + "<br />" +
                (response.officials[i + 1].address[0].city) + " " +
                (response.officials[i + 1].address[0].state) + " &nbsp;" +
                (response.officials[i + 1].address[0].zip));
            var repAddress4 = ((response.officials[i + 1].address[0].line1) + "<br />" +
                (response.officials[i + 1].address[0].city) + " " +
                (response.officials[i + 1].address[0].state) + " &nbsp;" +
                (response.officials[i + 1].address[0].zip));

            if (i < 2) {
                var repDiv = $('<div>');
                var repDivTitle = $("<h3>").append(response.offices[i].name);
                var repNameDiv = $("<p>").append(repName + " (" + repParty + ")<br />" + "<span style='color:#e03748;'>" + repPhone + "</span><br /><span class = 'repAddress'>" + repAddress2 + "</span><br />" + "<a href='" + repUrl + "' target='_blank'>" + repUrl + "</a>");
                // var repAddressDiv = $("<p>").append(repAddress2);
                var repInfoDiv = $("<div>").append(repNameDiv);
                repDiv.append(repDivTitle);
                repDiv.addClass("rep animated bounceInUp");
                repInfoDiv.addClass("info");
                repDiv.append(repInfoDiv);
                $("#representatives").append(repDiv);

            } else if (i == 2) {
                var repDiv = $('<div>');
                var repDivTitle = $("<h3>").append(response.offices[i].name);
                // var repNameDiv = $("<p>").append(repName + " (" + repParty + ") &nbsp; " + repPhone);
                
                if (response.officials[i].address[0].line2) {
                    var repNameDiv = $("<p>").append(repName + " (" + repParty + ")<br />" + "<span style='color:#e03748;'>" + repPhone + "</span><br /><span class = 'repAddress'>" + repAddress2 + "</span><br />" + "<a href='" + repUrl + "' target='_blank'>" + repUrl + "</a>");
                } else {
                    var repNameDiv = $("<p>").append(repName + " (" + repParty + ")<br />" + "<span style='color:#e03748;'>" + repPhone + "</span><br /><span class = 'repAddress'>" + repAddress + "</span><br />" + "<a href='" + repUrl + "' target='_blank'>" + repUrl + "</a>");
                }
                if (response.officials[i + 1].address[0].line2) {
                    var repNameDiv2 = $("<p>").append(repName2 + " (" + repParty + ")<br />" + "<span style='color:#e03748;'>" + repPhone2 + "</span><br /><span class = 'repAddress'>" + repAddress3 + "</span><br />" + "<a href='" + repUrl2 + "' target='_blank'>" + repUrl2 + "</a>");
                } else {
                    var repNameDiv2 = $("<p>").append(repName2 + " (" + repParty + ")<br />" + "<span style='color:#e03748;'>" + repPhone2 + "</span><br /><span class = 'repAddress'>" + repAddress4 + "</span><br />" + "<a href='" + repUrl2 + "' target='_blank'>" + repUrl2 + "</a>");
                }
                var repInfoDiv = $("<div>").append(repNameDiv, "<br />", repNameDiv2);
                //repDiv.append()
                //var repName = $("<h3>").append(response.officials[i].name, "<br />", response.officials[i, 1].name);
                repDiv.append(repDivTitle);
                repDiv.addClass("rep animated bounceInUp");
                repInfoDiv.addClass("info");
                repDiv.append(repInfoDiv);
                $("#representatives").append(repDiv);
            } else if (i > 2) {
                var repDiv = $('<div>');
                var repDivTitle = $("<h3>").append(response.offices[i].name);
                // var repNameDiv = $("<p>").append(repName2 + " (" + repParty2 + ") &nbsp; " + repPhone2);
                // var repPartyDiv = $("<p>").append(repParty2);
                // var repPhoneDiv = $("<p>").append(repPhone2);
                if (response.officials[i + 1].address[0].line2) {
                    var repNameDiv = $("<p>").append(repName2 + " (" + repParty2 + ")<br />" + "<span style='color:#e03748;'>" + repPhone2 + "</span><br /><span class = 'repAddress'>" + repAddress3 + "</span><br />" + "<a href='" + repUrl2 + "' target='_blank'>" + repUrl2 + "</a>");
                } else {
                    var repNameDiv = $("<p>").append(repName2 + " (" + repParty2 + ")<br />" + "<span style='color:#e03748;'>" + repPhone2 + "</span><br /><span class = 'repAddress'>" + repAddress4 + "</span><br />" + "<a href='" + repUrl2 + "' target='_blank'>" + repUrl2 + "</a>");
                }
                var repInfoDiv = $("<div>").append(repNameDiv);
                repDiv.append(repDivTitle);
                repDiv.addClass("rep animated bounceInUp");
                repInfoDiv.addClass("info");
                repDiv.append(repInfoDiv);
                
                $("#representatives").append(repDiv);
            }
        }
        $("h3").unbind();
        $("h3").on("click", function () {
            console.log($(this).children(".info"));
            $(this).parent().children(".info").toggleClass('show infoDiv');
        });
    });
});
var geoKey = 'AIzaSyBcrnC3q05si6zdaKu8t2gyKy9yGpnmBBU'
var geocode = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + key

//GEOCODER API
//will trigger the AJAX Call
$(document).on("click", ".repAddress", function (event) {
    event.preventDefault();
    var parentDiv = $(this).parent('p');
    // Here we get the address from the input box
    var address = $(this).text();
    // Constructing our URL
    console.log('address: ' + address)
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyCZ9gE6d7ErOm-7IfFV-eHZqk5L0VQ1PJ4"
    // queryURL with $ajax, then taking the response data and displaying it in the div with an id of address-view
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // $("#address-view").text(JSON.stringify(response));
        console.log + ('response: ' + JSON.stringify(response));
        var latLong = response.results[0].geometry.location;
        console.log('lat/log: ' + JSON.stringify(latLong))
        initMap(latLong, parentDiv)
    });
});

//makes Google Maps based on Geocoder Latitude/Longitude Data
function initMap(address, parentDiv) {
        var mapDiv = document.createElement('div');
        var mapNumber = 'map' + mapNum;
            mapNum += 1;
            $(mapDiv).attr('id', mapNumber);
            $(mapDiv).appendTo(parentDiv);
        // The map, centered at address
        var map = new google.maps.Map(
            document.getElementById(mapNumber), { zoom: 18, center: address });
        // The marker, positioned at address
        var marker = new google.maps.Marker({ position: address, map: map });
        document.getElementById(mapNumber).style.height = "400px";
        $("#" + mapNumber).addClass("animated bounceInDown");
    }