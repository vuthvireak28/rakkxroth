document.addEventListener('DOMContentLoaded', function() {
    const relationshipDate = new Date('2020-03-17T00:00:00'); // March 17, 2020
    const yearsElement = document.getElementById('years');
    const monthsElement = document.getElementById('months');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    function updateTimeElapsed() {
        const now = new Date();
        const timeDifference = now.getTime() - relationshipDate.getTime(); // Difference in milliseconds

        if (timeDifference <= 0) {
            yearsElement.textContent = '0';
            monthsElement.textContent = '0';
            daysElement.textContent = '0';
            hoursElement.textContent = '0';
            minutesElement.textContent = '0';
            secondsElement.textContent = '0';
            return;
        }

        const totalSeconds = Math.floor(timeDifference / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);

        const years = Math.floor(totalDays / 365.25);
        const remainingDaysAfterYears = totalDays % 365.25;
        const months = Math.floor(remainingDaysAfterYears / 30.44);
        const days = Math.floor(remainingDaysAfterYears % 30.44);
        const hours = Math.floor(totalSeconds % (60 * 60 * 24) / (60 * 60));
        const minutes = Math.floor(totalSeconds % (60 * 60) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        yearsElement.textContent = years;
        monthsElement.textContent = months;
        daysElement.textContent = days;
        hoursElement.textContent = hours;
        minutesElement.textContent = minutes;
        secondsElement.textContent = seconds;
    }

    // Update the time elapsed immediately when the page loads
    updateTimeElapsed();

    // Update the time elapsed every second
    setInterval(updateTimeElapsed, 1000);

    // Attempt to play background music (you might still need user interaction depending on the browser)
    const backgroundAudio = document.getElementById('backgroundAudio');
    if (backgroundAudio) {
        backgroundAudio.play().catch(error => {
            console.log('Autoplay was prevented:', error);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const backgroundAudio = document.getElementById('backgroundAudio'); // Make sure your audio tag has this ID
    let audioPlayed = false;

    if (backgroundAudio) {
        document.addEventListener('click', function playAudio() {
            if (!audioPlayed) {
                backgroundAudio.play().catch(error => {
                    console.error('Failed to play audio:', error);
                    // You might want to display a message to the user here if it still fails
                });
                audioPlayed = true;
                document.removeEventListener('click', playAudio); // Remove the listener after the first click
            }
        });
    } else {
        console.error('Audio element with ID "backgroundAudio" not found.');
    }

    // ... your existing countdown code ...
});