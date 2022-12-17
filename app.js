const displayArea = document.getElementById("display");
const setStudentsButton = document.getElementById("setstudents");

const getIndexAtRandom = (list) => {
    return Math.floor(Math.random()*list.length);
}
const createPair = (list) => {
    const pairs = [];
    const tempList = [...list];
    while (tempList.length > 1) {
        const pair = [tempList[0]];
        console.log(pair)
        tempList.splice(0, 1);
        const randomedIndex = getIndexAtRandom(tempList);
        pair.push(tempList[randomedIndex]);
        tempList.splice(randomedIndex,1)
        pairs.push(pair);
        console.log(tempList.length)
    }
    if (tempList.length === 1) {
        pairs[0].push(tempList[0])
    }
    return pairs;
}
setStudentsButton.addEventListener("click", () => {
    const students = document.getElementsByTagName("textarea")[0].value.split("\n");
    const createdPairs = createPair(students);
    displayArea.append(JSON.stringify(createdPairs));
})
