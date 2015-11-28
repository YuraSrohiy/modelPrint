MP = {};

MP.notify = function(text, time){
    $(".toast").hide();
    if(time){
        Materialize.toast(text, time);
    } else {
        Materialize.toast(text, 4000);
    }
}