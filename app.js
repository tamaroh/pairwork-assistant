const displayArea = document.getElementById("display");
const setStudentsButton = document.getElementById("setstudents");
const createdPairButton = document.getElementById("createpair");

let students;
const history = [];
const unpairedMap = new Map();

const getIndexAtRandom = (list) => {
    return Math.floor(Math.random()*list.length);
}
const createPair = () => {
    // const pairs = [];
    // const tempList = Array.from(list);
    // while (tempList.length > 1) {
    //     const pair = [tempList[0]];
    //     tempList.splice(0, 1);
    //     const randomedIndex = getIndexAtRandom(tempList);
    //     pair.push(tempList[randomedIndex]);
    //     tempList.splice(randomedIndex,1)
    //     pairs.push(pair);
    //     unpairedMap.get(pair[0]).delete(pair[1]);
    //     unpairedMap.get(pair[1]).delete(pair[0]);
    // }
    // if (tempList.length === 1) {
    //     pairs[0].push(tempList[0])
    // }
    // return pairs;
    /*

    q,w,e,r,t,y
    select q
    choose random from w,e,r,t,y

    生徒リストでループ
        生徒1のsetからstudent2を取り除く
        student1が仮配列になかったら
            studentをpairに入れる
            studentのsetからランダムに抽出する
            二人目をpairに入れる
            一人目二人目を仮配列にいれておく

    */
    const pairs = [];
    const tempArray = [];
    for (const [student1, unpairedSet] of unpairedMap) {
        const pair = [student1];
        const unpairedArray = Array.from(unpairedSet);
        if (tempArray.length) {
            for (let i = 0; i > tempArray.length; i++){
                unpairedArray.splice(i,1);
            }
        }
        const student2 = unpairedArray[getIndexAtRandom(unpairedArray)];
        pair.push(student2);
        unpairedMap.get(student1).delete(student2);
        unpairedMap.get(student2).delete(student1);
        tempArray.push(student1);
        tempArray.push(student2);
        pairs.push(pair);
    }
    return pairs;
}
const createUnpairedMap = (setOfStudents) => {
    for (const student1 of setOfStudents) {
            unpairedMap.set(student1, new Set());
        for (const student2 of setOfStudents) {
            unpairedMap.get(student1).add(student2)
        }
    }
    console.log(unpairedMap);
}
const showHistory = () => {
    displayArea.innerHTML = "";
    const historyElement = document.createElement("div");
    history.forEach((element, index) => {
        historyElement.innerHTML = `<h2>Day ${index + 1}</h2>`;
        historyElement.append(JSON.stringify(element));
    });
    displayArea.append(historyElement);
}
const showStudents = () => {
    const area = document.getElementById("students");
    const listElement = document.createElement("ul");
    for (const student of students) {
        const studentElement = document.createElement("li");
        studentElement.innerHTML = student;
        listElement.append(studentElement);
    }
    area.append(listElement)
}
setStudentsButton.addEventListener("click", () => {
    students = new Set(document.getElementsByTagName("textarea")[0].value.split("\n"));
    students.delete("");
    createUnpairedMap(students);
    showStudents();
})

createdPairButton.addEventListener("click", () => {
    const createdPairs = createPair();
    history.push(createdPairs);
    showHistory();
    console.log(unpairedMap)
})
