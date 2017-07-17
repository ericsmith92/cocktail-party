  // Initialize Firebase in global scope.

  var config = {
    apiKey: "API-KEY",
    authDomain: "AUTH-DOMAIN",
    databaseURL: "DB-URL",
    projectId: "PROJECT-ID",
    storageBucket: "STORAGE-BUCKET",
    messagingSenderId: "MESSAGE-SENDER-ID"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//constructor for Quote Obj
function Quote(phrase, by){
    
    this.phrase = phrase,
    this.by = by
    
}

$(document).ready(function(){
    
    //quotes array to push Obj into
    var quotesArr = [];
    
    $('button').click(function(){
        
        database.ref('quotes').on('value', function(snapshot){
            
            //loop through child nodes
            snapshot.forEach(function(childSnapshot){
               
                //create a new quote object for each quote
                var quote = new Quote(childSnapshot.val().phrase, childSnapshot.val().by);          
                
                //push objects into quotes array
                quotesArr.push(quote);
    
            });
            
            //randomly get an array index to get random quote
            function randomInRange(min, max){
                return Math.random() * (max-min) + min;
            }
            
            //grab index based on random number
            var chosenQuote = quotesArr[Math.floor(randomInRange(0,quotesArr.length - 1))];
            
            //empty html of output each time
            $('#output').html('');
            
            //append quote/author to html
            $('#output').append('<div class="quote">' + '"' + chosenQuote.phrase + '"' + '</div>' + '<div class="by">' + ' - ' + chosenQuote.by + '</div>');
            
        })
        
    })
    
    
})//end onload


