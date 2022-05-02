console.log("Not working");

window.addEventListener('load', (event) => {
    console.log("In event");

    (() => {
        console.log("In firebase")

        let firebase = app_fireBase;
        firebase.auth().onAuthStateChanged(function (user) {

            if (user) {

            } else {

                window.sessionStorage.clear();
                firebase.auth().signOut();
                window.location.replace("../");

            }

        });

    })();

    if (document.getElementById('logOutBtn')) {

        document.getElementById('logOutBtn').addEventListener('click', (e) => {

            e.preventDefault();

            window.sessionStorage.clear();
            firebase.auth().signOut();
            window.location.replace("../");

        });

    }

    let studentDetails = JSON.parse(sessionStorage.getItem('studentDetails'));

    if (studentDetails && studentDetails.role === "student") {

        if (document.getElementById('learningStyle')) {
            document.getElementById('learningStyle').style.display = "none";
            document.getElementById('uploadResource').style.display = "none";
        }

        document.getElementById('teacherResource').style.display = 'nonne';

    }

    let teacherDetails = JSON.parse(sessionStorage.getItem('teacherDetails'));

    if (teacherDetails && teacherDetails.role === "teacher") {

        if (document.getElementById('learningStyle')) {

            document.getElementById('learningStyle').setAttribute("href", "../learning-style");
            document.getElementById('learningStyle').innerText = "Learning Material";

        }

        if (document.getElementById('uploadResource')) {

            document.getElementById('uploadResource').style.display = "block";

        }

        if (document.getElementById('teacherResults')) {

            document.getElementById('teacherResults').style.display = "block";

        }

    }



});
