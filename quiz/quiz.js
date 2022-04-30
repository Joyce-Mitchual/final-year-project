//
var db;
var firebase;
window.addEventListener('load', function () {
  firebase = app_fireBase;
  firebase.auth().onAuthStateChanged((user) => {
    console.log(user);

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

          const user_data = doc.data();
          if (user_data) {
            const questionsFrame = document.querySelector(".quest");
            questionsFrame.style.display = 'block';

            const pageLoader = document.querySelector("#page-loader");
            pageLoader.style.display = 'none';

            //run loading questions
            run();
          }


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

    console.log(questions);

    //Render all questions
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      console.log(question)
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
        input.setAttribute('tag', answer.correct);
        input.setAttribute('id', 'question' + count + 'answer' + i);
        input.setAttribute('name', 'question' + count + 'answer' + count);
        // <label for="html">Find out where the shop is in relation to somewhere I know.</label><br>
        const label = document.createElement('label');
        label.innerHTML = answer.value;
        label.setAttribute('for', 'question' + count + 'answer' + i);
        label.setAttribute('id', 'question' + count + 'answer' + count);
        input.addEventListener('change', (event) => {
          console.log(event.target);

          const tag = event.target.getAttribute('tag');
          console.log(tag);
          const answer = {
            tag: tag,
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
        const score = computeScores(allAnswers);

        // save to firebase
        const data = {
          score: score,
          total: questions.length,
          answers: allAnswers,
        };

        //save data to firebase
        saveToFirebase(data);
      }
    });
  }

  //Go through allAnswers object and count keys
  function computeScores(allAnswers) {

    let score = 0;

    for (let key in allAnswers) {
      const answer = allAnswers[key];
      if (allAnswers[key].tag ==='true') {
        score++;
      }
    }

    return score;
  }



  //MOCK FIREBASE SAVE : save data to firestore
  function saveToFirebase(data) {

    // const overlay = document.querySelector('#overlay');
    // overlay.style.display = 'flex';


    // const subheading = document.querySelector('.subheading');
    // subheading.innerHTML =
    //   'You scored ' +
    //   data.score +
    //   ' out of a ' + data.total;
    console.log("Uploading pics", data)
    const ref = db.collection('students').doc(firebase.auth().currentUser.uid);
    ref
      .set(
        {
          quizes: {
            'variable' : {
             ...data
            }
          },
        },
        { merge: true })
      .then(() => {
        console.log('Document successfully written!');

        //hide the spinner
        //   const spinner = document.querySelector('#state-loader');
        //   spinner.style.display = 'none';

        //   //change the heading text
        //   const heading = document.querySelector('.heading');
        //   heading.innerHTML =
        //     'Your Results have been uploaded successfully. Click to proceed to the content page.';
      });
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
      'A ________ provides us with named storage that our programs can manipulate.',
    answers: [
      {
        value: ' data type',
        score: 'K',
        correct: false,

      },
      {
        value: 'constants',
        score: 'A',
        correct: false,
      },
      {
        value: 'operators',
        score: 'R',
        correct: false,
      },
      {
        value: 'variable',
        score: 'V',
        correct: true,
      },
    ],
  },
  {
    question: `Each variable in Java has a specific type, which determines the size and layout of the variable's memory.`,
    answers: [
      {
        value: ' TRUE',
        score: 'V',
        correct: true,
      },
      {
        value: 'FALSE',
        score: 'A',
        correct: false,
      },
      {
        value: ' Can be true or false',
        score: 'R',
        correct: false,
      },
      {
        value: 'Can not say',
        score: 'K',
        correct: false,
      },
    ],
  },
  {
    question: `To declare more than one variable of the specified type, we can use a __________ list.`,
    answers: [
      {
        value: 'colon-separated',
        score: 'K',
        correct: false,
      },
      {
        value: 'bracket-separated.',
        score: 'V',
        correct: false,
      },
      {
        value: 'comma-separated',
        score: 'R',
        correct: true,
      },
      {
        value: 'None of the above',
        score: 'A',
        correct: false,
      },
    ],
  },
  {
    question: `How many kinds of variables in Java? `,
    answers: [
      {
        value: ' 2',
        score: 'K',
        correct: false,
      },
      {
        value: '3',
        score: 'A',
        correct: true,
      },
      {
        value: '4',
        score: 'V',
        correct: false,
      },
      {
        value: '5',
        score: 'R',
        correct: false,
      },
    ],
  },
  {
    question: `Local variables are declared in?`,
    answers: [
      {
        value: 'methods',
        score: 'A',
        correct: false,
      },
      {
        value: 'constructors ',
        score: 'V',
        correct: false,
      },
      {
        value: ' blocks',
        score: 'K',
        correct: false,
      },
      {
        value: 'All of the above ',
        score: 'R',
        correct: true,
      },
    ],
  },

  {
    question: `What is true about Instance Variables in java?`,
    answers: [
      {
        value: 'Instance variables are declared in a class',
        score: 'K',
        correct: false,
      },
      {
        value: 'When a space is allocated for an object in the heap, a slot for each instance variable value is created.',
        score: 'R',
        correct: false,
      },
      {
        value: 'Instance variables can be declared in class level before or after use  ',
        score: 'V',
        correct: false,
      },
      {
        value: 'All of the above ',
        score: 'A',
        correct: true,
      },
    ],
  },

  {
    question: `Which variables have no default values?:`,
    answers: [
      {
        value: 'Static Variables',
        score: 'K',
        correct: false,
      },
      {
        value: 'Instance Variables  ',
        score: 'A',
        correct: false,
      },
      {
        value: 'Local Variable',
        score: 'V',
        correct: true,
      },
      {
        value: 'Both A and B',
        score: 'R',
        correct: false,
      },
    ],
  },

  {
    question: `Static variables can be accessed by calling with the?`,
    answers: [
      {
        value: 'Object name',
        score: 'R',
        correct: false,
      },
      {
        value: 'Class name',
        score: 'K',
        correct: true,
      },
      {
        value: 'Function name',
        score: 'A',
        correct: false,
      },
      {
        value: 'Can not say',
        score: 'V',
        correct: false,
      },
    ],
  },

  {
    question: `Which of the following is an Example of variable initialization:`,
    answers: [
      {
        value: 'int a, b, c;',
        score: 'R',
        correct: false,
      },
      {
        value: 'int a = 10, b = 10; ',
        score: 'A',
        correct: true,
      },
      {
        value: 'int 10 = a;',
        score: 'K',
        correct: false,
      },
      {
        value: 'None of the above',
        score: 'V',
        correct: false,
      },
    ],
  },

  {
    question: `Access modifiers cannot be used for local variables.:`,
    answers: [
      {
        value: 'Yes',
        score: 'K',
        correct: true,
      },
      {
        value: 'No',
        score: 'V',
        correct: false,
      },
      {
        value: 'Can be yes or no',
        score: 'R',
        correct: false,
      },
      {
        value: ' Can not say ',
        score: 'A',
        correct: false,
      },
    ],
  },
];
