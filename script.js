class PomodoroTimer{
    constructor(){
        this.restoreDefaults();
    }

    restoreDefaults(){
        this.sessionTime = 25;
        this.breakTime = 5;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.swapIter = 1;
        this.isSession = true;
    }

    stop(){
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.swapIter = 1;
        this.isSession = true;
    }

    initTimer(){
        this.minutes = this.sessionTime;
    }

    swap(){
        if(this.swapIter % 2 === 0){
            this.minutes = this.sessionTime;
            this.isSession = true;
        } else {
            this.minutes = this.breakTime;
            this.isSession = false;
        }
        this.swapIter++;
    }

    sessionIncr(){
        this.sessionTime++;
        this.initTimer();
    }

    sessionDecr(){
        if(this.sessionTime > 1){
            this.sessionTime--;
        }
        this.initTimer();
    }

    breakIncr(){
        this.breakTime++;
    }

    breakDecr(){
        if(this.breakTime > 1){
            this.breakTime--;
        }
    }

    getSessionTime(){
        return this.sessionTime;
    }

    setSessionTime(time){
        this.sessionTime = time;
    }

    getBreakTime(){
        return this.breakTime;
    }

    setBreakTime(time){
        this.breakTime = time;
    }

    decrSeconds(){
        if(this.seconds === 0 && this.minutes > 0){
            this.seconds = 59;
            this.decrMinutes();
        } else if (this.seconds > 0){
            this.seconds--;
        } else {
            this.swap();
        }
    }

    decrMinutes(){
        if(this.minutes === 0 && this.hours > 0){
            this.minutes = 59;
            this.decrHours();
        } else {
            this.minutes--;
        }
    }

    decrHours(){
        if(this.decrHours > 0){
            this.hours--;
        }
        
    }

    getTime(){
        this.hours = Math.floor(this.minutes / 60);
        return {hours:this.hours, 
            minutes:this.minutes,
            seconds:this.seconds};
    }
}

let pomodoroTimer = new PomodoroTimer();

const roleButtons = document.querySelectorAll(".button");
roleButtons.forEach(btn => btn.addEventListener('click', handleRoles))

function handleRoles(){
    let dataRole = this.getAttribute("data-role");
    switch (dataRole) {
        case "session-incr":
            pomodoroTimer.sessionIncr();
            break;
        case "session-decr":
            pomodoroTimer.sessionDecr();
            break;
        case "break-incr":
            pomodoroTimer.breakIncr();
            break;
        case "break-decr":
            pomodoroTimer.breakDecr();
            break;
        case "start":
            start();
            break;
        case "pause":
            pause();
            break;
        case "stop":
            stop();
            break;
        case "reset":
            reset();
            break;
        default:
            break;
    }
    updateSubDisplays();
    updateMainDisplay();
}

pomodoroTimer.initTimer();
updateMainDisplay();
updateSubDisplays();

function updateSubDisplays(){
    const subSessDisp = document.querySelector("#sub-sess-disp")
    const subBrkDisp = document.querySelector("#sub-brk-disp")

    subSessDisp.textContent = pomodoroTimer.getSessionTime();
    subBrkDisp.textContent = pomodoroTimer.getBreakTime();
}

function updateMainDisplay(){
    const mainDisplay = document.querySelector('#main-display');
    let currTime = pomodoroTimer.getTime();

    let hours = currTime.hours;
    if(hours > 0 && hours < 10){
        hours = '0' + hours;
    } else if (hours === 0){
        hours = '';
    }

    let minutes = currTime.minutes % 60;
    if(minutes >= 0 && minutes < 10){
        minutes = '0' + minutes;
    }

    let seconds = currTime.seconds;
    if(seconds >= 0 && seconds < 10){
        seconds = '0' + seconds;
    }

    let time = hours + ':' + minutes + ':' + seconds;
    if(hours === ''){
        time = minutes + ':' + seconds;
    }
    mainDisplay.textContent = time;

    const mainDisplayLabel = document.querySelector('#main-display-lab');
    if(pomodoroTimer.isSession){
        mainDisplayLabel.textContent = 'SESSION';
    } else {
        mainDisplayLabel.textContent = 'BREAK';
    }
}

function countDown(){
    pomodoroTimer.decrSeconds();
    updateMainDisplay();
}

let interval;

function start(){
    interval = setInterval(countDown, 1000);
}

function pause(){
    clearInterval(interval);
}

function stop(){
    clearInterval(interval);
    pomodoroTimer.stop();
    pomodoroTimer.initTimer();
    updateMainDisplay();
}

function reset(){
    clearInterval(interval);
    pomodoroTimer.restoreDefaults();
    pomodoroTimer.initTimer();
    updateMainDisplay();
}



