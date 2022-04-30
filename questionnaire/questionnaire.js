//
var db;
var firebase;
var user_data;
window.addEventListener('load', function () {
  firebase = app_fireBase;
  firebase.auth().onAuthStateChanged((user) => {
    // console.log(user);

    if (user) {
      db = firebase.firestore();


      firebase
        .auth()
        .currentUser.getIdToken()
        .then((idToken) => {
          console.log(idToken);
          // idToken can be passed back to server.
        })
        .catch((error) => {
          console.log(error);
          // Error occurred.
        });

      ////fetch user
      db.collection('students')
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((doc) => {
          console.log('Current data: ', doc.data());

          user_data = doc.data();
          if (user_data.questionnaireState) {
            handleTestAgain();
            console.log("Taken old test")

          } else {
            console.log("Taken new test")


          }
          // if (user_data?.questionnaireState) {
          // const maxKey = pickTheLearningStyle(user_data.results.scores);

          // if (maxKey === 'K')
          //   window.location.href = '../Kinesthetic/index.html';
          // if (maxKey === 'A') window.location.href = '../Aural/index.html';
          // if (maxKey === 'V') window.location.href = '../Visual/index.html';
          // if (maxKey === 'R') window.location.href = '../Read/index.html';
          // }else{

          const questionsFrame = document.querySelector(".quest");
          questionsFrame.style.display = 'block';

          const pageLoader = document.querySelector("#page-loader");
          pageLoader.style.display = 'none';
          //run loading questions
          run();
          // }
        });
    } else {
      window.sessionStorage.clear();
      firebase.auth().signOut();
      window.location.replace('../');
    }
  });

  function run() {
    const allAnswers = {};

    //Render all questions
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const _question = createQuestion(i, question);
      const container = document.querySelector('#questions-forms');
      // console.log(container);
      container.appendChild(_question);
    }

    //Creates a single question
    function createQuestion(count, data) {
      const container = document.createElement('section');
      const title = document.createElement('p');
      title.innerHTML = count + 1 + '. ' + data.question;
      container.appendChild(title);

      for (let i = 0; i < data.answers.length; i++) {
        const answer = data.answers[i];
        // <input type="radio" id="html" name="fav_language" value="HTML">
        const _main = document.createElement('div');
        const input = document.createElement('input');
        input.type = 'radio';
        input.value = answer.value;
        input.setAttribute('score', answer.score);
        input.setAttribute('id', 'question' + count + 'answer' + i);
        input.setAttribute('name', 'question' + count + 'answer' + count);
        // <label for="html">Find out where the shop is in relation to somewhere I know.</label><br>
        const label = document.createElement('label');
        label.innerHTML = answer.value;
        label.setAttribute('for', 'question' + count + 'answer' + i);
        label.setAttribute('id', 'question' + count + 'answer' + count);
        input.addEventListener('change', (event) => {
          console.log(event.target);

          const score = event.target.getAttribute('score');
          console.log(score);
          const answer = {
            score: score,
            question: data.question,
            answer: event.target.value,
          };

          allAnswers['' + (count + 1)] = answer;

          console.log(allAnswers);
        });

        _main.appendChild(input);
        _main.appendChild(label);
        container.appendChild(_main);
      }

      return container;
    }

    //submitting a button
    const button = document.querySelector('#submit');
    button.addEventListener('click', (event) => {
      event.preventDefault();
      // console.log(allAnswers);

      const keysCount = Object.keys(allAnswers).length;

      if (keysCount !== questions.length) {
        alert('You have to complete the questionnaire');
      } else {
        //computer the score
        const scores = computeScores(allAnswers);

        // save to firebase
        const data = {
          scores: scores,
          answers: allAnswers,
        };

        //save data to firebase
        saveToFirebase(data);
      }
    });
  }

  //Go through allAnswers object and count keys
  function computeScores(allAnswers) {
    let scores = {
      A: 0,
      R: 0,
      V: 0,
      K: 0,
    };

    for (let key in allAnswers) {
      const answer = allAnswers[key];
      scores[answer.score]++;
    }

    return scores;
  }

  function pickTheLearningStyle(scores) {
    let max = -Infinity;
    let maxKey = '';

    Object.keys(scores).forEach((key) => {
      if (scores[key] > max) {
        max = scores[key];
        maxKey = key;
      }
    });

    return maxKey;
  }

  //MOCK FIREBASE SAVE : save data to firestore
  function saveToFirebase(data) {
    hideoverlayFrame()
    const maxKey = pickTheLearningStyle(data.scores);

    const overlay = document.querySelector('#overlay');
    overlay.style.display = 'flex';

    const completeFrame = document.querySelector('.completed-test');
    completeFrame.style.display = 'block';


    const button = document.querySelector('.redirect-user');

    const subheading = document.querySelector('.subheading');
    subheading.innerHTML =
      'You are a ' +
      keyMaps[maxKey] +
      ' learner. You can go to the content page after your result is uploaded.';

    const ref = db.collection('students').doc(firebase.auth().currentUser.uid);

    // -------------------------------------------------------------------------------------
    const promptFrame = document.querySelector('.prompt-test');
    promptFrame.style.display = 'none';
    // -------------------------------------------------------------------------------------

    ref
      .set(
        {
          questionnaireState: true,
          results: data,
        },
        { merge: true }
      )
      .then(() => {
        console.log('Document successfully written!');

        button.style.display = 'block';
        //hide the spinner
        const spinner = document.querySelector('#state-loader');
        spinner.style.display = 'none';


        // -------------------------------------------------------------------------------------
        // hide the hey toggler
        const promptFrame = document.querySelector('.prompt-test');
        promptFrame.style.display = 'none';
        // -------------------------------------------------------------------------------------

        //change the heading text
        const heading = document.querySelector('.heading');
        heading.innerHTML =
          'Your Results have been uploaded successfully.<br> Click to proceed to the content page.';

        button.addEventListener('click', (event) => {
          console.log('clicked');
          if (maxKey === 'K') window.location.href = '../Kinesthetic/index.html';
          if (maxKey === 'A') window.location.href = '../Aural/index.html';
          if (maxKey === 'V') window.location.href = '../Visual/index.html';
          if (maxKey === 'R') window.location.href = '../Read/index.html';
        });
      });


    const _promptFrame = document.querySelector('.prompt-test');
    console.log(_promptFrame);
    _promptFrame.style.display = 'none';

  }


  function handleTestAgain() {
    const overlayframe = document.querySelector('#overlay');
    overlayframe.style.display = 'flex';

    const testTakenFrame = document.querySelector('.prompt-test');
    testTakenFrame.style.display = 'block';


    const maxKey = pickTheLearningStyle(user_data.results.scores);

    const subheading = document.querySelector('.prompt-test .subheading');
    subheading.innerHTML = 'You are a ' +
      keyMaps[maxKey] +
      ' learner. You can go to the content page after your result is uploaded.';


    const button1 = document.querySelector('.test-again');
    button1.addEventListener('click', (event) => {
      hideoverlayFrame();

    });


    const button2 = document.querySelector('.redirect');
    button2.addEventListener('click', (event) => {
      console.log("Clicked")
      if (user_data?.questionnaireState) {
        const maxKey = pickTheLearningStyle(user_data.results.scores);
        console.log(user_data)
          if (maxKey === 'K') window.location.href = '../Kinesthetic/index.html';
          if (maxKey === 'A') window.location.href = '../Aural/index.html';
          if (maxKey === 'V') window.location.href = '../Visual/index.html';
          if (maxKey === 'R') window.location.href = '../Read/index.html';
        
      }
    });

  }

  function showoverlayFrame() { }

  function hideoverlayFrame() {
    const overlayframe = document.querySelector('#overlay');
    overlayframe.style.display = 'none';

    const promptFrame = document.querySelector('.prompt-test');
    promptFrame.style.display = 'none';
  }

});

//todo all questions to the list
var keyMaps = {
  A: 'Aural',
  K: 'Kinesthetic',
  V: 'Visual',
  R: 'Read or Write',
};

var questions = [
  {
    question:
      'I need to find the way to a shop that a friend has recommended. I would:',
    answers: [
      {
        value: 'Find out where the shop is in relation to somewhere I know.',
        score: 'K',

      },
      {
        value: 'Ask my friend to tell me the directions',
        score: 'A',
      },
      {
        value: 'Write down the street directions I need to remember',
        score: 'R',
      },
      {
        value: 'Use a map.',
        score: 'V',
      },
    ],
  },
  {
    question: `A website has a video showing how to make a special graph or chart.There is a person speaking,some
lists and words describing what to do and some diagrams. I would learn most from:`,
    answers: [
      {
        value: ' Find out where the shop is in relation to somewhere I know.',
        score: 'V',
      },
      {
        value: ' Ask my friend to tell me the directions',
        score: 'A',
      },
      {
        value: ' Write down the street directions I need to remember',
        score: 'R',
      },
      {
        value: 'Use a map.',
        score: 'K',
      },
    ],
  },
  {
    question: `I want to find out more about a tour that I am going on. I would:`,
    answers: [
      {
        value:
          'Look at details about the highlights and activities on the tour',
        score: 'K',
      },
      {
        value: 'Use a map and see where the places are.',
        score: 'V',
      },
      {
        value: 'Read about the tour on the itinerary.',
        score: 'R',
      },
      {
        value: 'Using words well in written communications.',
        score: 'A',
      },
    ],
  },
  {
    question: `When choosing a career or area of study, these are important for me:`,
    answers: [
      {
        value: ' Applying my knowledge in real situations.',
        score: 'K',
      },
      {
        value: 'Communicating with others through discussion.',
        score: 'A',
      },
      {
        value: 'Working with designs, maps or charts.',
        score: 'V',
      },
      {
        value: 'Using words well in written communications.',
        score: 'R',
      },
    ],
  },
  {
    question: `When I am learning I:`,
    answers: [
      {
        value: 'like to talk things through.',
        score: 'A',
      },
      {
        value: 'see patterns in things.',
        score: 'V',
      },
      {
        value: 'use examples and applications.',
        score: 'K',
      },
      {
        value: 'read books, articles and handouts.',
        score: 'R',
      },
    ],
  },

  {
    question: `I want to save more money and to decide between a range of options. I would:`,
    answers: [
      {
        value:
          'Consider examples of each option using my financial information.',
        score: 'K',
      },
      {
        value: 'Read a print brochure that describes the options in detail.',
        score: 'R',
      },
      {
        value:
          'Use graphs showing different options for different time periods. ',
        score: 'V',
      },
      {
        value: 'Talk with an expert about the options. ',
        score: 'A',
      },
    ],
  },

  {
    question: `I want to learn how to play a new board game or card game. I would:`,
    answers: [
      {
        value: 'Watch others play the game before joining in.',
        score: 'K',
      },
      {
        value: 'Listen to somebody explaining it and ask questions ',
        score: 'A',
      },
      {
        value:
          'Use the diagrams that explain the various stages, moves and strategies in the game ',
        score: 'V',
      },
      {
        value: 'Read the instructions. ',
        score: 'R',
      },
    ],
  },

  {
    question: `I have a problem with my heart. I would prefer that the doctor:`,
    answers: [
      {
        value: 'Gave me something to read to explain what was wrong.',
        score: 'R',
      },
      {
        value: 'Used a plastic model to show me what was wrong. ',
        score: 'K',
      },
      {
        value: 'Described what was wrong.  ',
        score: 'A',
      },
      {
        value: 'Showed me a diagram of what was wrong.  ',
        score: 'V',
      },
    ],
  },

  {
    question: `I want to learn to do something new on a computer. I would:`,
    answers: [
      {
        value: 'Read the written instructions that came with the program.',
        score: 'R',
      },
      {
        value: 'Talk with people who know about the program. ',
        score: 'A',
      },
      {
        value: 'Start using it and learn by trial and error.  ',
        score: 'K',
      },
      {
        value: 'Follow the diagrams in a book.  ',
        score: 'V',
      },
    ],
  },

  {
    question: `When learning from the Internet I like:`,
    answers: [
      {
        value: 'Videos showing how to do or make things',
        score: 'K',
      },
      {
        value: 'Interesting design and visual features. ',
        score: 'V',
      },
      {
        value: 'Interesting written descriptions, lists and explanations.',
        score: 'R',
      },
      {
        value: 'Audio channels where I can listen to podcasts or interviews.',
        score: 'A',
      },
    ],
  },

  {
    question: `I want to learn about a new project. I would ask for:`,
    answers: [
      {
        value:
          'Diagrams to show the project stages with charts of benefits and costs.',
        score: 'V',
      },
      {
        value: 'A written report describing the main features of the project ',
        score: 'R',
      },
      {
        value: 'An opportunity to discuss the project',
        score: 'A',
      },
      {
        value: 'Examples where the project has been used successfully ',
        score: 'K',
      },
    ],
  },

  {
    question: `I want to learn how to take better photos. I would:`,
    answers: [
      {
        value: 'Ask questions and talk about the camera and its features. ',
        score: 'A',
      },
      {
        value: 'Use the written instructions about what to do. ',
        score: 'R',
      },
      {
        value: 'Use diagrams showing the camera and what each part does ',
        score: 'V',
      },
      {
        value:
          'Use examples of good and poor photos showing how to improve them. ',
        score: 'K',
      },
    ],
  },

  {
    question: `I prefer a presenter or a teacher who uses:`,
    answers: [
      {
        value: 'Demonstrations, models or practical sessions. ',
        score: 'K',
      },
      {
        value:
          'Question and answer, talk, group discussion, or guest speakers ',
        score: 'A',
      },
      {
        value: 'Handouts, books, or readings. ',
        score: 'R',
      },
      {
        value: 'Diagrams, charts, maps or graphs ',
        score: 'V',
      },
    ],
  },

  {
    question: `I have finished a competition or test and I would like some feedback. I would like to have feedback`,
    answers: [
      {
        value: 'Using examples from what I have done ',
        score: 'K',
      },
      {
        value: 'Using a written description of my results. ',
        score: 'R',
      },
      {
        value: 'From somebody who talks it through with me.',
        score: 'A',
      },
      {
        value: 'Using graphs showing what I achieved.   ',
        score: 'V',
      },
    ],
  },

  {
    question: `I want to find out about a house or an apartment. Before visiting it I would want:`,
    answers: [
      {
        value: 'To view a video of the property. ',
        score: 'K',
      },
      {
        value: 'A discussion with the owner ',
        score: 'A',
      },
      {
        value: 'A printed description of the rooms and features.',
        score: 'R',
      },
      {
        value: 'A plan showing the rooms and a map of the area.',
        score: 'V',
      },
    ],
  },

  {
    question: `I want to assemble a wooden table that came in parts (kitset). I would learn best from:`,
    answers: [
      {
        value: 'Diagrams showing each stage of the assembly. ',
        score: 'V',
      },
      {
        value: 'Advice from someone who has done it before. ',
        score: 'A',
      },
      {
        value: 'Written instructions that came with the parts for the table.',
        score: 'R',
      },
      {
        value: 'Watching a video of a person assembling a similar table.',
        score: 'K',
      },
    ],
  },
];

