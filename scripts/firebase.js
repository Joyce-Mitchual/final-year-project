let app_fireBase = {};

(function () {

    let config = {

        apiKey: "AIzaSyDvWna73BEldJbp9uWhAi1VpeVMdbDDVOc",
        authDomain: "e-lmss.firebaseapp.com",
        databaseURL: "https://e-lmss.firebaseio.com",
        projectId: "e-lmss",
        storageBucket: "e-lmss.appspot.com",
        messagingSenderId: "333414788552",
        appId: "1:333414788552:web:443d203f33f8859384e4fd",
        measurementId: "G-J1QH4ESKBD"

    };

    firebase.initializeApp(config);
    firebase.analytics();

    app_fireBase = firebase;

})();

const fetchHouse = firebase.firestore();