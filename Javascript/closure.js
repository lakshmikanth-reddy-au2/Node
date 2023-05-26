function a() {
    var x=10;
    function b() {
        console.log(b)
    }
    return b;
}

var c = a();
c();