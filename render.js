import { FORM, TABLE } from "./globals.js";
import { saveRecommendations } from "./storage.js";

function createTableHead() {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const headingTextArray = ["Song Name", "Difficulty Name", "Modifiers", "Beatmap Difficulty", "Map Link", "Actions"];

    headingTextArray.forEach(function(text) {
        const th = document.createElement("th");
        th.textContent = text;
        tr.appendChild(th);
    });

    thead.appendChild(tr);
    table.appendChild(thead);

    return table;
}

function createTableBody(recommendations) {
    const tableBody = document.createElement("tbody");

    recommendations.forEach((recommendation, index) => {
        const tr = document.createElement("tr");

        for (const [key, value] of Object.entries(recommendation)) {
            console.log(`key: ${key}, value: ${value}`);

            if (key == "beatmapLink") {
                const td = document.createElement("td");
                const externalTag = document.createElement("a"); // Setup a link to the beatmap listing

                externalTag.textContent = 'Link to Beatmap';
                externalTag.setAttribute("target", "_blank"); // Make link open in new tab
                externalTag.setAttribute("href", recommendation.beatmapLink); // Actually link the beatmap

                td.appendChild(externalTag);
                tr.appendChild(td);
            }
            else if (key !== "primaryRecommendation" && key !== "playerTopPlay" && key !== "playerSkillSet") {
                console.log(`Building on ${key}`);

                const td = document.createElement("td");
                td.textContent = value;
                tr.appendChild(td);
            }
        }

        const rowButtons = createTableButtons(recommendations, index);
        tr.appendChild(rowButtons);

        // getBeatmapData(tr, recommendations, index);
        tableBody.appendChild(tr);
    });

    return tableBody;
}

const onUpdate = (data, index) => {
    data.splice(index, 1);
    saveRecommendations(data);
    renderTable(data);
}

function createTableButtons(recommendations, index) {
    const rowButtons = document.createElement("td");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    editButton.textContent = "Edit";
    deleteButton.textContent = "Del";

    editButton.addEventListener('click', () => {
        FORM.topPlay.value = recommendations[index].playerTopPlay;
        FORM.skillSet.value = recommendations[index].playerSkillSet;

        onUpdate(recommendations, index);
    });

    deleteButton.addEventListener('click', () => {
        onUpdate(recommendations, index);
    });

    rowButtons.appendChild(editButton);
    rowButtons.appendChild(deleteButton);

    return rowButtons;
}

function renderTable(recommendations) {
    TABLE.textContent = "";
    if (recommendations.length > 0) {
        const table = createTableHead();
        const tableBody = createTableBody(recommendations);
    
        table.appendChild(tableBody);
        TABLE.appendChild(table);
    }
}

export { renderTable }