const displayArea = document.getElementById("display");
const setStudentsButton = document.getElementById("setstudents");

const getIndexAtRandom = (list) => {
    return Math.floor(Math.random()*list.length);
}
const createPair = (list) => {
    const pairs = [];
    const tempList = [...list];
    tempList.forEach((element, index) => {
        const pair = [element];
        tempList.splice(index, 1);
        pair.push(getIndexAtRandom(tempList));
        pairs.push(pair);
    });
}
setStudentsButton.addEventListener("click", () => {
    const students = document.getElementsByTagName("textarea")[0].value.split("\n");
    displayArea.append(students);
    console.log("created pairs:", createPair(students));
})
