function cRatingSum() {
    var x = document.getElementById("challengeRatingList");
    var ratingSum = 0;
    var i;
    for (i = 0; i < x.length; i++) {
        ratingSum += Number(x.elements[i].value);
        //console.log(ratingSum)
    }
    var total = document.getElementById("challengeRatingSum");
    total.value = ratingSum;

};

//use this loop for adding together monster CRs
// users can add more forms with a button - then adds all cr's
// can add value directly to the CR total form
// work on updating oninput event