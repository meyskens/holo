/*
    Generate Holo glitter in JS
    Copyright 2017 Maartje Eyskens
    For compatibility purposes this file is still in ES5 and VanillaJS
*/

var glitters = []
var glitterColors = []

function generateGlitter(elementId ,amount) {
    var element = document.getElementById(elementId)
    for (var i = 0; i < amount; i++) {
        var div = document.createElement("div");
        div.className = "holo-glitter";

        var colors = generateRandomRGBColor();
        div.style.backgroundColor = "rgb(" + colors.join(",") + ")";
        glitterColors.push(colors)
        glitters.push(div);

        element.appendChild(div);
    }
}

function generateRandomRGBColor(){
    // going for light rainbows here
    var red = Math.floor((Math.random() * 200) + 50);
    var green = Math.floor((Math.random() * 200) + 50);
    var blue = Math.floor((Math.random() * 200) + 50);
    return [red, green, blue]
}

// I hope the code explains this part
function listenForTheHoloGods() {
    window.ondevicemotion = function(event) {
	    var accelerationX = event.accelerationIncludingGravity.x;
	    var accelerationY = event.accelerationIncludingGravity.y;
	    var accelerationZ = event.accelerationIncludingGravity.z;

        for (var id in glitters) {
            var colors = glitterColors[id];
            var newColors = [];
            newColors.push(Math.round(Math.abs(colors[0] - (accelerationX * 10))));
            newColors.push(Math.round(Math.abs(colors[1] - (accelerationY * 10))));
            newColors.push(Math.round(Math.abs(colors[2] - (accelerationZ * 10))));
            glitters[id].style.backgroundColor = "rgb(" + newColors.join(",") + ")";
        }
    }
}
