// Fetch beatmaps using an asynchronous function.
const fetchJsonData = async function() {
    // This is now storing every single ranked map from 2015 -> 2025
    // See code/rules for defining given maps -> https://github.com/potasium2/Osu-Beatmap-Retriever
    const response = await fetch("./beatmaps.json");
    const jsonData = await response.json();

    return jsonData;
}

// Quick shuffle function: https://stackoverflow.com/a/2450976/21732439
const shuffle = function(arr) {
    let current = arr.length;

    while(current != 0) {
        let random = Math.floor(Math.random() * current);
        current--;

        [arr[current], arr[random]] = [arr[random], arr[current]];
    }

    return arr;
}

export { fetchJsonData, shuffle }