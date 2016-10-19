// Dweets to message1 dweet with specified content
function dweetMessage(content) {
    // Check to make sure input isn't empty'
    if(content != "") {
        //                  thing                                   content             callback
        dweetio.dweet_for("af62bdb5-92d3-4887-b0f2-d2266c7244e6", {hello: content}, function(err, dweet) {
            if(err) {
                console.log(err);
            }
            // Emptys input
            $("#newMessage").val("");
        });
    }
}
// Appends specified message to messages div
function appendMessage(message) {
    $("#messages").append("<p>" + message + "</p>");
}

$(document).ready(function() {
    // Listening to Dweets
    dweetio.listen_for("af62bdb5-92d3-4887-b0f2-d2266c7244e6", function(dweet) {
        // Append dweet to messages div
        appendMessage(dweet.content["hello"]);
    });

    // Sending Dweets
    // Send Dweet on click of button
    $("#dweet").click(function() {
        // Dweets with value of input
        dweetMessage($("#newMessage").val());
    });
    // Send Dweet on enter press
    $("#newMessage").keydown(function(e) {
        if(e.which == 13) {
            dweetMessage($("#newMessage").val());
        }
    });
});