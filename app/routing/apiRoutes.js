var friends = require("../data/friends.js");


module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function (req, res) {

    var currUserObj = req.body;
    var currUserScores = currUserObj.scores;
    var diffArray = [];
    var bestMatch;

    //Loop over each friend in the friends array
    friends.forEach(function (eachFriend) {
        console.log(eachFriend.name);

        var totalDiff = 0;
        var scores = eachFriend.scores;
        //For each friend, we need to loop over their scores array
        scores.forEach(function (score, index) {
          // Calculate a running total of differences between the current ques rating  
          // and the new user's current question rating
          totalDiff += Math.abs(parseInt(score) - parseInt(currUserScores[index]))
          
        });

      // push each friend's total diff (as compared to the new user) to an array
      
      diffArray.push(totalDiff);
      console.log(diffArray);

    });
    // save to a variable the index of the smallest diff in the diffArray
    var index = diffArray.indexOf(Math.min.apply(null, diffArray));
    // since each friend should have the same index in the diff array and in the friends array:
    bestMatch = friends[index];
    console.log(bestMatch);

    res.json(bestMatch);
    
    friends.push(currUserObj);

  });
};