class Hangman {
    constructor(word, description, hint) {
        this.word = word.toUpperCase();
        this.empty_word = "_ ".repeat(word.length);
        this.description = description;
        this.hint = hint;
        this.mistakes = 0;

        // Set the container to be the stage1hangman div
        this.container = document.getElementById("stage1hangman");
        this.container.style.display = "block"; // Make sure it's visible

        // Clear any previous content inside the container
        this.container.innerHTML = "";

        this.descriptionElement = document.createElement("p");
        this.descriptionElement.innerText = this.description;
        this.container.appendChild(this.descriptionElement);

        this.wordElement = document.createElement("p");
        this.wordElement.innerText = this.empty_word;
        this.container.appendChild(this.wordElement);

        this.hintElement = document.createElement("p");
        this.hintElement.innerText = "Hint: " + this.hint;
        this.container.appendChild(this.hintElement);

        this.hangmanImg = document.createElement("img");
        this.container.appendChild(this.hangmanImg);

        this.keyListener = document.addEventListener("keydown", (event) => {
            this.guess(event.key.toUpperCase());
        });
    }
    guess(letter) {
        if (this.word.includes(letter) && this.mistakes <= 6) {
            for (let i = 0; i < this.word.length; i++) {
                if (this.word[i] === letter) {
                    this.empty_word = this.empty_word.substring(0, i * 2) + letter + this.empty_word.substring(i * 2 + 1);
                }
            }
            this.wordElement.innerText = this.empty_word;
    
            if (!this.empty_word.includes("_")) {
                document.removeEventListener("keydown", this.keyListener);
                this.hintElement.innerText = "You won!";
                
                // Wait for 5 seconds, then show Stage 2 page
                setTimeout(showStage2Page, 5000);
            }
        } else if (/[A-Z]/.test(letter) && letter.length === 1 && this.empty_word.includes("_")) {
            if (this.mistakes < 6) {
                this.hangmanImg.src = `img/hangman-${this.mistakes}.svg`;
                this.mistakes++;
            } else {
                this.hintElement.innerText = "You lost!";
                this.wordElement.innerText = this.word;
    
                // Wait for 5 seconds, then start Stage 2
                setTimeout(startStage2, 5000);
            }
        }
    }
}

class ImageHangman {
    constructor(word, image, hint) {
        this.word = word.toUpperCase();
        this.empty_word = "_ ".repeat(word.length);
        this.description = description;
        this.hint = hint;
        this.mistakes = 0;

        // Set the container to be the stage1hangman div
        this.container = document.getElementById("stage2hangman");
        this.container.style.display = "block"; // Make sure it's visible

        // Clear any previous content inside the container
        this.container.innerHTML = "";

        this.descriptionElement = document.createElement("p");
        this.descriptionElement.innerText = this.description;
        this.container.appendChild(this.descriptionElement);

        this.wordElement = document.createElement("p");
        this.wordElement.innerText = this.empty_word;
        this.container.appendChild(this.wordElement);

        this.hintElement = document.createElement("p");
        this.hintElement.innerText = "Hint: " + this.hint;
        this.container.appendChild(this.hintElement);

        this.hangmanImg = document.createElement("img");
        this.container.appendChild(this.hangmanImg);

        this.keyListener = document.addEventListener("keydown", (event) => {
            this.guess(event.key.toUpperCase());
        });
    }
    guess(letter) {
        if (this.word.includes(letter) && this.mistakes <= 6) {
            for (let i = 0; i < this.word.length; i++) {
                if (this.word[i] === letter) {
                    this.empty_word = this.empty_word.substring(0, i * 2) + letter + this.empty_word.substring(i * 2 + 1);
                }
            }
            this.wordElement.innerText = this.empty_word;
    
            if (!this.empty_word.includes("_")) {
                document.removeEventListener("keydown", this.keyListener);
                this.hintElement.innerText = "You won!";
                
                // Wait for 5 seconds, then show Stage 2 page
                setTimeout(showStage2Page, 5000);
            }
        } else if (/[A-Z]/.test(letter) && letter.length === 1 && this.empty_word.includes("_")) {
            if (this.mistakes < 6) {
                this.hangmanImg.src = `img/hangman-${this.mistakes}.svg`;
                this.mistakes++;
            } else {
                this.hintElement.innerText = "You lost!";
                this.wordElement.innerText = this.word;
    
                // Wait for 5 seconds, then start Stage 2
                setTimeout(startStage3, 5000);
            }
        }
    }
}




// let hangman = new Hangman("Credit", 
//     "The opposite of debit, this type of card allows you to borrow money to make purchases.",
//     "It's what you signed up for at the beginning of this game!");