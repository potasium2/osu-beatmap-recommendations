function saveRecommendations(recommendations) {
    const serializedArray = JSON.stringify(recommendations);
    localStorage.setItem("osu", serializedArray);
}

function loadPlayerData() {
    const serializedArray = localStorage.getItem("osu");

    if (serializedArray !== null)
        return JSON.parse(serializedArray);
    else
        return [];
}

const recommendations = loadPlayerData();

export { saveRecommendations, recommendations };