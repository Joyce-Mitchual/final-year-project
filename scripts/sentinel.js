window.onload = function () {

    (function () {

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
    if(studentDetails && studentDetails.role === "student"){
        document.getElementById('learningStyle').style.display = "none";
    }

    let teacherDetails = JSON.parse(sessionStorage.getItem('teacherDetails'));
    if(teacherDetails && teacherDetails.role === "teacher"){
        
        document.getElementById('learningStyle').setAttribute("href", "../learning-style");
        document.getElementById('learningStyle').innerText = "Learning Material";
    }

};