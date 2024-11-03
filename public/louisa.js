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

            // Initialize balance and credit score if they don't already exist
            if (!localStorage.getItem('balance')) {
                localStorage.setItem('balance', '500');
            }
            if (!localStorage.getItem('creditScore')) {
                localStorage.setItem('creditScore', '0');
            }

            document.getElementById('userNameMessage').innerText = name;

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

function displayMoreContentStage1() {
    // Check if #welcomeMessage exists
    const welcomeMessageDiv = document.querySelector('#welcomeMessage');
    if (!welcomeMessageDiv) {
        console.error('welcomeMessage div not found');
        return;
}

// Update content within #welcomeMessage
welcomeMessageDiv.innerHTML = `
    <h2>Understanding Your Credit Card</h2>
    <p><strong>Balance:</strong> The amount of money you owe on your credit card.</p>
    <p><strong>Credit Score:</strong> A numerical value that indicates your creditworthiness based on credit history.</p>
    <p><strong>Interest Rate:</strong> The percentage of interest charged if you carry a balance from month to month.</p>
    <button class="button button-fill-ios" onclick="displayInstructionsStage1()">Next</button>
`;
}

function displayInstructionsStage1(){
    // Check if #welcomeMessage exists
    const welcomeMessageDiv = document.querySelector('#welcomeMessage');
    if (!welcomeMessageDiv) {
        console.error('welcomeMessage div not found');
        return;
}

// Update content within #welcomeMessage
welcomeMessageDiv.innerHTML = `
    <h2>The rules </h2>
    <p> Starting with a credit balance of £500 and a credit score of 0, you now have the opportunity to manage your finances and build your credit history. As you navigate through various decisions, consider how each choice impacts your credit score and overall financial health. Remember, every decision you make could unlock new perks or present challenges along the way. Let's see how you handle your newfound financial responsibility!</p>
    <p> If you ever have any questions, please use the button on the bottom right corner to ask our chat-bot any questions. Good luck!</p>
    <button class="button button-fill-ios" onclick="startStage1()">Start </button>
`;
}

function startStage1(){
    document.getElementById('welcome-box').style.display = 'none';
     document.getElementById('stage1questions').style.display = 'block';

}

function startStage1b(){
    const hangman1 = new Hangman(
        "Credit",
        "The opposite of debit, this type of card allows you to borrow money to make purchases.",
        "It's what you signed up for at the beginning of this game!"
    );
    const hangman2 = new Hangman(
        "Minimum",
        "This term describes paying the same amount every month to reduce a loan or credit card balance.",
        "It's the smallest amount you're required to pay each month."
    ); 
    const hangman3 = new Hangman(
        "Grace Period",
        "What refers to a period when no interest is charged on purchases, provided you pay off your balance before the due date?",
        "This period helps you avoid interest charges on purchases."
    );
    hangmans = [hangman1, hangman2, hangman3]
    hangman = hangmans[Math.floor(Math.random() * 3)];
    document.getElementById('stage1questions').style.display = 'none';
    document.getElementById('stage1hangman').style.display = 'block';

}

function startStage2(){
    document.getElementById('welcome-box2').style.display = 'none';
    document.getElementById('stage2questions').style.display = 'block';

}

function startStage1b(){
    const hangman1 = new Hangman(
        "Credit score",
        "img/hangman2-2.png",
        "Influences your loan approvals and interest rates."
    );
    const hangman2 = new Hangman(
        "Savings",
        "img/hangman2-3.png",
        "Money set aside for future use."
    ); 
    const hangman3 = new Hangman(
        "Digital banking",
        "img/hangman2-1.png",
        "Makes banking easier and more convenient."
    );
    hangmans = [hangman1, hangman2, hangman3]
    hangman = hangmans[Math.floor(Math.random() * 3)];
    document.getElementById('stage1questions').style.display = 'none';
    document.getElementById('stage1hangman').style.display = 'block';

}

function displayMoreContentStage3() {
    // Check if #welcomeMessage exists
    const welcomeMessageDiv = document.querySelector('#welcomeMessage3');
    if (!welcomeMessageDiv) {
        console.error('welcomeMessage div not found!');
        return;
}

// Update content within #welcomeMessage
welcomeMessageDiv.innerHTML = `
    <h2>Understanding Mortgages</h2>
    <p><strong>Mortgage:</strong> A mortgage is a loan specifically for buying a home. It allows you to borrow money from a lender to purchase a property and then repay it over many years. </p>
    <p><strong>Down Payment:</strong> This is the initial amount you pay upfront when purchasing a home. A larger down payment reduces the amount you need to borrow and can lower your monthly payments and interest costs. Many lenders require at least a 5-20% down payment.</p>
    <button class="button button-fill-ios" onclick="displayInstructionsStage3()">Next</button>
`;
}

function displayInstructionsStage3(){
    // Check if #welcomeMessage exists
    const welcomeMessageDiv = document.querySelector('#welcomeMessage3');
    if (!welcomeMessageDiv) {
        console.error('welcomeMessage div not found');
        return;
    }

    // Update content within #welcomeMessage
    welcomeMessageDiv.innerHTML = `
        <p> As you embark on this significant financial milestone, you'll face critical decisions that will shape your future. Each scenario will test your understanding of mortgages and how they fit into your long-term financial strategy. Choose wisely, as these decisions will impact your monthly budget, equity, and overall financial health. Let's dive into the world of homeownership and explore the possibilities that lie ahead! </p>

        <button class="button button-fill-ios" onclick="startStage3()">Start </button>
    `;
}

 function startStage3(){
     document.getElementById('welcome-box3').style.display = 'none';
     document.getElementById('stage3questions').style.display = 'block';

 }

 function HelpButtonFunction() {
    document.getElementById('helpPage').style.display = 'block';
}

function closeHelpPage() {
    document.getElementById('helpPage').style.display = 'none';
}
