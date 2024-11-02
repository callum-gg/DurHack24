function CreateDecision(stage, index) {
    // Get question data
    fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        let question = data[stage][index];
        let container = document.createElement("div");
        container.classList.add("decision");
        // TODO: change parent appropriately
        document.getElementById("stage1Page").children[1].appendChild(container);

        let text_element = document.createElement("p");
        text_element.innerText = question.Question;
        text_element.className = "decision-text";
        container.appendChild(text_element);

        for (let [answer_id, answer] of Object.entries(question.Answers)) {
            let button = document.createElement("div");
            button.innerText = answer.Text;
            button.className = "decision-option";
            button.addEventListener("click", () => {

            });
            container.appendChild(button);
        }        
    })
    .catch(error => console.error('Error fetching the questions:', error));
}

CreateDecision(1, 0);