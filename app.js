const displayArea = document.getElementById("display");
const setStudentsButton = document.getElementById("setstudents");
const history = [];

const getIndexAtRandom = (list) => {
    return Math.floor(Math.random()*list.length);
}
const createPair = (list) => {
    const pairs = [];
    list.delete("");
    const tempList = Array.from(list);
    while (tempList.length > 1) {
        const pair = [tempList[0]];
        tempList.splice(0, 1);
        const randomedIndex = getIndexAtRandom(tempList);
        pair.push(tempList[randomedIndex]);
        tempList.splice(randomedIndex,1)
        pairs.push(pair);
    }
    if (tempList.length === 1) {
        pairs[0].push(tempList[0])
    }
    return pairs;
}

const showHistory = () => {
    displayArea.innerHTML = "";
    const historyElement = document.createElement("div");
    history.forEach((element, index) => {
        historyElement.innerHTML += `<h2>Day ${index + 1}</h2>`;
        historyElement.append(JSON.stringify(element));
    });
    displayArea.append(historyElement);
}

setStudentsButton.addEventListener("click", () => {
    const students = new Set(document.getElementsByTagName("textarea")[0].value.split("\n"));
    const createdPairs = createPair(students);
    history.push(createdPairs);
    showHistory();
})
