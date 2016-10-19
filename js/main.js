function dweetMessage(content) {
    //                  thing                                   content             callback
    dweetio.dweet_for("af62bdb5-92d3-4887-b0f2-d2266c7244e6", {hello: content}, function(err, dweet) {
        if(err) {
            console.log(err);
        }
    });
}
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
    $("#dweet").click(function() {
        // Dweets with value of input
        dweetMessage($("#newMessage").val());
    });
});