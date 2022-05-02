console.log('Not working');

window.addEventListener('load', (event) => {
    console.log('In event');

    (() => {
        console.log('In firebase');

        let firebase = app_fireBase;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log(user);

                db = firebase.firestore();

                ////fetch user
                db.collection('students')
                    .doc(firebase.auth().currentUser.uid)
                    .onSnapshot((doc) => {
                        console.log('Current data: ', doc.data());

                        user_data = doc.data();
                        if (user_data) {
                            //show the user data on the dashboard
                            console.log('USER DATA', user_data);

                            //create the element


                            // find the elemeent and append the data or set the innerHTML
                            if (document.getElementById('fname')) {
                                document.getElementById('fname').innerHTML = user_data.firstName + " " + user_data.lastName
                            }


                        }

                        // }
                    });
            } else {
                window.sessionStorage.clear();
                firebase.auth().signOut();
                window.location.replace('../');
            }
        });
    })();

    if (document.getElementById('logOutBtn')) {
        document.getElementById('logOutBtn').addEventListener('click', (e) => {
            e.preventDefault();

            window.sessionStorage.clear();
            firebase.auth().signOut();
            window.location.replace('../');
        });
    }

    let studentDetails = JSON.parse(sessionStorage.getItem('studentDetails'));

    if (studentDetails && studentDetails.role === 'student') {
        if (document.getElementById('learningStyle')) {
            document.getElementById('learningStyle').style.display = 'none';
            document.getElementById('uploadResource').style.display = 'none';
        }

        document.getElementById('teacherResource').style.display = 'none';

        if (document.getElementById('teacherResults')) {
            document.getElementById('teacherResults').style.display = 'none';
        }
    }

    let teacherDetails = JSON.parse(sessionStorage.getItem('teacherDetails'));

    if (teacherDetails && teacherDetails.role === 'teacher') {
        if (document.getElementById('learningStyle')) {
            document
                .getElementById('learningStyle')
                .setAttribute('href', '../learning-style');
            document.getElementById('learningStyle').innerText = 'Learning Material';
        }

        if (document.getElementById('uploadResource')) {
            document.getElementById('uploadResource').style.display = 'block';
        }

        if (document.getElementById('teacherResults')) {
            document.getElementById('teacherResults').style.display = 'block';
        }
    }
});
