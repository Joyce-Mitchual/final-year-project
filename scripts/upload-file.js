window.onload = function () {

    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {

            document.getElementById('fileUploadForm').addEventListener('submit', (e) => {

                e.preventDefault();

                const ref = firebase.storage().ref();
                let compDoc = document.getElementById("fileToUpload").files[0];
                const name = (+new Date()) + '-' + compDoc.name;

                const metadata = {
                    contentType: compDoc.type
                };

                const task = ref.child(name).put(compDoc, metadata);
                task.then(snapshot => snapshot.ref.getDownloadURL()).then((url) => {

                    let httpsReference = firebase.storage().refFromURL(url);
                    const profileImageFileName = httpsReference.name;

                    firebase.firestore().collection('teacher').where("email", "==", user.email).get().then((querySnapshot) => {
                        const teacherID = querySnapshot.docs[0].id;
                        firebase.firestore().collection('teacher').doc(teacherID).collection('files').add({
                            profileImageURL: url,
                            profileImageFileName: profileImageFileName
                        });
                    });


                }).then(() => {
                    console.log('done');
                }).catch((error) => {

                    document.getElementById('fileUploadButton').disabled = false;
                    document.getElementById('fileUploadErrorDiv').innerHTML =
                        '<div class="alert alert-dismissible alert-danger">' +
                        '<button class="close" data-dismiss="alert"></button><br> ' + error +
                        '</div>';

                    return;

                });

            });

        }

    });

};