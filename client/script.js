document.getElementById('connectionStatus').innerHTML = "Not Connected"

const socket = new WebSocket('ws://192.168.137.113:80'); // Create a WebSocket connection

// Update connection status when connection is established
socket.addEventListener('open', function (event) {
    console.log('Connection Established');
    document.getElementById('connectionStatus').innerHTML = "Connected";
});

// Update connection status when connection is closed
socket.addEventListener('close', function (event) {
    console.log('WebSocket connection closed');
    document.getElementById('connectionStatus').innerHTML = "Disconnected";
});




// Update connection status in case of error
socket.addEventListener('error', function (error) {
    console.error('WebSocket error:', error);
    document.getElementById('connectionStatus').innerHTML = "Error";
});

if (socket.OPEN) 
{
    for (let i = 1; i <= 6; i++) {
        let button = document.getElementById('table' + i);
        button.addEventListener("click", function(event) {
            socket.send(i.toString());
            console.log(i.toString());
        });
    }

    function addButtonClickListener(buttonId, data) {
        document.getElementById(buttonId).addEventListener("click", function(event) {
            socket.send(data);
            console.log(data);
        });
    }
    
    addButtonClickListener('forward', 'F');
    addButtonClickListener('backward', 'B');
    addButtonClickListener('left', 'L');
    addButtonClickListener('right', 'R');
    addButtonClickListener('stop', 'S');
}
