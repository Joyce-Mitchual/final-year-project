window.onload = function () {

    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {

            document.getElementById('loadingGIF').innerHTML = '<span><img src="./images/spiner.gif" height="23px"></span>';
            document.getElementById('logSubmitBtn').disabled = true;
            window.location.replace("./dashboard/");

            return;

        }

        firebase.auth().signOut();
        window.sessionStorage.clear();

    });

    if (firebase.auth().currentUser) {
        document.getElementById('logSubmitBtn').disabled = false;
        firebase.auth().signOut();
        return;
    }

    document.getElementById('loginForm').addEventListener('submit', (e) => {

        e.preventDefault();

        document.getElementById('loadingGIF').innerHTML = '<span><img src="./images/spiner.gif" height="23px"></span>';
        document.getElementById('logSubmitBtn').disabled = true;

        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;

        firebase.auth().signInWithEmailAndPassword(email, pass).catch(function (error) {

            $('#loadingGIF').empty();
            document.getElementById('logSubmitBtn').disabled = false;

            document.getElementById('errorDiv').innerHTML =
                '<div class="alert alert-dismissible alert-danger">' +
                '<button class="close" data-dismiss="alert"></button> <small>' + error.message + '</small>' +
                '</div>';

        });

    });

};