// Initialize Firebase

var config = {
    apiKey: "AIzaSyDrl4Ugo2fDtsgCN_tsRoA7xD_xSP-UKKk",
    authDomain: "trainschedule-946a7.firebaseapp.com",
    databaseURL: "https://trainschedule-946a7.firebaseio.com",
    projectId: "trainschedule-946a7",
    storageBucket: "",
    messagingSenderId: "518764888971"
};

firebase.initializeApp(config);


var database = firebase.database();

$('#submitBtn').on('click', function (event) {

    event.preventDefault();

    var name = $('#name').val().trim();
    var destination = $('#destination').val().trim();
    var firstTrain = $('#first-train').val().trim();
    var frequency = $('#frequency').val().trim();

    var newTrain = {
        trainName: name,
        trainDestination: destination,
        firstTrainz: firstTrain,
        trainFrequency: frequency
    }

    database.ref().push(newTrain);

    $('.train-form')[0].reset();
});

database.ref().on("child_added", function (snap) {

    var name = snap.val().trainName;
    var destination = snap.val().trainDestination;
    var firstTrain = snap.val().firstTrainz;
    var frequency = snap.val().trainFrequency;

    var oneYearBeforeFirstTrain = moment(firstTrain, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(oneYearBeforeFirstTrain), "minutes");
    var remainingTime = diffTime % frequency;
   
    var timeUntil = frequency - remainingTime;

    var nextTrain = moment().add(timeUntil, "minutes");

    var nextArrival = moment(nextTrain).format("hh:mm");

    var minutesAway = frequency - remainingTime;

    var newRows = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway)
    );

    $("#train-table > tbody").append(newRows);
});