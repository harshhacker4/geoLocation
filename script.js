let CURRENT_LOCATION = null;
let A = null, B= null;
function main(){
    let geoLocation = null;

    if(window.navigator && window.navigator.geolocation){
        geoLocation = window.navigator.geolocation;
    }
    if(geoLocation){
        geoLocation.watchPosition(onLocationUpdate, onError, {
            enableHighAccuracy: true,
            maximumAge: 1000
        })
    }else{
        alert("Location cant be fetched!");
    }
}

function onLocationUpdate(event){
    CURRENT_LOCATION = event.coords;
    document.getElementById("loc").innerHTML = "Your location:<br>Lat: "+CURRENT_LOCATION.latitude+"<br> Lon: "+CURRENT_LOCATION.longitude;
}

function onError(err){
    alert("Location cant be fetched2!"+ err);
}

function setA(){
    A = CURRENT_LOCATION;
    updateInfo();
}

function setB(){
    B = CURRENT_LOCATION;
    updateInfo();
}

function updateInfo(){
    if(A!=null){
        document.getElementById("a").innerHTML = A.latitude + "<br>" + A.longitude;
    }

    if(B!=null){
        document.getElementById("b").innerHTML = B.latitude + "<br>" + B.longitude;
    }

    if(A!=null && B!=null){
        let dist = getD(A, B);
        document.getElementById("info").innerHTML = "distanc: "+ dist+ " meters";
    }
}

function latlonToXYZ(latlon, r){
    const xyz = {x:0, y:0, z:0}

    xyz.y = Math.sin(dtr(latlon.latitude))*r
    const R = Math.cos(dtr(latlon.latitude))*r
    xyz.x = Math.sin(dtr(latlon.longitude))*R
    xyz.z = Math.cos(dtr(latlon.longitude))*R

    return xyz
}

function dtr(degree){
    return degree * Math.PI/180;
}

function getD(latlon1, latlon2){
    const R = 6371000;
    const xyz1 = latlonToXYZ(latlon1, R)
    const xyz2= latlonToXYZ(latlon2, R)
    const eucl = euclidean(xyz1, xyz2)

    return eucl;
}

function euclidean(p1, p2){
    return Math.sqrt((p1.x - p2.x)*(p1.x- p2.x) + 
                     (p1.y - p2.y)*(p1.y- p2.y) +
                     (p1.z - p2.z)*(p1.z- p2.z))
}