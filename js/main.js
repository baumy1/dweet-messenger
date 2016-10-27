// Sanitises input
function sanitise(input) {
    return $("<span>").text(input).html();
}

// Dweets to message1 dweet with specified content
function dweetMessage(content) {
    // Check to make sure input isn't empty'
    if(content != "") {
        //                  thing                                   content                             callback
        dweetio.dweet_for("af62bdb5-92d3-4887-b0f2-d2266c7244e6", {message: content, sender: "tom"}, function(err, dweet) {
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
    if (sender == "tom") {
        sender = "sent";
    } else {
        sender = "recieved"
    }
    $("#messages").append("<div class=\"message " + sanitise(sender) + "\"><p>" + sanitise(message) + "</p></div>");
    // Scroll to bottom of messages
    $('#messages')[0].scrollTop = $('#messages')[0].scrollHeight;
}

$(document).ready(function() {
    // Listening to Dweets
    dweetio.listen_for("af62bdb5-92d3-4887-b0f2-d2266c7244e6", function(dweet) {
        // Append dweet to messages div
        appendMessage(dweet.content["message"], dweet.content["sender"]);
    });

    // Sending Dweets
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