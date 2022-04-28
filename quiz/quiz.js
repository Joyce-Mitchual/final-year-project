//
var db;
var firebase;
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

          const user_data = doc.data();
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

    const maxKey = pickTheLearningStyle(data.scores);

    const overlay = document.querySelector('#overlay');
    overlay.style.display = 'flex';

    const button = document.querySelector('.redirect-user');

    const subheading = document.querySelector('.subheading');
    subheading.innerHTML =
      'You are a ' +
      keyMaps[maxKey] +
      ' learner. You can go to the content page after your result is uploaded.';

    const ref = db.collection('students').doc(firebase.auth().currentUser.uid);
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

        //change the heading text
        const heading = document.querySelector('.heading');
        heading.innerHTML =
          'Your Results have been uploaded successfully. Click to proceed to the content page.';

        button.addEventListener('click', (event) => {

          if (maxKey === 'K') window.location.href = '../Kinesthetic/index.html';
          if (maxKey === 'A') window.location.href = '../Aural/index.html';
          if (maxKey === 'V') window.location.href = '../Visual/index.html';
          if (maxKey === 'R') window.location.href = '../Read/index.html';
        });
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
        correct:'variable',
        
      },
      {
        value: 'constants',
        score: 'A',
        correct:'variable',
      },
      {
        value: 'operators',
        score: 'R',
        correct:'variable',
      },
      {
        value: 'variable',
        score: 'V',
        correct:'variable',
      },
    ],
  },
  {
    question: `Each variable in Java has a specific type, which determines the size and layout of the variable's memory.`,
    answers: [
      {
        value: ' TRUE',
        score: 'V',
        correct:'TRUE',
      },
      {
        value: 'FALSE',
        score: 'A',
        correct:'TRUE',
      },
      {
        value: ' Can be true or false',
        score: 'R',
        correct:'TRUE',
      },
      {
        value: 'Can not say',
        score: 'K',
        correct:'TRUE',
      },
    ],
  },
  {
    question: `To declare more than one variable of the specified type, we can use a __________ list.`,
    answers: [
      {
        value:'colon-separated',
        score: 'K',
        correct:'comma-separated',
      },
      {
        value: 'bracket-separated.',
        score: 'V',
        correct:'comma-separated',
      },
      {
        value: 'comma-separated',
        score: 'R',
        correct:'comma-separated',
      },
      {
        value: 'None of the above',
        score: 'A',
        correct:'comma-separated',
      },
    ],
  },
  {
    question: `How many kinds of variables in Java? `,
    answers: [
      {
        value: ' 2',
        score: 'K',
        correct:'3',
      },
      {
        value: '3',
        score: 'A',
        correct:'3',
      },
      {
        value: '4',
        score: 'V',
        correct:'3',
      },
      {
        value: '5',
        score: 'R',
        correct:'3',
      },
    ],
  },
  {
    question: `Local variables are declared in?`,
    answers: [
      {
        value: 'methods',
        score: 'A',
        correct:'All of the above',
      },
      {
        value: 'constructors ',
        score: 'V',
        correct:'All of the above',
      },
      {
        value: ' blocks',
        score: 'K',
        correct:'All of the above',
      },
      {
        value: 'All of the above ',
        score: 'R',
        correct:'All of the above',
      },
    ],
  },

  {
    question: `What is true about Instance Variables in java?`,
    answers: [
      {
        value:'Instance variables are declared in a class',
        score: 'K',
        correct:'All of the above',
      },
      {
        value: 'When a space is allocated for an object in the heap, a slot for each instance variable value is created.',
        score: 'R',
        correct:'All of the above',
      },
      {
        value: 'Instance variables can be declared in class level before or after use  ',
        score: 'V',
        correct:'All of the above',
      },
      {
        value: 'All of the above ',
        score: 'A',
        correct:'All of the above',
      },
    ],
  },

  {
    question: `Which variables have no default values?:`,
    answers: [
      {
        value: 'Static Variables',
        score: 'K',
        correct:'Local Variable',
      },
      {
        value: 'Instance Variables  ',
        score: 'A',
        correct:'Local Variable',
      },
      {
        value: 'Local Variable',
        score: 'V',
        correct:'Local Variable',
      },
      {
        value: 'Both A and B',
        score: 'R',
        correct:'Local Variable',
      },
    ],
  },

  {
    question: `Static variables can be accessed by calling with the?`,
    answers: [
      {
        value: 'Object name',
        score: 'R',
        correct:'Class name',
      },
      {
        value: 'Class name',
        score: 'K',
        correct:'Class name',
      },
      {
        value: 'Function name',
        score: 'A',
        correct:'Class name',
      },
      {
        value: 'Can not say',
        score: 'V',
        correct:'Class name',
      },
    ],
  },

  {
    question: `Which of the following is an Example of variable initialization:`,
    answers: [
      {
        value: 'int a, b, c;',
        score: 'R',
        correct:'int a = 10, b = 10;',
      },
      {
        value: 'int a = 10, b = 10; ',
        score: 'A',
        correct:'int a = 10, b = 10;',
      },
      {
        value: 'int 10 = a;',
        score: 'K',
        correct:'int a = 10, b = 10;',
      },
      {
        value: 'None of the above',
        score: 'V',
        correct:'int a = 10, b = 10;',
      },
    ],
  },

  {
    question: `Access modifiers cannot be used for local variables.:`,
    answers: [
      {
        value: 'Yes',
        score: 'K',
        correct:'Yes',
      },
      {
        value: 'No',
        score: 'V',
        correct:'Yes',
      },
      {
        value: 'Can be yes or no',
        score: 'R',
        correct:'Yes',
      },
      {
        value: ' Can not say ',
        score: 'A',
        correct:'Yes',
      },
    ],
  },  
];
