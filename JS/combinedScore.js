function calculateCombinedScore(stageStartOverLvl, totalScore) {
  const combinedScore = stageStartOverLvl * 1e51 + totalScore;
  // for this calculation to work, totalScore (skullies) must me capped at 1e50!!!!
  return combinedScore;
}
/////////////////////////////////////////////////////
//    Test the calculation with different values   //
/////////////////////////////////////////////////////
const x = 2;
const y = 1;
const a = 1;
const b = 1e49;

const combinedScoreX = calculateCombinedScore(x, y);
const combinedScoreOpponent = calculateCombinedScore(a, b);

console.log(`Combined Score (x = ${x}, y = ${y}): ${combinedScoreX}`);
console.log(`Combined Score (a = ${a}, y = ${b}): ${combinedScoreOpponent}`);

// Check if the rule is satisfied
console.log(`Rule satisfied: ${combinedScoreX > combinedScoreOpponent}`);
