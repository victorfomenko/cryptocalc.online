/**
 * @param  {Network difficulty} difficulty
 * @param  {Hash power hash/s} hash
 * @param  {Time in seconds} time
 * @param  {Reward in number of blocks} blockReward=1
 */
export const calcMiningReward = (difficulty, hash, time, blockReward=1) => {
    // return number of coins you will get
    return (hash * time * blockReward) / difficulty;
};