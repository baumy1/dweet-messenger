$(document).ready(function() {
    $("#dweet").click(function() {
        var content = $("#message").val();
        dweetio.dweet_for("af62bdb5-92d3-4887-b0f2-d2266c7244e6", {hello: content}, function(err, dweet) {
            console.log(dweet.thing);
            console.log(dweet.content);
            console.log(dweet.created);
            console.log(err);
        });
    });
});