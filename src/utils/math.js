/**
 * @param  {Network difficulty} difficulty
 * @param  {Hash power hash/s} hash
 * @param  {Time in seconds} time
 * @param  {Reward in number of blocks} blockReward=1
 * @param  {Pool fee in percents} poolFee=0
 */
const calcMiningReward = (
  difficulty,
  hash,
  time,
  blockReward = 1,
  poolFee = 0,
) => {
  // return number of coins you will get
  let reward = hash * time * blockReward / difficulty;
  if (poolFee) {
    const poolFeeCost = reward / 100 * poolFee;
    reward -= poolFeeCost;
  }
  return reward;
};

export default calcMiningReward;
