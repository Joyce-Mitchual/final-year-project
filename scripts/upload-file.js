window.onload = function () {

    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {

            document.getElementById('fileUploadForm').addEventListener('submit', (e) => {

                e.preventDefault();

                document.getElementById('fileUploadErrorDiv').innerHTML =
                    '<div class="alert alert-dismissible alert-danger">' +
                    '<button class="close" data-dismiss="alert"></button><br> uploading...' +
                    '</div>';

                let materialType = document.getElementById('materialType').value;

                if (materialType === 'visual') {

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
                                profileImageFileName: profileImageFileName,
                                type: 'visual'
                            }).then(() => {
                                document.getElementById('fileUploadErrorDiv').innerHTML = 'file uploaded, please wait...';
                                setTimeout(() => {
                                    window.location.reload();
                                }, 3000);
                            });
                        });


                    }).catch((error) => {

                        document.getElementById('filebutton').disabled = false;
                        document.getElementById('fileUploadErrorDiv').innerHTML =
                            '<div class="alert alert-dismissible alert-danger">' +
                            '<button class="close" data-dismiss="alert"></button><br> ' + error +
                            '</div>';

                        return;

                    });

                    return;

                }

                if (materialType === 'aural') {

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
                                profileImageFileName: profileImageFileName,
                                type: 'aural'
                            }).then(() => {
                                document.getElementById('fileUploadErrorDiv').innerHTML = 'file uploaded, please wait...';
                                setTimeout(() => {
                                    window.location.reload();
                                }, 3000);
                            });
                        });


                    }).catch((error) => {

                        document.getElementById('filebutton').disabled = false;
                        document.getElementById('fileUploadErrorDiv').innerHTML =
                            '<div class="alert alert-dismissible alert-danger">' +
                            '<button class="close" data-dismiss="alert"></button><br> ' + error +
                            '</div>';

                        return;

                    });

                    return;

                }


                if (materialType === 'read-write') {

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
                                profileImageFileName: profileImageFileName,
                                type: 'read-write'
                            }).then(() => {
                                document.getElementById('fileUploadErrorDiv').innerHTML = 'file uploaded, please wait...';
                                setTimeout(() => {
                                    window.location.reload();
                                }, 3000);
                            });
                        });


                    }).catch((error) => {

                        document.getElementById('filebutton').disabled = false;
                        document.getElementById('fileUploadErrorDiv').innerHTML =
                            '<div class="alert alert-dismissible alert-danger">' +
                            '<button class="close" data-dismiss="alert"></button><br> ' + error +
                            '</div>';

                        return;

                    });

                    return;

                }


                if (materialType === 'kinesthetic') {

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
                                profileImageFileName: profileImageFileName,
                                type: 'kinesthetic'
                            }).then(() => {
                                document.getElementById('fileUploadErrorDiv').innerHTML = 'file uploaded, please wait...';
                                setTimeout(() => {
                                    window.location.reload();
                                }, 3000);
                            });
                        });


                    }).catch((error) => {

                        document.getElementById('filebutton').disabled = false;
                        document.getElementById('fileUploadErrorDiv').innerHTML =
                            '<div class="alert alert-dismissible alert-danger">' +
                            '<button class="close" data-dismiss="alert"></button><br> ' + error +
                            '</div>';

                        return;

                    });

                    return;

                }

            });

        }

    });

};