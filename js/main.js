$(document).ready(function() {

    // Sending Dweets
    $("#dweet").click(function() {
        // Value of input
        var content = $("#newMessage").val();
        //                  thing                                   content             callback
        dweetio.dweet_for("af62bdb5-92d3-4887-b0f2-d2266c7244e6", {hello: content}, function(err, dweet) {
            if(err) {
                console.log(err);
            }
        });
    });

    // Listening to Dweets
    dweetio.listen_for("af62bdb5-92d3-4887-b0f2-d2266c7244e6", function(dweet) {
        // Append dweet to messages div
        $("#messages").append("<p>" + dweet.content["hello"] + "</p>");
    });
});