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
    console.log(studentDetails)

    if (studentDetails && studentDetails.role === "student") {
        document.getElementById('learningStyle').style.display = "none";
    }

    let teacherDetails = JSON.parse(sessionStorage.getItem('teacherDetails'));
    console.log(teacherDetails)

    if (teacherDetails && teacherDetails.role === "teacher") {

        document.getElementById('learningStyle').setAttribute("href", "../learning-style");
        document.getElementById('learningStyle').innerText = "Learning Material";


        document.getElementById('drop').innerText = "Upload Resources";
    }



});
