document.addEventListener('DOMContentLoaded', function () {
    var app = new Framework7({
        root: '#app',
    });

    let selectedAvatar = null;

    function selectAvatar(avatarNumber) {
        selectedAvatar = avatarNumber;
        document.querySelectorAll('.avatar-option img').forEach(img => {
            img.classList.remove('selected');
        });
        document.getElementById('avatar' + avatarNumber).classList.add('selected');
    }

    function saveProfile() {
        const name = document.getElementById('nameInput').value;
        if (name && selectedAvatar) {
            localStorage.setItem('profileName', name);
            localStorage.setItem('profileAvatar', selectedAvatar);

            // Initialize balance and credit score if they don’t already exist
            if (!localStorage.getItem('balance')) {
                localStorage.setItem('balance', '0');
            }
            if (!localStorage.getItem('creditScore')) {
                localStorage.setItem('creditScore', '0');
            }

            showStage1Page(); // Show stage1 page after saving
        } else {
            app.dialog.alert('Please select an avatar and enter a name.');
        }
    }


    

    function showStage1Page() {
        document.getElementById('personalisationPage').style.display = 'none';
        document.getElementById('stage1Page').style.display = 'block';

        // Load profile details from localStorage
        const name = localStorage.getItem('profileName');
        const avatar = localStorage.getItem('profileAvatar');
        const balance = localStorage.getItem('balance');
        const creditScore = localStorage.getItem('creditScore');

        // Update avatar image and name
        document.getElementById('selectedAvatarImg').src = `img/Mii${avatar}.jpg`;
        document.getElementById('userName').textContent = name;

        // Update balance and credit score
        document.getElementById('balanceAmount').textContent = `£${balance}`;
        document.getElementById('creditScore').textContent = creditScore;
    }

    function showStage2Page() {
    document.getElementById('personalisationPage').style.display = 'none';
    document.getElementById('stage1Page').style.display = 'none';
    document.getElementById('stage2Page').style.display = 'block';

    // Load profile details from localStorage
    const name = localStorage.getItem('profileName');
    const avatar = localStorage.getItem('profileAvatar');
    const balance = localStorage.getItem('balance');
    const creditScore = localStorage.getItem('creditScore');

    // Update avatar image and name for Stage 2
    document.getElementById('selectedAvatarImgStage2').src = `img/Mii${avatar}.jpg`;
    document.getElementById('userNameStage2').textContent = name;

    // Update balance and credit score for Stage 2
    document.getElementById('balanceAmountStage2').textContent = `£${balance}`;
    document.getElementById('creditScoreStage2').textContent = creditScore;
    }

    function showStage3Page() {
    document.getElementById('personalisationPage').style.display = 'none';
    document.getElementById('stage1Page').style.display = 'none';
    document.getElementById('stage2Page').style.display = 'none';
    document.getElementById('stage3Page').style.display = 'block';

    // Load profile details from localStorage
    const name = localStorage.getItem('profileName');
    const avatar = localStorage.getItem('profileAvatar');
    const balance = localStorage.getItem('balance');
    const creditScore = localStorage.getItem('creditScore');

    // Update avatar image and name for Stage 3
    document.getElementById('selectedAvatarImgStage3').src = `img/Mii${avatar}.jpg`;
    document.getElementById('userNameStage3').textContent = name;

    // Update balance and credit score for Stage 3
    document.getElementById('balanceAmountStage3').textContent = `£${balance}`;
    document.getElementById('creditScoreStage3').textContent = creditScore;
    }



    function showPersonalisationPage() {
        document.getElementById('personalisationPage').style.display = 'block';
        document.getElementById('stage1Page').style.display = 'none';
    }

    // Clear profile data and reset to personalisation page on refresh
    function clearProfileData() {
        localStorage.clear();
        showPersonalisationPage();
    }

    // Clear profile data on page load
    clearProfileData();

    // Attach functions to global scope
    window.selectAvatar = selectAvatar;
    window.saveProfile = saveProfile;
    window.showStage2Page = showStage2Page;
    window.showStage3Page = showStage3Page;
})