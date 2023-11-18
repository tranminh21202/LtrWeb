function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function tạoDãySố() {
    let dãySố = document.getElementById("dãySố");
    dãySố.innerHTML = "";

    for (let i = 0; i < 20; i++) {
        const sốNgẫuNhiên = randomInRange(1, 100);
        const cột = document.createElement("div");
        cột.className = "column";
        cột.style.height = sốNgẫuNhiên * 5 + "px";
        cột.innerHTML = sốNgẫuNhiên;

        dãySố.appendChild(cột);
    }
}

// Hàm sắp xếp lựa chọn (Selection Sort)
async function sắpXếpLựaChọn() {
    let columns = document.querySelectorAll(".column");
    let soSanhCount = 0;
    let doiChoCount = 0;

    for (let i = 0; i < columns.length - 1; i++) {
        let minIndex = i;
        columns[i].style.backgroundColor = "red"; 

        for (let j = i + 1; j < columns.length; j++) {
            soSanhCount++;
            columns[j].style.backgroundColor = "red";
            let currentHeight = parseInt(columns[j].style.height);
            let minHeight = parseInt(columns[minIndex].style.height);
            await delay(300);
            if (currentHeight < minHeight) {
                minIndex = j;
            }
            columns[j].style.backgroundColor = "dodgerblue";
            updateCounters(soSanhCount, doiChoCount);
        }

        await delay(300); 
        columns[minIndex].style.backgroundColor = "red"; 

        if (minIndex !== i) {
            doiChoCount++;
            await swap(columns[i], columns[minIndex]);
            columns[minIndex].style.backgroundColor = "dodgerblue";
            updateNumbers(columns);
            updateCounters(soSanhCount, doiChoCount);
        }
        columns[i].style.backgroundColor = "limegreen"; 
    }
    columns[columns.length-1].style.backgroundColor = "limegreen";
}

// Hàm sắp xếp nổi bọt (Bubble Sort)
async function sắpXếpNổiBọt() {
    let columns = document.querySelectorAll(".column");
    let soSanhCount = 0;
    let doiChoCount = 0;
    let n = columns.length, dem=1;
    let swapped;

    do {
        swapped = false;

        for (let i = 0; i < n - 1; i++) {
            soSanhCount++;
            columns[i].style.backgroundColor = "red";
            columns[i+1].style.backgroundColor = "red";
            let currentHeight = parseInt(columns[i].style.height);
            let nextHeight = parseInt(columns[i + 1].style.height);
            if (currentHeight > nextHeight) {
                doiChoCount++;
                swap(columns[i], columns[i + 1]);
                updateNumbers(columns);
                await delay(200);
                columns[i].style.backgroundColor = "dodgerblue";
                columns[i+1].style.backgroundColor = "dodgerblue";
                swapped = true;
            }
            else{
                await delay(200);
                columns[i].style.backgroundColor = "dodgerblue";
                columns[i+1].style.backgroundColor = "dodgerblue";
            }
            updateCounters(soSanhCount, doiChoCount);
        }
        await delay(300);
        for(let j = n-1; j >= n-dem; j--){
            columns[j].style.backgroundColor = "limegreen"; 
        }
        dem++;
    } while (swapped);
    for(let i = 0; i <= n-dem; i++){
        columns[i].style.backgroundColor  = "limegreen";
    }
}

// Hàm sắp xếp chèn (Insertion Sort)
async function sắpXếpChèn() {
    let columns = document.querySelectorAll(".column");
    let soSanhCount = 0;
    let doiChoCount = 0;
    let n = columns.length,dem=0;

    for (let i = 1; i < n; i++) {
        let currentColumn = columns[i];
        let currentHeight = parseInt(currentColumn.style.height);
        let j = i - 1;

        while (j >= 0 && parseInt(columns[j].style.height) > currentHeight) {
            columns[j].style.backgroundColor = "red";
            columns[j+1].style.backgroundColor = "red";
            await delay(300);
            soSanhCount++;
            doiChoCount++;
            swap(columns[j], columns[j + 1]);
            updateNumbers(columns);
            updateCounters(soSanhCount, doiChoCount);
            await delay(300);
            columns[j].style.backgroundColor = "dodgerblue";
            columns[j+1].style.backgroundColor = "dodgerblue";
            j--;
        }
        columns[j + 1] = currentColumn;
    }
    
    for(let i = n - 1; i >= 0 ; i--){
        await delay(100);
        columns[i].style.backgroundColor = "limegreen";
    }
}

function swap(column1, column2) {
    let tempHeight = column1.style.height;
    column1.style.height = column2.style.height;
    column2.style.height = tempHeight;
}

function updateCounters(soSanhCount, doiChoCount) {
    let soSanhText = document.getElementById("soSanhText");
    soSanhText.textContent = "Số lần so sánh: " + soSanhCount;
    let doiChoText = document.getElementById("doiChoText");
    doiChoText.textContent = "Số lần đổi chỗ: " + doiChoCount;
}

function updateNumbers(columns) {
    for (let i = 0; i < columns.length; i++) {
        columns[i].innerHTML = parseInt(columns[i].style.height) / 5;
    }
}

function reset() {
    let dãySố = document.getElementById("dãySố");
    dãySố.innerHTML = "";
    let soSanhText = document.getElementById("soSanhText");
    soSanhText.textContent = "Số lần so sánh: 0";
    let doiChoText = document.getElementById("doiChoText");
    doiChoText.textContent = "Số lần đổi chỗ: 0";
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
