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

};