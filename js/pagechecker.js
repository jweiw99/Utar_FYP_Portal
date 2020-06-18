
function pagechecker(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if(user.email.split('@')[1] != 'utar.edu.my'){
                if(getPagename()=="lec-"){
                    if(typeof(Storage)!=="undefined") sessionStorage.clear();
                    firebase.auth().signOut();
                }
            }
        }else{
            window.location.href = "login.html";
        }
    });
}

function getPagename() {
    var loc = window.location.pathname;
    var pathName = loc.substring(loc.lastIndexOf('/') + 1);
    pathName = pathName.substring(0,4);
    return pathName;
}