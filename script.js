let array = [];
let comparisons = 0;
let swaps = 0;

function generateArray() {
    array = [];
    const container = document.getElementById("array");
    container.innerHTML = "";

    for (let i = 0; i < 50; i++) {
        let value = Math.floor(Math.random() * 300) + 10;
        array.push(value);

        let bar = document.createElement("div");
        bar.style.height = `${value}px`;
        bar.classList.add("bar");

        container.appendChild(bar);
    }

    comparisons = 0;
    swaps = 0;
    updateStats();
    updateComplexity();
}

function updateStats() {
    document.getElementById("stats").innerText =
        `Comparisons: ${comparisons} | Swaps: ${swaps}`;
}

/* 🔥 TIME COMPLEXITY FUNCTION */
function updateComplexity() {
    let algo = document.getElementById("algo").value;

    let best = document.getElementById("best");
    let avg = document.getElementById("avg");
    let worst = document.getElementById("worst");

    if (algo === "Bubble Sort") {
        best.innerText = "Best: O(n)";
        avg.innerText = "Average: O(n²)";
        worst.innerText = "Worst: O(n²)";
    } 
    else if (algo === "Quick Sort") {
        best.innerText = "Best: O(n log n)";
        avg.innerText = "Average: O(n log n)";
        worst.innerText = "Worst: O(n²)";
    } 
    else if (algo === "Merge Sort") {
        best.innerText = "Best: O(n log n)";
        avg.innerText = "Average: O(n log n)";
        worst.innerText = "Worst: O(n log n)";
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms / 2));
}

/* 🔵 Bubble Sort */
async function bubbleSort() {
    let bars = document.getElementsByClassName("bar");
    let speed = document.getElementById("speed").value;

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {

            comparisons++;

            bars[j].classList.add("active");
            bars[j+1].classList.add("active");

            await sleep(speed);

            if (array[j] > array[j+1]) {
                swaps++;

                [array[j], array[j+1]] = [array[j+1], array[j]];

                bars[j].style.height = `${array[j]}px`;
                bars[j+1].style.height = `${array[j+1]}px`;
            }

            bars[j].classList.remove("active");
            bars[j+1].classList.remove("active");

            updateStats();
        }
    }

    for (let bar of bars) {
        bar.classList.add("sorted");
    }
}

/* 🟣 Quick Sort */
async function quickSort(low = 0, high = array.length - 1) {
    if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    let bars = document.getElementsByClassName("bar");
    let pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        comparisons++;

        bars[j].classList.add("active");
        await sleep(50);

        if (array[j] < pivot) {
            i++;
            swaps++;

            [array[i], array[j]] = [array[j], array[i]];

            bars[i].style.height = `${array[i]}px`;
            bars[j].style.height = `${array[j]}px`;
        }

        bars[j].classList.remove("active");
        updateStats();
    }

    swaps++;
    [array[i+1], array[high]] = [array[high], array[i+1]];

    bars[i+1].style.height = `${array[i+1]}px`;
    bars[high].style.height = `${array[high]}px`;

    return i + 1;
}

/* 🟢 Merge Sort */
async function mergeSort(start, end) {
    if (start >= end) return;

    let mid = Math.floor((start + end) / 2);

    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);

    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    let bars = document.getElementsByClassName("bar");
    let temp = [];
    let i = start, j = mid + 1;

    while (i <= mid && j <= end) {
        comparisons++;

        if (array[i] < array[j]) {
            temp.push(array[i++]);
        } else {
            temp.push(array[j++]);
            swaps++;
        }

        await sleep(50);
        updateStats();
    }

    while (i <= mid) temp.push(array[i++]);
    while (j <= end) temp.push(array[j++]);

    for (let k = 0; k < temp.length; k++) {
        array[start + k] = temp[k];
        bars[start + k].style.height = `${temp[k]}px`;
        bars[start + k].classList.add("swap");

        await sleep(50);
        bars[start + k].classList.remove("swap");
    }
}

/* ▶️ START */
async function startSort() {
    let algo = document.getElementById("algo").value;

    if (algo === "Bubble Sort") {
        await bubbleSort();
    } 
    else if (algo === "Quick Sort") {
        await quickSort();
    } 
    else {
        await mergeSort(0, array.length - 1);
    }

    let bars = document.getElementsByClassName("bar");
    for (let bar of bars) {
        bar.classList.add("sorted");
    }
}

/* INIT */
generateArray();