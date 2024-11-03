function CreateDecision(question_id) {
    console.log(question_id);
    fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        for (let stage=0; stage<data.length; stage++) {
            for (let index=0; index<data[stage].length; index++) {
                let question = data[stage][index];
                if (question.questionID === `q${question_id}`) {
                    console.log("found question", stage)
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
                            // TODO: integrate with flow chart
                            // TODO: update credit score, money, etc.
                            document.getElementById(`stage${stage + 1}questions`).innerHTML = '';
                            CreateDecision(question_id + 1);
                            if (index === data[stage].length - 1) {
                                console.log(stage);
                                switch (stage) {
                                    case 0:
                                        showStage2Page();
                                        break;
                                    case 1:
                                        showStage3Page();
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