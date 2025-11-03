import { shuffle } from "./utils.js";

class Recommendation {
    constructor(beatmaps, playerData) {
        this.playerTopPlay = playerData.topPlay;
        this.playerSkillSet = playerData.skillSet;
        this.primaryRecommendation = this.grabRecommendations(beatmaps, playerData);
        
        this.songName = this.primaryRecommendation.songTitle;
        this.difficultyName = this.primaryRecommendation.difficultyTitle;
        this.modifiers = playerData.modifiers;
        this.difficulty = `${Math.round(this.primaryRecommendation.difficulty * 100) / 100}★`
        this.beatmapLink = `https://osu.ppy.sh/beatmapsets/${this.primaryRecommendation.setID}#osu/${this.primaryRecommendation.difficultyID}`;
    }

    // Takes the difficulty estimate and the given skillset and uses them to grab beatmap recommendations
    grabRecommendations(beatMaps, playerData) {
        let recommendations = [];

        if (playerData.skillSet === "aim")
            recommendations = this.processRecommendations(beatMaps.aimMaps, playerData.recommendedDiff, playerData.modifiers);
        else if (playerData.skillSet === "speed")
            recommendations = this.processRecommendations(beatMaps.speedMaps, playerData.recommendedDiff, playerData.modifiers);
        else if (playerData.skillSet === "stamina")
            recommendations = this.processRecommendations(beatMaps.staminaMaps, osuOplayerDatabj.recommendedDiff, playerData.modifiers);
        else if (playerData.skillSet === "hybrid")
            playerData = this.processRecommendations(beatMaps.hybridMaps, playerData.recommendedDiff, playerData.modifiers);
        else if (playerData.skillSet === "consistency")
            recommendations = this.processRecommendations(beatMaps.consistencyMaps, playerData.recommendedDiff, playerData.modifiers);
    
        if (recommendations.length == 0)
            recommendations = [{
                songTitle: "N/A",
                difficultyTitle: "N/A",
                difficulty: playerData.recommendedDiff
        }];

        shuffle(recommendations);
        return recommendations[0];
    }

    // Takes in the beatmaps of a given skill and compares them to a players recommended difficulty
    processRecommendations(beatMaps, difficultyEst, modifiers) {
        // Possible Recommendations
        const recommendations = [];

        beatMaps.forEach(beatMap => {
            let mapDifficulty = beatMap.difficulty;
            let difficultyRange = difficultyEst;

            if (modifiers.includes("HD"))
                difficultyRange -= 0.25;
            if (modifiers.includes("HR"))
                mapDifficulty *= 1.075;
            if (modifiers.includes("DT"))
                mapDifficulty *= 1.4;


            if (mapDifficulty > difficultyRange && mapDifficulty <= difficultyEst + 0.5)
                recommendations.push(beatMap)
        });

        shuffle(recommendations);
        return recommendations;
    }
}

export { Recommendation }