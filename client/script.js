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

    document.getElementById('manual-checkbox').addEventListener('change', function(event) {
        if (this.checked) {
            document.getElementById('auto-checkbox').checked = false;
        }
        //socket.send('M');
        console.log('M');
    });
    
    document.getElementById('auto-checkbox').addEventListener('change', function(event) {
        if (this.checked) {
            document.getElementById('manual-checkbox').checked = false;
        }
        //socket.send('A');
        console.log('A');
    });

    function move(buttonId, data){
        document.getElementById(buttonId).addEventListener("mousedown", function(event) {
            socket.send(data);
            console.log(data);
    });

    document.getElementById(buttonId).addEventListener("mouseup", function(event) {
        socket.send('S');
        console.log('S');
    });
    }

    function addButtonClickListener(buttonId, data) {
        document.getElementById(buttonId).addEventListener("click", function(event) {
            socket.send(data);
            console.log(data);
        });
    }

    move('forward', 'F');
    move('backward', 'B');
    move('left', 'L');
    move('right', 'R');

    addButtonClickListener('stop', 'S');
    addButtonClickListener('calibrate', 'C');
}
