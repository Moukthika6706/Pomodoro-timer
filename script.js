let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workTime = 25; // Initial work session duration in minutes
let breakTime = 5; // Initial break session duration in minutes

let seconds = "00";
let workSessionsCompleted = 0;
let breakSessionsCompleted = 0;

window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;
    
    workTittle.classList.add('active');
}

function start() {
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";

    seconds = 59;
    let workMinutes = workTime; // Set initial work session duration
    let breakMinutes = breakTime; // Set initial break session duration
    let breakcount = 0;

    let progressBar = document.getElementById('progress');
    
    let timerFunction = () => {
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        let totalSeconds;
        if (breakcount % 2 == 0)  {
            totalSeconds = workMinutes * 60 + parseInt(seconds); // Total seconds 
        } else {
            totalSeconds = breakMinutes * 60 + parseInt(seconds); // Total seconds remaining in the break session
        }
        
        let totalSessionTime;
        if (breakcount % 2 == 0) {
            totalSessionTime = workTime * 60; // Total time in the work session in seconds
        } else {
            totalSessionTime = breakTime * 60; // Total time in the break session in seconds
        }

        let progressWidth = (totalSeconds / totalSessionTime) * 100; // Percentage of time passed
        progressBar.style.width = progressWidth + '%';
        seconds = seconds - 1;

        if (seconds == 0) {
            workMinutes = workMinutes - 1;
            if (workMinutes == -1) {
                if (breakcount % 2 == 0) {
                    workMinutes = breakTime; // Set workMinutes to breakTime for break session
                    breakcount++;
                    workTittle.classList.remove('active');
                    breakTittle.classList.add('active');
                    breakSessionsCompleted++;
                    document.getElementById('break-sessions-completed').innerHTML = breakSessionsCompleted;
                } else {
                    workMinutes = workTime; // Set workMinutes to workTime for work session
                    breakcount++;
                    breakTittle.classList.remove('active');
                    workTittle.classList.add('active');
                    workSessionsCompleted++;
                    document.getElementById('work-sessions-completed').innerHTML = workSessionsCompleted;
                }
            }
            seconds = 59;
        }
        if(seconds <= 9 && seconds >= 0) {
            seconds = '0' + seconds;
        }
        if(seconds < 0) {
            seconds = 59;
            workMinutes = workMinutes -1;
        }
    };

    setInterval(timerFunction, 1000);
}