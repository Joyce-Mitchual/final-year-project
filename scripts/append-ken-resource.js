window.onload = function () {

    const teacherDeatils = JSON.parse(sessionStorage.getItem('teacherDetails'));
    firebase.firestore().collection('teacher').where("teacherID", "==", teacherDeatils.teacherID).get().then((querySnapshot) => {

        querySnapshot.forEach(doc => {

            let teacherDetails = doc.data();
            let teacherDocID = doc.id;

            firebase.firestore().collection('teacher').doc(teacherDocID).collection('files').get().then((queryFilesSnapshot) => {

                queryFilesSnapshot.forEach(doc => {

                    if (doc.data().type === 'kinesthetic') {

                        let objectEle = document.createElement('object');
                        objectEle.height = '400px';
                        objectEle.width = '100%';

                        objectEle.setAttribute('data', doc.data().profileImageURL);
                        let separator = document.createElement('div');
                        separator.innerHTML = '<div>&nbsp;</div>';
                        document.getElementById('appendResource').append(separator, objectEle);

                    }

                });

            });


        });

    });


};