
    // Initialize Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyAFBgDiJtTE_4SvtJot4mubjpovhKBRXTw",
        authDomain: "trainscheduler-2246c.firebaseapp.com",
        databaseURL: "https://trainscheduler-2246c.firebaseio.com",
        projectId: "trainscheduler-2246c",
        storageBucket: "trainscheduler-2246c.appspot.com",
        messagingSenderId: "387670615055",
        appId: "1:387670615055:web:54ef7f74037639da"
      };
        firebase.initializeApp(config);

        var database = firebase.database();

        // Initial Values
        var name = "";
        var destination = "";
        var time = 0;
        var frequency = "";
        
        // Capture Button Click
        $("#add-train").on("click", function(event) {
          event.preventDefault();
          
        //Receives input from user
          name = $("#name-input").val().trim();
          console.log(name);
          destination = $("#destination-input").val().trim();
          time = $("#time-input").val().trim();
          frequency = $("#frequency-input").val().trim();

        //Changes what is saved in the Firebase Database
          dataRef.ref().push({
            name: name,
            destination: destination,
            time: time,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
          });

        //Clears the form
        $("#name-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#frequency-input").val("");
        });

        //Adds changes to server from Firebase
        dataRef.ref().on("child_added", function(snapshot) {
          // Log everything that's coming out of snapshot
          console.log(snapshot.val());
          console.log(snapshot.val().name);
          console.log(snapshot.val().destination);
          console.log(snapshot.val().time);
          console.log(snapshot.val().frequency);

        //New variables for each snapshot
        var tn = snapshot.val().name;
        var td = snapshot.val().destination;
        var tt = snapshot.val().time;
        var tf = snapshot.val().frequency;

        //Time conversions
        var firstTimeConverted = moment(tt, "HH:mm").subtract(1, "years");

        //Current Time
        var currentTime = moment();

        //Difference between the times
        var newTime = moment().diff(moment(firstTimeConverted), "minutes");

        //Remaining time
        var remainder = newTime % tf;

        //Minutes until new train arrives
        var minutesAway = tf - remainder;

        //Next Train
        var nextTrain = moment().add(minutesAway, "minutes");
        var convertedNextTrain = moment(nextTrain).format("HH:mm");

        //A new row of data is populated on the HTML table
        var newRow = $("<tr>");
        newRow.append(
            $("<td>").text(tn),
            $("<td>").text(td),
            $("<td>").text(tf + "min"),
            $("<td>").text(convertedNextTrain),
            $("<td>").text(minutesAway + "min")
        )
        $("#table").append(newRow);

        })