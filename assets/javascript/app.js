

//Create a variable to reference the database.
var db = firebase.database();
//-----------------------------------
var name = "";
var destination = "";
var frequency = "";
var start_time = "";

var fbTime = moment();

//Grabbed values from text boxes
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




})





// $(#submit).on("click", function(event){
//     event.preventDefault();
//     nTrain=$("train name id").val().trim();

// })

