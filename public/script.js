function CreateDecision(question_id) {
    fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        for (let stage = 0; stage < data.length; stage++) {
            for (let index = 0; index < data[stage].length; index++) {
                let question = data[stage][index];
                if (question.questionID === `q${question_id}`) {
                    let container = document.createElement("div");
                    container.classList.add("decision");
                    document.getElementById(`stage${stage + 1}questions`).appendChild(container);

                    let text_element = document.createElement("p");
                    text_element.innerText = question.Question;
                    text_element.className = "decision-text";
                    container.appendChild(text_element);

                    for (let [answer_id, answer] of Object.entries(question.Answers)) {
                        let button = document.createElement("div");
                        button.innerText = answer.Text;
                        button.className = "decision-option";
                        button.addEventListener("click", () => {
                            addQuestionToTree(answer_id, `q${question_id + 1}`);
                            let bal = String(Number(localStorage.getItem('balance', '0')) + answer['Balance increment']);
                            let credit = String(Number(localStorage.getItem('creditScore', '0')) + answer['Credit score increment']);
                            localStorage.setItem('balance', bal);
                            localStorage.setItem('creditScore', credit);
                            document.getElementById('balanceAmount').textContent = `£${bal}`;
                            document.getElementById('creditScore').textContent = credit;
                            document.getElementById(`stage${stage + 1}questions`).innerHTML = '';

                            CreateDecision(question_id + 1);

                            if (index === data[stage].length - 1) {
                                switch (stage) {
                                    case 0:
                                        startStage1b(); // Start Hangman after Stage 1
                                        break;
                                    case 1:
                                        startStage2b();
                                        console.log("2 hehe");
                                        break;
                                    case 2:
                                        showStage3Page();
                                        console.log("3 hehe");
                                        break;
                                }
                            }
                        });
                        container.appendChild(button);
                    }
                }
            }
        }
    })
    .catch(error => console.error('Error fetching the questions:', error));
}

CreateDecision(1);