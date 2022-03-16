// <p>1. I need to find the way to a shop that a friend has recommended. I would: </p>
// <input type="radio" id="css" name="fav_language" value="CSS">
// <label for="css">Ask my friend to tell me the directions</label><br>
// <input type="radio" id="javascript" name="fav_language" value="JavaScript">
// <label for="javascript">Write down the street directions I need to remember</label><br>
// <input type="radio" id="javascript" name="fav_language" value="JavaScript">
// <label for="javascript">Use a map.</label><br>


const questions = [
    {
    question: "I need to find the way to a shop that a friend has recommended. I would:",
    answers: [{
            value: "Find out where the shop is in relation to somewhere I know.",
            score: "V"
        },
        {
            value: "Ask my friend to tell me the directions",
            score: "A"
        },
        {
            value: "Write down the street directions I need to remember",
            score: "R"
        },
        {
            value: "Use a map.",
            score: "K"
        }
    ]
},
{
    question: `A website has a video showing how to make a special graph or chart.There is a person speaking,some
    lists and words describing what to do and some diagrams. I would learn most from:`,
    answers: [{
            value: " Find out where the shop is in relation to somewhere I know.",
            score: "V"
        },
        {
            value: " Ask my friend to tell me the directions",
            score: "A"
        },
        {
            value: " Write down the street directions I need to remember",
            score: "R"
        },
        {
            value: "Use a map.",
            score: "K"
        }
    ]
},
{
    question: `I want to find out more about a tour that I am going on. I would:`,
    answers: [{
            value: "Look at details about the highlights and activities on the tour",
            score: "V"
        },
        {
            value: "Use a map and see where the places are.",
            score: "A"
        },
        {
            value: "Read about the tour on the itinerary.",
            score: "R"
        },
        {
            value: "Using words well in written communications.",
            score: "K"
        }
    ]
},
{
    question: `When choosing a career or area of study, these are important for me:`,
    answers: [
        {
            value: " Applying my knowledge in real situations.",
            score: "V"
        },
        {
            value: "Communicating with others through discussion.",
            score: "A"
        },
        {
            value: "Working with designs, maps or charts.",
            score: "R"
        },
        {
            value: "Using words well in written communications.",
            score: "K"
        }
    ]
}
]


for(let i=0; i<questions.length; i++){
    const question = questions[i];
    const _question = createQuestion(i,question);
    const container = document.querySelector("#questions-forms");
    console.log(container)
    container.appendChild(_question)
}


function createQuestion(count,data) {
    const container = document.createElement("section");
    const title = document.createElement("p");
    title.innerHTML = (count+1) +". "+data.question;
    container.appendChild(title);

    for (let i = 0; i < data.answers.length; i++) {
        const answer = data.answers[i];
        // <input type="radio" id="html" name="fav_language" value="HTML">
        const _main = document.createElement("div")
        const input = document.createElement("input");
        input.type = "radio";
        input.value = answer.value;
        input.setAttribute("score", answer.score);
        input.setAttribute("id", "question"+count+"answer"+i);
        input.setAttribute("name", "question"+count+"answer"+count);
        // <label for="html">Find out where the shop is in relation to somewhere I know.</label><br>
        const label = document.createElement("label");
        label.innerHTML = answer.value
        label.setAttribute("for", "question"+count+"answer"+i);
        label.setAttribute("id","question"+count+"answer"+count)
        input.addEventListener("change", (event)=>{
            console.log(event.target)
        })

        _main.appendChild(input);
        _main.appendChild(label);
        container.appendChild(_main);
    }

    return container;
}