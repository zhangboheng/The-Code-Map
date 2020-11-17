    //menu-top5 animation
    var menutop5act = document.getElementById("menutop5act");
    var obj = menutop5act.getContext("2d");

    //making the canvas full screen
    menutop5act.height = window.innerHeight;
    menutop5act.width = window.innerWidth;

    //english characters - taken from the unicode charset
    var english = "abcdefghijklmnopqrstuvwxyz";
    //converting the string into an array of single characters
    english = english.split("");

    var font_size = 10;
    var columns = menutop5act.width / font_size; //number of columns for the rain
    //an array of drops - one per column
    var drops = [];
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for (var x = 0; x < columns; x++)
        drops[x] = 1;

    //drawing the characters
    function draw() {
        //Black BG for the canvas
        //translucent BG to show trail
        obj.fillStyle = "rgba(0, 0, 0, 0.05)";
        obj.fillRect(0, 0, menutop5act.width, menutop5act.height);

        obj.fillStyle = "#0F0"; //green text
        obj.font = font_size + "px arial";
        //looping over drops
        for (var i = 0; i < drops.length; i++) {
            //a random chinese character to print
            var text = english[Math.floor(Math.random() * english.length)];
            //x = i*font_size, y = value of drops[i]*font_size
            obj.fillText(text, i * font_size, drops[i] * font_size);

            //sending the drop back to the top randomly after it has crossed the screen
            //adding a randomness to the reset to make the drops scattered on the Y axis
            if (drops[i] * font_size > menutop5act.height && Math.random() > 0.975)
                drops[i] = 0;

            //incrementing Y coordinate
            drops[i]++;
        }
    }

    setInterval(draw, 33);