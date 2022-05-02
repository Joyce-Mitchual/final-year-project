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
                .onSnapshot((querySnapshot) => {
                    showFrame()
                    querySnapshot.forEach((doc) => {
                        console.log("Current data: ", doc.data());
                        // cities.push(doc.data().name);
                        buildTable(doc.data())
                    });

                    // const user_data = doc.data();
                    // if (user_data?.questionnaireState) {
                    // const maxKey = pickTheLearningStyle(user_data.results.scores);

                    // if (maxKey === 'K')
                    //   window.location.href = '../Kinesthetic/index.html';
                    // if (maxKey === 'A') window.location.href = '../Aural/index.html';
                    // if (maxKey === 'V') window.location.href = '../Visual/index.html';
                    // if (maxKey === 'R') window.location.href = '../Read/index.html';
                    // }else{


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



});


function run() { }
function showFrame() {
    const frame = document.querySelector(".main-container");
    frame.style.display = 'block';

    const pageLoader = document.querySelector("#page-loader");
    pageLoader.style.display = 'none';

}

function buildTable(data) {
    //create a table row and add email and password as table data
    const tableRow = document.createElement('tr');
    const tableDataEmail = document.createElement('td');
    tableDataEmail.innerHTML = data.email;

    const tableDataPassword = document.createElement('td');
    if (data.quizes) {

        const result = Object.keys(data.quizes).reduce((prev, current) => {
            console.log(prev, current)
            const res = prev + " <br> <br>  " + current + " - " + data.quizes[current].score + " out of " + data.quizes[current].total;
            return res;
        }, "");

        tableDataPassword.innerHTML = result;

    } else {
        tableDataPassword.innerHTML = "No Quiz"
    }
    tableRow.appendChild(tableDataEmail);
    tableRow.appendChild(tableDataPassword);

    //add the table row to the table body
    const container = document.querySelector("#customers");
    container.appendChild(tableRow)
}