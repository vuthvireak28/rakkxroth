document.addEventListener('DOMContentLoaded', function() {
    const relationshipDate = new Date('2020-03-17T00:00:00');
    const yearsElement = document.getElementById('years');
    const monthsElement = document.getElementById('months');
    const weeksElement = document.getElementById('weeks');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const totalDaysElement = document.getElementById('total-days');
    const name1Element = document.getElementById('couple-name1');
    const name2Element = document.getElementById('couple-name2');
    const profilePic1Element = document.getElementById('profile-pic1');
    const profilePic2Element = document.getElementById('profile-pic2');
    const backgroundUpload = document.getElementById('background-upload');
    const audioSelect = document.getElementById('audio-select');
    const audioSource = document.getElementById('audio-source');
    const backgroundAudio = document.getElementById('backgroundAudio');
    const nameInput1 = document.getElementById('name1');
    const nameInput2 = document.getElementById('name2');
    const profileUpload1 = document.getElementById('profile-upload1');
    const profileUpload2 = document.getElementById('profile-upload2');
    const saveSettingsBtn = document.getElementById('save-settings');
    const settingsPanel = document.querySelector('.settings-panel');
    const countdownContainer = document.querySelector('.countdown-container');
    const settingsBtn = document.getElementById('settings-btn');
    const homeBtn = document.getElementById('home-btn'); // Assuming you want to toggle visibility

    // --- Click Sound ---
    const clickSound = new Audio('click.mp3'); // Replace 'click.mp3' with your sound file path

    // --- Load Settings from Local Storage ---
    function loadSettings() {
        const savedBackground = localStorage.getItem('background');
        const savedName1 = localStorage.getItem('name1');
        const savedName2 = localStorage.getItem('name2');
        const savedProfilePic1 = localStorage.getItem('profilePic1');
        const savedProfilePic2 = localStorage.getItem('profilePic2');
        const savedAudio = localStorage.getItem('audio');

        if (savedBackground) {
            document.body.style.backgroundImage = `url('${savedBackground}')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundRepeat = 'no-repeat';
        }
        if (savedName1) {
            name1Element.textContent = savedName1;
            nameInput1.value = savedName1;
        }
        if (savedName2) {
            name2Element.textContent = savedName2;
            nameInput2.value = savedName2;
        }
        if (savedProfilePic1) {
            profilePic1Element.src = savedProfilePic1;
        }
        if (savedProfilePic2) {
            profilePic2Element.src = savedProfilePic2;
        }
        if (savedAudio) {
            audioSource.src = savedAudio;
            backgroundAudio.load();
            backgroundAudio.play().catch(error => {
                console.log('Autoplay prevented or error:', error);
            });
            audioSelect.value = savedAudio; // Ensure the dropdown reflects the saved choice
        }
    }

    // --- Save Settings to Local Storage ---
    function saveSettings() {
        localStorage.setItem('background', document.body.style.backgroundImage.slice(5, -2)); // Extract URL
        localStorage.setItem('name1', nameInput1.value);
        localStorage.setItem('name2', nameInput2.value);
        localStorage.setItem('profilePic1', profilePic1Element.src);
        localStorage.setItem('profilePic2', profilePic2Element.src);
        localStorage.setItem('audio', audioSelect.value);
    }

    // --- Time Elapsed Calculation ---
    function updateTimeElapsed() {
        const now = new Date();
        const timeDifference = now.getTime() - relationshipDate.getTime();

        if (timeDifference <= 0) {
            yearsElement.textContent = '0';
            monthsElement.textContent = '0';
            weeksElement.textContent = '0';
            daysElement.textContent = '0';
            hoursElement.textContent = '0';
            minutesElement.textContent = '0';
            secondsElement.textContent = '0';
            totalDaysElement.textContent = '0';
            return;
        }

        // ... (rest of your time calculation code remains the same) ...
        const totalSeconds = Math.floor(timeDifference / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);
        const years = Math.floor(totalDays / 365.25);
        const remainingDaysAfterYears = totalDays % 365.25;
        const months = Math.floor(remainingDaysAfterYears / 30.44);
        const weeks = Math.floor(remainingDaysAfterYears % 30.44 / 7);
        const remainingDaysAfterWeeks = Math.floor(remainingDaysAfterYears % 30.44) % 7;
        const hours = Math.floor(totalSeconds % (60 * 60 * 24) / (60 * 60));
        const minutes = Math.floor(totalSeconds % (60 * 60) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        yearsElement.textContent = years;
        monthsElement.textContent = months;
        weeksElement.textContent = weeks;
        daysElement.textContent = remainingDaysAfterWeeks;
        hoursElement.textContent = hours;
        minutesElement.textContent = minutes;
        secondsElement.textContent = seconds;
        totalDaysElement.textContent = totalDays;
    }

    updateTimeElapsed();
    setInterval(updateTimeElapsed, 1000);

    // --- Audio Selection ---
    audioSelect.addEventListener('change', function() {
        clickSound.play(); // Play the click sound
        const selectedSong = this.value;
        audioSource.src = selectedSong;
        backgroundAudio.load(); // Important to load the new source
        backgroundAudio.play().catch(error => {
            console.log('Autoplay prevented or error:', error);
        });
        localStorage.setItem('audio', selectedSong); // Save audio selection immediately
    });

    // --- Settings Panel Visibility ---
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            settingsPanel.style.display = 'block';
            countdownContainer.style.display = 'none'; // Hide main content when settings are open
        });
    }

    if (homeBtn) {
        homeBtn.addEventListener('click', function() {
            settingsPanel.style.display = 'none';
            countdownContainer.style.display = 'block'; // Show main content
        });
    }

    // --- Save Settings Functionality ---
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            name1Element.textContent = nameInput1.value;
            name2Element.textContent = nameInput2.value;
            saveSettings(); // Save all settings to local storage
            alert('Settings Saved!');
            settingsPanel.style.display = 'none';
            countdownContainer.style.display = 'block';
        });
    }

    // --- Background Image Change ---
    if (backgroundUpload) {
        backgroundUpload.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.body.style.backgroundImage = `url('${e.target.result}')`;
                    document.body.style.backgroundSize = 'cover';
                    document.body.style.backgroundRepeat = 'no-repeat';
                    localStorage.setItem('background', e.target.result); // Save background immediately
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // --- Profile Picture Change (for profile 1) ---
    if (profileUpload1) {
        profileUpload1.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePic1Element.src = e.target.result;
                    localStorage.setItem('profilePic1', e.target.result); // Save profile pic 1 immediately
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // --- Profile Picture Change (for profile 2) ---
    if (profileUpload2) {
        profileUpload2.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePic2Element.src = e.target.result;
                    localStorage.setItem('profilePic2', e.target.result); // Save profile pic 2 immediately
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // --- Attempt to play background music on load ---
    if (backgroundAudio) {
        loadSettings(); // Load settings when the page loads
        backgroundAudio.play().catch(error => {
            console.log('Autoplay prevented:', error);
        });
    }
});
