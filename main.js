import { FORM } from "./globals.js";
import { saveRecommendations, recommendations } from "./storage.js";
import { OsuPlayer } from "./osuPlayer.js";
import { Recommendation } from "./recommend.js";
import { fetchJsonData } from "./utils.js";
import { renderTable } from "./render.js"

function validityCheck() {
    let validation = true;
    if (FORM.topPlay.value < 1 || FORM.topPlay.value > 1500) { // It should be virtually impossible to set a score worth less than 1pp since default pp values are clamped
        validation = false;

        const topPlayError = document.getElementById("topPlayError");
        topPlayError.innerHTML = `${FORM.topPlay.value} is not a valid value, please enter a value ${FORM.topPlay.value < 1 ? `greater than 1` : `less than 1000`}`;

        setTimeout(() => {
            topPlayError.innerHTML = '';
        }, 2500);
    } if (FORM.skillSet.value === "") { // Check if a skill set is selected
        validation = false;

        const topPlayError = document.getElementById("skillSetError");
        topPlayError.innerHTML = `A Skill set is required in order to continue.`;

        setTimeout(() => {
            topPlayError.innerHTML = '';
        }, 2500);
    }
    
    return validation;
}

renderTable(recommendations);

FORM.addEventListener('submit', async e => {
    e.preventDefault();

    if (validityCheck()) {
        const beatmaps = await fetchJsonData();

        // Add Selected Modifiers
        const modifiers = [];
        if (FORM.hidden.checked)
            modifiers.push("HD")
        if (FORM.hardrock.checked)
            modifiers.push("HR")
        if (FORM.doubletime.checked)
            modifiers.push("DT")

        const osuPlayer = new OsuPlayer(FORM.topPlay.value, FORM.skillSet.value, modifiers);
        const recommendation = new Recommendation(beatmaps, osuPlayer);

        recommendations.push(recommendation);
        saveRecommendations(recommendations);

        renderTable(recommendations);
        FORM.reset()
    }
});