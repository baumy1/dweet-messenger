// Change this for each different user
var user = "gracie";
// Sets other user
var otherUser;
switch (user) {
    case "gracie":
        otherUser = "tom";
        break;
    case "tom":
        otherUser = "gracie";
        break;
};


// Sanitises input
function sanitise(input) {
    return $("<span>").text(input).html();
}

// Dweets to message1 dweet with specified content
function dweetMessage(content) {
    // Check to make sure input isn't empty'
    if(content != "") {
        dweetio.dweet_for("af62bdb5-92d3-4887-b0f2-d2266c7244e6", {message: content, sender: user}, function(err, dweet) {
            if(err) {
                console.log(err);
            }
            // Emptys input
            $("#newContent").val("");
        });
    }
}
// Appends specified message to messages div
function appendMessage(message, sender) {
    // Change this line depending on user   
    if (sender == user) {
        sender = "sent";
    } else if (sender == otherUser) {
        sender = "recieved"
    }
    $("#messages").append("<div class=\"message " + sanitise(sender) + "\"><p>" + sanitise(message) + "</p></div>");
    // Scroll to bottom of messages
    $('#messages')[0].scrollTop = $('#messages')[0].scrollHeight;
}

$(document).ready(function() {
    // Getting dweet
    // Check to see if other user is online
    dweetio.get_latest_dweet_for("5ca2fed1-b1a8-425d-a362-50aed7ff53e9", function(err, dweet) {
        // If there's no response from the server and an error is thrown try again
        if(err) {
            console.log(err);
            dweetio.get_latest_dweet_for("5ca2fed1-b1a8-425d-a362-50aed7ff53e9", function(err, dweet) {
            if(err) {
                    console.log(err);
                    // Reload the page if there's an error the second time
                    location.reload();
            }
            var dweet = dweet[0];
            var state = dweet.content[otherUser];
            $("#state").removeClass().addClass(state);
            });
        }
        var dweet = dweet[0];
        var state = dweet.content["state"];
        $("#state").removeClass().addClass(state);
    });
    // Listening to see if online state changes
    dweetio.listen_for("5ca2fed1-b1a8-425d-a362-50aed7ff53e9", function(dweet) {
        var state = dweet.content["state"];
        $("#state").removeClass().addClass(state);
    });
    // Listening to Dweets
    dweetio.listen_for("af62bdb5-92d3-4887-b0f2-d2266c7244e6", function(dweet) {
        // Append dweet to messages div
        appendMessage(dweet.content["message"], dweet.content["sender"]);
    });

    // Sending Dweets
    // Changes user state to online
    dweetio.dweet_for("5ca2fed1-b1a8-425d-a362-50aed7ff53e9", {state: "online"}, function(err, dweet) {
        // If there's no response from the server and an error is thrown try again
        if(err) {
            console.log(err);
            dweetio.dweet_for("5ca2fed1-b1a8-425d-a362-50aed7ff53e9", function(err, dweet) {
                if(err) {
                    console.log(err);
                    // Reload the page if there's an error the second time
                    location.reload();
                }
            });
        }
    });
    // Send Dweet on click of button
    $("#sendMessage").click(function() {
        // Dweets with value of input
        dweetMessage(sanitise($("#newContent").val()));
    });
    // Send Dweet on enter press
    $("#newContent").keydown(function(e) {
        if(e.which == 13) {
            dweetMessage(sanitise($("#newContent").val()));
        }
    });
});