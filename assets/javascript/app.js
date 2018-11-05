var mainDiv = document.createElement('div');
var form = document.createElement('input');
    $(form).attr('id', 'searchBox');
    $(form).attr('type', 'text');
    $(form).attr('placeholder', 'searchBox')
var button = document.createElement('button');
    $(button).attr('id', 'searchBtn');
    $(button).attr('class', 'btn btn-md btn-danger');
    $(button).text('SEARCH!!')
    $(form).appendTo(mainDiv);
    $(button).appendTo(mainDiv);
    $(mainDiv).appendTo('body');
var key = 'AIzaSyBA-3v7EkN8Hx_Fw2si5KDWgvJQtP54JKA'
// curl "https://www.googleapis.com/civicinfo/v2/voterinfo?key=<YOUR_API_KEY>&address=1263%20Pacific%20Ave.%20Kansas%20City%20KS&electionId=2000"

$(button).on('click', function(){
    var address = $(form).val().replace(/[ ]+/g, '+').replace(/[,]+/g, '%2C');
    console.log(address);
    var civicAPI = 'https://www.googleapis.com/civicinfo/v2/voterinfo?address=' + address + '&key=' + key;
    $.ajax({
        url: civicAPI,
        method: 'GET'
    }).then(function(response){
        var results = response.data;
        var info = JSON.stringify(results);
        console.log(info);
        var pollAddress = info.pollingLocations; 
        console.log(pollAddress);
    });
})
    