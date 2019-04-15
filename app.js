
//alert("test");


//SETUP VARIABLES
//===============================================================================================================================================
var authKey     = "UALThdFdHaAwqitWOPBorBCkHHBvR25e";

// Search Parameters
var queryTerm   = "";
var numResults  =0;
var startYear   =0;
var endYear     =0;

var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="+authKey+"&q="

//variable to Track number of article
var articleCounter = 0;



//FUNCTIONS
//===============================================================================================================================================
function runQuery(numArticles,queryURL){

    //call ajex to pull data from the API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    //After pulling the data perform this
    .then(function(NYTData) {
    
    //logging to console
    console.log("---------------------------------------------------");
    console.log(queryURL);
    console.log("---------------------------------------------------");
    console.log("Number of article requested: "+numArticles);
    console.log(NYTData);

    //empty/clear the dump section before each serch request
    $('#dumpSection').empty();

    //logging to console
    for(var i=0;i<numArticles;i++){
       
        //start dumping to html
        var dumpSection = $('<div>');
        dumpSection.addClass("card-body")
        dumpSection.attr('id', 'articleDump-' +i);
        $('#dumpSection').append(dumpSection);
        $('.card-body').css('border', '1px solid');

        //check if requested headline exist
        if(NYTData.response.docs[i].headline.main !="null"){
            console.log(NYTData.response.docs[i].headline.main);
            $("#articleDump-" +i).append("<h3>"+ NYTData.response.docs[i].headline.main+ "</h3>");
        }

        //check if requested byline exist
        if(NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original")){
            console.log(NYTData.response.docs[i].byline.original);
            $("#articleDump-" +i).append("<h5>"+ NYTData.response.docs[i].byline.original+ "</h5>");
        }

        //Attach the content to the appropriate dump section
       
        $("#articleDump-" +i).append("<h5>"+ NYTData.response.docs[i].section_name+ "</h5>");
        $("#articleDump-" +i).append("<h5>"+ NYTData.response.docs[i].pub_date+ "</h5>");
        $("#articleDump-" +i).append("<a href=" + NYTData.response.docs[i].web_url +">" + NYTData.response.docs[i].web_url + "</a>");
       
        console.log(NYTData.response.docs[i].section_name);
        console.log(NYTData.response.docs[i].pub_date);
        console.log(NYTData.response.docs[i].web_url);
    }
    });
}

//MAIN PROCESS
//===============================================================================================================================================
$("#searchBtn").click(function(){

    queryTerm =$('#search').val().trim();
    console.log("Article requested for: "+queryTerm);

    //Add in the search term
    var newURL= queryURLBase+queryTerm;

    //Get the Number of Records
    numResults=$('#numRecords').val();

    //Get the Start year and End year
    startYear = $('#startYear').val().trim();
    endYear = $('#endYear').val().trim();

    if(parseInt(startYear)){
        //add the neccessary fields
        startYear = startYear+"0101";
        //add the date info to the URL
        newURL = newURL+"&begin_date="+startYear;
    }
    
    if(parseInt(endYear)){
        //add the neccessary fields
        endYear = endYear+"1231";
        //add the date info to the URL
        newURL = newURL+"&end_date="+endYear;
    }
    
    //console.log(newURL);
    //send the AJAX Call the newly assembled URL
    runQuery(numResults, newURL);
    return false;
    })

    

// 1. Retrive user inputs and convert to variables
// 2. Use those variables to run an AJEX call to the New York Times.
// 3. Break down the NYT object into usable fields.
// 4. Dynamically generate html content.

// 5. Dealing with "edge cases" -- bugs or situations that are not intuitive.