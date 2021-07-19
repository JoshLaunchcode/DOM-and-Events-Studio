// Write your JavaScript code here.
// Remember to pay attention to page loading!

window.addEventListener('load', function () {
    let flightStatus = document.getElementById('flightStatus');
    let flightScreen = document.getElementById('shuttleBackground');
    let shuttleLocationText = document.getElementById('spaceShuttleHeight');
    let takeoffButton = document.getElementById('takeoff');
    let landButton = document.getElementById('landing');
    let abortButton = document.getElementById('missionAbort');
    let allButtons = document.querySelectorAll('button');
    let shuttleVerticalLocation = 0;
    let shuttleHorizontalLocation = 0;

    let flying = false;
    
    for(let i = 0; i < allButtons.length; i++){
        allButtons[i].onclick = function(){
            let direction = allButtons[i].innerText
            if(direction === 'Up'){
                moveShuttle('Up', false)
            } else if (direction === 'Down') {
                moveShuttle('Up', true);
            } else if (direction === 'Right') {
                moveShuttle('Right', true);
            } else if (direction === "Left") {
                moveShuttle('Right', false);
            }
        }

        takeoffButton.onclick = function(){

            if(!flying && window.confirm('Confirm that the shuttle is ready for takeoff.')){
                flying = true;
                changeElements(10, 'Shuttle in flight.', 'blue');
            }
        }

        landButton.onclick = function(){
            if(flying){
                window.alert("The shuttle is landing. Landing gear engaged");
                changeElements(0, 'The shuttle has landed.', 'green');
                flying = false;
            }
        }
    
        abortButton.onclick = function(){
            if(flying && window.confirm('Confirm that you want to abort the mission.')){
                changeElements(0, 'Mission aborted.', 'green');
                flying = false;
            }
        }
    }
    
    let moveShuttle = function(direction, control){
        let rocket = document.getElementById('rocket');

        if(control && direction === 'Up'){
            shuttleVerticalLocation += 10;
            rocket.style.top = `${shuttleVerticalLocation}.px`;
        } else if (direction === 'Up' && shuttleVerticalLocation >= 0){
            shuttleVerticalLocation -= 10;
            rocket.style.top = `${shuttleVerticalLocation}.px`;
        }

        if(control && direction === 'Right'){
            shuttleHorizontalLocation += 10;
            rocket.style.left = `${shuttleHorizontalLocation}.px`;
            console.log(shuttleHorizontalLocation)
        } else if (direction === 'Right'){
            if(control && shuttleHorizontalLocation > 0){
                shuttleHorizontalLocation += 10;
                rocket.style.right = `${shuttleHorizontalLocation}.px`;
                console.log(shuttleHorizontalLocation);
            } else {
                shuttleHorizontalLocation -= 10;
                rocket.style.left = `${shuttleHorizontalLocation}.px`;
                console.log(shuttleHorizontalLocation);
            }
        }
    }

    let changeElements = function(height, status = flightStatus.innerText, color = flightScreen.style.backgroundColor){
        flightStatus.innerText = status;
        flightScreen.style.backgroundColor = color;
        shuttleVerticalLocation = height;
        shuttleLocationText.innerText = shuttleVerticalLocation * 1000;
    }

})