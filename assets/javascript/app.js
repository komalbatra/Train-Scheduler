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

});

// Adding to HTML table

database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var addTrain = snapshot.val();

    // Console.loging the last user's data
    console.log(addTrain.trainName);
    console.log(addTrain.destination);
    console.log(addTrain.firstTime);
    console.log(addTrain.frequency);

    // Change the HTML to reflect
    var newRow = $('<tr>');
    // newRow.addClass('row');
    var cell1 = $('<td>').text(addTrain.trainName);
    var cell2 = $('<td>').text(addTrain.destination);
    var cell3 = $('<td>').text(addTrain.firstTime);
    var cell4 = $('<td>').text(addTrain.frequency);
    var cell5 = $('<td>').text(addTrain.frequency);

    newRow.append(cell1);
    newRow.append(cell2);
    newRow.append(cell3);
    newRow.append(cell4);
    newRow.append(cell5);

    $('#train-table').append(newRow);


    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });



