
//create a global answers object
const allAnswers = {

};



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
            score: "R"
        },
        {
            value: "Used a plastic model to show me what was wrong. ",
            score: "K"
        },
        {
            value: "Described what was wrong.  ",
            score: "A"
        },
        {
            value: "Showed me a diagram of what was wrong.  ",
            score: "V"
        }
    ]
},

{
    question: `I want to learn to do something new on a computer. I would:`,
    answers: [
        {
            value: "Read the written instructions that came with the program.",
            score: "R"
        },
        {
            value: "Talk with people who know about the program. ",
            score: "A"
        },
        {
            value: "Start using it and learn by trial and error.  ",
            score: "K"
        },
        {
            value: "Follow the diagrams in a book.  ",
            score: "V"
        }
    ]
},

{
    question: `When learning from the Internet I like:`,
    answers: [
        {
            value: "Videos showing how to do or make things",
            score: "K"
        },
        {
            value: "Interesting design and visual features. ",
            score: "V"
        },
        {
            value: "Interesting written descriptions, lists and explanations.",
            score: "R"
        },
        {
            value: "Audio channels where I can listen to podcasts or interviews.",
            score: "A"
        }
    ]
},

{
    question: `I want to learn about a new project. I would ask for:`,
    answers: [
        {
            value: "Diagrams to show the project stages with charts of benefits and costs.",
            score: "V"
        },
        {
            value: "A written report describing the main features of the project ",
            score: "R"
        },
        {
            value: "An opportunity to discuss the project",
            score: "A"
        },
        {
            value: "Examples where the project has been used successfully ",
            score: "K"
        }
    ]
},

{
    question: `I want to learn how to take better photos. I would:`,
    answers: [
        {
            value: "Ask questions and talk about the camera and its features. ",
            score: "A"
        },
        {
            value: "Use the written instructions about what to do. ",
            score: "R"
        },
        {
            value: "Use diagrams showing the camera and what each part does ",
            score: "V"
        },
        {
            value: "Use examples of good and poor photos showing how to improve them. ",
            score: "K"
        }
    ]
},

{
    question: `I prefer a presenter or a teacher who uses:`,
    answers: [
        {
            value: "Demonstrations, models or practical sessions. ",
            score: "K"
        },
        {
            value: "Question and answer, talk, group discussion, or guest speakers ",
            score: "A"
        },
        {
            value: "Handouts, books, or readings. ",
            score: "R"
        },
        {
            value: "Diagrams, charts, maps or graphs ",
            score: "V"
        }
    ]
},


{
    question: `I have finished a competition or test and I would like some feedback. I would like to have feedback`,
    answers: [
        {
            value: "Using examples from what I have done ",
            score: "K"
        },
        {
            value: "Using a written description of my results. ",
            score: "R"
        },
        {
            value: "From somebody who talks it through with me.",
            score: "A"
        },
        {
            value: "Using graphs showing what I achieved.   ",
            score: "V"
        }
    ]
},


{
    question: `I want to find out about a house or an apartment. Before visiting it I would want:`,
    answers: [
        {
            value: "To view a video of the property. ",
            score: "K"
        },
        {
            value: "A discussion with the owner ",
            score: "A"
        },
        {
            value: "A printed description of the rooms and features.",
            score: "R"
        },
        {
            value: "A plan showing the rooms and a map of the area.",
            score: "V"
        }
    ]
},


{
    question: `I want to assemble a wooden table that came in parts (kitset). I would learn best from:`,
    answers: [
        {
            value: "Diagrams showing each stage of the assembly. ",
            score: "V"
        },
        {
            value: "Advice from someone who has done it before. ",
            score: "A"
        },
        {
            value: "Written instructions that came with the parts for the table.",
            score: "R"
        },
        {
            value: "Watching a video of a person assembling a similar table.",
            score: "K"
        }
    ]
}





]


//Render all questions
for(let i=0; i<questions.length; i++){
    const question = questions[i];
    const _question = createQuestion(i,question);
    const container = document.querySelector("#questions-forms");
    console.log(container)
    container.appendChild(_question)
}

//Creates a single question
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

            const score = event.target.getAttribute("score");
            console.log(score)
            const answer = {
                score : score,
                question : data.question,
                answer : event.target.value
            }
           
            allAnswers[""+(count+1)] = answer;

            console.log(allAnswers)
        })

        _main.appendChild(input);
        _main.appendChild(label);
        container.appendChild(_main);
    }

    return container;
}


//submitting a button
const button  = document.querySelector("#submit");
button.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(allAnswers)
    
    const keysCount = Object.keys(allAnswers).length;

    if(keysCount !== questions.length){
        alert("You have to complete the questionnaire")
    }else{
        //computer the score
        const scores = computeScores(allAnswers);
        console.log(scores);
        // save to firebase 
        const data = {
            scores : scores,
            answers : allAnswers
        };

        // saveToFirebase(data);
    }
})

//Go through allAnswers object and count keys
function computeScores(allAnswers){

    let scores = {
        A : 0,
        R : 0,
        V : 0,
        K : 0
    }

    for(let key in allAnswers){
        const answer = allAnswers[key];
        scores[answer.score]++;
    }

    return scores;

}


//MOCK FIREBASE SAVE : save data to firestore 
function saveToFirebase(data){
    const db = firebase.firestore();
    const collection = db.collection("answers");
    collection.add(data)
    .then(()=>{
        console.log("data saved")
    })
    .catch(()=>{
        console.log("error")
    })
}