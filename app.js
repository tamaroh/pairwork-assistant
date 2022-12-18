const displayArea = document.getElementById("display");
const setStudentsButton = document.getElementById("setstudents");
const createdPairButton = document.getElementById("createpair");

let students;
const history = [];
const unpairedMap = new Map();

const getIndexAtRandom = (list) => {
    return Math.floor(Math.random()*list.length);
}
const createPair = (list) => {
    const pairs = [];
    const tempList = Array.from(list);
    while (tempList.length > 1) {
        const pair = [tempList[0]];
        tempList.splice(0, 1);
        const randomedIndex = getIndexAtRandom(tempList);
        pair.push(tempList[randomedIndex]);
        tempList.splice(randomedIndex,1)
        pairs.push(pair);
        unpairedMap.get(pair[0]).delete(pair[1]);
        unpairedMap.get(pair[1]).delete(pair[0]);
    }
    if (tempList.length === 1) {
        pairs[0].push(tempList[0])
    }
    return pairs;
}
const createUnpairedMap = (setOfStudents) => {
    for (const student1 of setOfStudents) {
            unpairedMap.set(student1, new Set());
            console.log(unpairedMap)
        for (const student2 of setOfStudents) {
            console.log(unpairedMap.get(student1))
            unpairedMap.get(student1).add(student2)
        }
    }
    console.log(unpairedMap);
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
    students = new Set(document.getElementsByTagName("textarea")[0].value.split("\n"));
    students.delete("");
    createUnpairedMap(students);
})

createdPairButton.addEventListener("click", () => {
    const createdPairs = createPair(students);
    history.push(createdPairs);
    showHistory();
    console.log(unpairedMap)
})
