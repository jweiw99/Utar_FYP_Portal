var defaultpage = "profile";

function initApp(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if(user.email.split('@')[1] == '1utar.my'){
                if(getPagename()!="page.html"){
                    if(typeof(Storage)!=="undefined") sessionStorage.clear();
                    window.location.href = "page.html";
                }
            }else if(user.email.split('@')[1] == 'utar.edu.my'){
                defaultpage = "lec-profile";
                if(getPagename()!="lec-page.html"){
                    if(typeof(Storage)!=="undefined") sessionStorage.clear();
                    window.location.href = "lec-page.html";
                }
            }else{
                if(typeof(Storage)!=="undefined") sessionStorage.clear();
                firebase.auth().signOut();
            }
        }else{
            window.location.href = "login.html";
        }

        var username = user.displayName==null?"User":user.displayName;
        var photo = user.photoURL==null?"https://i.imgur.com/oW1dGDI.jpg":user.photoURL;
        $("#usernamebar").text(username);
        $("#userprofilepic").attr("src",photo);
        
        if(user.displayName == null || user.photoURL == null){
            sessionPage(defaultpage);
        }else{
            if(typeof(Storage)!=="undefined"){
                var nav_active = sessionStorage.getItem("lastvisit");
                if(nav_active){
                    sessionPage(nav_active);
                }else{
                    sessionPage(defaultpage);
                }
            }else{
                sessionPage(defaultpage);
            }
        }
    });
}

function getPagename() {
    var loc = window.location.pathname;
    var pathName = loc.substring(loc.lastIndexOf('/') + 1);
    return pathName;
}

function sessionPage(file){
    var user = firebase.auth().currentUser;
    var nav_active = file;
    if(!(user.displayName == null || user.photoURL == null)){
        if(typeof(Storage)!=="undefined"){
            nav_active = sessionStorage.getItem("lastvisit");
            if(!nav_active){
                nav_active = file;
            }
            sessionStorage.setItem("lastvisit",file);
        }
    }else if(file!=defaultpage){
        alert("Please Fill Up Your Information First.");
        file = defaultpage;
    }
    $('#'+nav_active).removeClass('active');
    $('#'+file).addClass('active');
    file = file + ".html";

    includeHTML(file);
}

function includeHTML(file) {
    $('#include-html').attr("src",file);
}