
function validAccountCheck() {
    var user = firebase.auth().currentUser;
    return firebase.firestore().collection('users').doc(user.uid).set({
        'displayName': user.displayName,
        'email': user.email,
        'photoURL': user.photoURL
    }, {
        merge: true
    }).then(() => {
        return true;
    }).catch((err) => { // Not a while-listed domain
        //console.log(err);
        return false;
    });
}