// So I can move all the difficulty calculation stuff in here.
class OsuPlayer {
    constructor(topPlay, skillSet, modifiers) {
        this.topPlay = topPlay; // int
        this.skillSet = skillSet; // string array <- Guy who initially thought saving modifiers as "HDDT" over ["HD", "DT"] would be easier
        this.modifiers = modifiers; // string array

        this.calculateRecommendedDifficulty();
    }

    calculateRecommendedDifficulty() {
        let difficultyEst = 0.97 * Math.pow(this.topPlay, 0.32)
        console.log(difficultyEst);

        // For any Osu! player that may use this, here are my justifactions for these being "High Accuracy Relevant":
        // High Difficulty Aim scores usually have high accuracy, even with 3mod (Notice: Mrekk => https://osu.ppy.sh/scores/4329744324, https://osu.ppy.sh/scores/1267337687)
        // Hard Rock is generally used in order to push maps with higher OD's (How difficult accuracy is to achieve), so generally you should already have good accuracy
        if (difficultyEst > 7 && this.skillSet === 'aim' || this.modifiers.includes('HR'))
            difficultyEst -= 0.25;
        
        console.log(difficultyEst);
        this.recommendedDiff = Math.round(difficultyEst * 100) / 100;
    }
}

export { OsuPlayer }