self.addEventListener("message", function(event) {
    var data = event.data;

    if (data.command == "log") {
        console.log(data.message);
    }
})