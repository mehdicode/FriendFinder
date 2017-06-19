var user = require("../data/friends");


module.exports = function(app) {

    app.post("/api/survey", function(req, res) {
        var newcharacter = req.body;

        var yourMatch = findBestMatch(newcharacter);

        user.push(newcharacter);

        res.send(yourMatch);


    });

    app.get("/api/friends", function(req, res) {
        res.json(user);
    });


};


function findBestMatch(newcharacter) {

    var maxDif = 15;
    var closestMatch = [];

    for (var i = 0; i < user.length; i++) {

        var totalDif = 0;

        for (var j = 0; j < 10; j++) {
            fNum = parseInt(newcharacter.scores[j]);
            sNum = parseInt(user[i].scores[j]);
            rNum = fNum - sNum;
            totalDif += Math.abs(rNum);

        };

        if (totalDif === maxDif) {
            var match = {
                name: user[i].name,
                photoURL: user[i].photoURL
            };

            closestMatch.push(match);

        } else if (totalDif < maxDif) {

            closestMatch = [{
                name: user[i].name,
                photoURL: user[i].photoURL
            }];

            maxDif = totalDif;
        }

    };
    console.log(closestMatch);
    

    return closestMatch;

};