// JS file for HOMEWORK #7

$(document).ready(function() {
var rowNum = 0;

var config = {
    apiKey: "AIzaSyD_NNRuOlWsz6iQ75WMF2CHEDwO7FTvarE",
    authDomain: "train-scheduler-55dc1.firebaseapp.com",
    databaseURL: "https://train-scheduler-55dc1.firebaseio.com",
    projectId: "train-scheduler-55dc1",
    storageBucket: "train-scheduler-55dc1.appspot.com",
    messagingSenderId: "73169743627"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  

  $('#add-train-btn').on('click', function(event){
    event.preventDefault();
    var trainName = $('#train-input').val().trim();
    var destination = $('#dest-input').val().trim();
    var firstTime = $('#time-input').val().trim();
    var frequency = $('#freq-input').val().trim();
    if (frequency<0){
      //clear the frequency if it is not a number
      $(".modal").modal();
      $('#freq-input').val('');
    }
    else{
    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    }
    
    database.ref().push(newTrain);


    // Clear Form
    $('#train-input').val('');
    $('#dest-input').val('');
    $('#time-input').val('');
    $('#freq-input').val('');
    }
  });

// Adding to HTML table

database.ref().on('child_added', function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var removeButton = $('<button>').text('X').addClass('removeButton btn btn-danger btn-sm').attr('data-index', rowNum).attr('data-key', snapshot.key);
    var addTrain = snapshot.val();
    
    var firstTimeConverted = moment(addTrain.firstTime, "HH:mm").subtract(1, "years");
    
    // Current Time
    var currentTime = moment();
    

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    

    // Time apart (remainder)
    var tRemainder = diffTime % addTrain.frequency;
   

    // Minute Until Train
    var tMinutesTillTrain = addTrain.frequency - tRemainder;
   
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
    

    // Change the HTML to reflect
    var newRow = $('<tr>');
    newRow.attr('id','row-' + rowNum);
    var cell1 = $('<td>').text(addTrain.trainName);
    var cell2 = $('<td>').text(addTrain.destination);
    var cell3 = $('<td>').text(addTrain.frequency);
    var cell4 = $('<td>').text(nextTrain);
    var cell5 = $('<td>').text(tMinutesTillTrain);
    var cell6 = $('<td>').html(removeButton);

    newRow.append(cell1);
    newRow.append(cell2);
    newRow.append(cell3);
    newRow.append(cell4);
    newRow.append(cell5);
    newRow.append(cell6);

    $('#train-table').prepend(newRow);

    rowNum++;

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

  function removeTrain () {
   // event.preventDefault();
    $(".row-" + $(this).attr("data-index")).remove();
    database.ref().child($(this).attr("data-key")).remove();
    $('#mytraintable').show(); 
  };

  $(document).on('click', '.removeButton', removeTrain);

}); //PAGE CLOSING BRACKET