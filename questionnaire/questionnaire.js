
//todo all questions to the list
const questions = [
    {
    question: "I need to find the way to a shop that a friend has recommended. I would:",
    answers: [{
            value: "Find out where the shop is in relation to somewhere I know.",
            score: "K"
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
            score: "V"
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
            score: "K"
        },
        {
            value: "Use a map and see where the places are.",
            score: "V"
        },
        {
            value: "Read about the tour on the itinerary.",
            score: "R"
        },
        {
            value: "Using words well in written communications.",
            score: "A"
        }
    ]
},
{
    question: `When choosing a career or area of study, these are important for me:`,
    answers: [
        {
            value: " Applying my knowledge in real situations.",
            score: "K"
        },
        {
            value: "Communicating with others through discussion.",
            score: "A"
        },
        {
            value: "Working with designs, maps or charts.",
            score: "V"
        },
        {
            value: "Using words well in written communications.",
            score: "R"
        }
    ]
},
{
    question: `When I am learning I:`,
    answers: [
        {
            value: "like to talk things through.",
            score: "A"
        },
        {
            value: "see patterns in things.",
            score: "V"
        },
        {
            value: "use examples and applications.",
            score: "K"
        },
        {
            value: "read books, articles and handouts.",
            score: "R"
        }
    ]
},

{
    question: `I want to save more money and to decide between a range of options. I would:`,
    answers: [
        {
            value: "Consider examples of each option using my financial information.",
            score: "K"
        },
        {
            value: "Read a print brochure that describes the options in detail.",
            score: "R"
        },
        {
            value: "Use graphs showing different options for different time periods. ",
            score: "V"
        },
        {
            value: "Talk with an expert about the options. ",
            score: "A"
        }
    ]
},

{
    question: `I want to learn how to play a new board game or card game. I would:`,
    answers: [
        {
            value: "Watch others play the game before joining in.",
            score: "K"
        },
        {
            value: "Listen to somebody explaining it and ask questions ",
            score: "A"
        },
        {
            value: "Use the diagrams that explain the various stages, moves and strategies in the game ",
            score: "V"
        },
        {
            value: "Read the instructions. ",
            score: "R"
        }
    ]
},

{
    question: `I have a problem with my heart. I would prefer that the doctor:`,
    answers: [
        {
            value: "Gave me something to read to explain what was wrong.",
            score: "K"
        },
        {
            value: "Used a plastic model to show me what was wrong. ",
            score: "A"
        },
        {
            value: "Described what was wrong.  ",
            score: "V"
        },
        {
            value: "Showed me a diagram of what was wrong.  ",
            score: "R"
        }
    ]
},




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