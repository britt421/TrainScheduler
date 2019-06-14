

//Create a variable to reference the database.
var db = firebase.database();
//-----------------------------------
var name = "";
var destination = "";
var frequency = "";
var start_time = "";

var fbTime = moment();

//Grabbed values from text boxes
$("#submit").on("click", function(event){
event.preventDefault();
name = $("#name").val().trim();
destination = $("#destination").val().trim();
start_time = moment($("#time").val().trim(), "HH:mm").subtract(1, "years").format("X");
console.log(start_time);
frequency = $("#minutes").val().trim();

$("#name").val("");
$("#destination").val("");
$("#time").val("");
$("#minutes").val("");
fbTime = moment().format('X');
var myKey = firebase.database().ref().push().key;

//Code for handling the push
db.ref().push({
    name: name,
    destination: destination,
    start_time: start_time,
    time: firebase.database.ServerValue.TIMESTAMP,
    id: myKey
});

//Firebase watcher + initial loader + order/limit (.on("child_added")
db.ref().orderByChild("time").on("child_added", function (snapshot){
    console.log(snapshot.val());
    
    var sv = snapshot.val();    //snapshot value
    var tn = sv.name;           //train name
    var td = sv.destination;    //train destination
    var tf = sv.frequency;      //train frequency
    var tt = sv.start_time;     //train start time

    var diffTime = moment().diff(moment.unix(start_time), "minutes");
    console.log(diffTime);
    var timeRemainder = moment().diff(moment.unix(tt), "minutes") % tf;
    console.log(timeRemainder);
    var minutes = tf - timeRemainder;
    console.log(minutes);
    var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

    //Test for crrect times and info
    console.log("min" + minutes);
    console.log("nxttrainarr" + nextTrainArrival);
    console.log("now" + moment().format("hh:mm A"));
    console.log("next train" + nextTrainArrival);
    console.log(moment().format("X"));

    //Append train info to table on page
    $("#traindetains").append("<tr>" + 
        "<td>" + tn + "</td>" +
        "<td>" + td + "</td>" +
        "<td>" + tf + "</td>" +
        "<td>" + nextTrainArrival + "</td>" +
        "<td>" + minutes + "</td>" +
        // "<td><button class='btn btn-default btn-sm'id=
        // "<td><button class='btn btn-default btn-sm'id=
        "</tr>");
}),
function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
}
$("body").on("click", "#delete", function(e)){
    e.preventDefault();
    var key = $(this).attr("data-key");
    db.ref().orderByChild('id').equalTo(key).once('va')     //incomplete
    snapshot.forEach(function(childSnapshot){   
        database.ref().child(childSnapshot.key).remove();   //guessing here
    })
}







