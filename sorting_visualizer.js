'use strict';

let numbers = new Array();
const barsContainer = document.querySelector('.bars-container');
const btnGenerateArray = document.querySelector('.generate_array');
const btnBubbleSort = document.querySelector('.bubble_sort');
const btnInsertionSort = document.querySelector('.insertion_sort');
const btnSelectionSort = document.querySelector('.selection_sort');
const btnQuickSort = document.querySelector('.quick_sort');
const btnMergeSort = document.querySelector('.merge_sort');
let arraySize = document.querySelector(".array_size_slider");
let animationSpeed = document.querySelector('.animation_speed_slider');
let seconds = document.querySelector('.seconds');
let minutes = document.querySelector('.minutes');
let miliseconds = document.querySelector('.miliseconds');
let timer = document.querySelector('.timer');
let intervalID;

let speed = 101;
let size = 80;
let sorting = false;
let arrayPresent = false;
let m = 0;
let s = 0;
let ms = 0;

const runTimer = function () {
    ms++;
    if (ms <= 9)
        miliseconds.textContent = "0" + ms;
    if (ms > 9)
        miliseconds.textContent = ms;
    if (ms > 99){
        s++;
        ms = 0;
        if(s<=9)
        seconds.textContent = "0"+s;
        if(s>9)
        seconds.textContent = s;
        if(s>59){
            m++;
            s = 0;
            minutes.textContent = "0" + m;
        }
    }
}

const startTimer = function () {
    timer.classList.remove('hidden');
    resetTimer();
    intervalID = setInterval(runTimer, 10)
}

const resetTimer = function () {
    seconds.textContent = "00";
    minutes.textContent = "00";
    miliseconds.textContent = "00";
    m = 0;
    s = 0;
    ms = 0;
}

const stopTimer = function () {
    clearInterval(intervalID);
}

const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);


const generateArray = function () {
    for (let i = 1; i <= size; i++) {
        numbers.push(randomInt(1, 55));
    }

    numbers.forEach((num, i) => {
        const html = `
        <div class="bar bar${i + 1}"></div>
        `;
        barsContainer.insertAdjacentHTML('beforeend', html);
        const currBar = document.querySelector(`.bar${i + 1}`);
        currBar.style.height = `${Number(num)}em`;
        currBar.style.width = `${(100 / size)}%`;
    });
    arrayPresent = true;
    resetTimer();
    timer.classList.add('hidden');
    // barsContainer.classList.remove('sortedArray');
};

btnGenerateArray.addEventListener('click', function (e) {
    e.preventDefault();
    if (sorting === true) return;
    barsContainer.innerHTML = "";
    numbers = [];
    generateArray();
    console.log(numbers);
});

const comapreAndSwap = async function (el1, el2) {
    let h1 = Number.parseInt(getComputedStyle(el1).height, 10);
    let h2 = Number.parseInt(getComputedStyle(el2).height, 10);
    if (h1 > h2) {
        await new Promise(resolve => setTimeout(resolve, speed));
        changeColorToRed(el1);
        changeColorToRed(el2);
        let temp;
        temp = h1;
        h1 = h2;
        h2 = temp;
        el1.style.height = h1 + 'px';
        el2.style.height = h2 + 'px';
        await new Promise(resolve => setTimeout(resolve, speed));
        changeColorToGold(el1);
        changeColorToGold(el2);
    }
};

const makeArrayGlow = function () {
    const els = document.querySelectorAll('.bar');
    for (const el of els) {
        el.classList.add('barSorted');
    }
};

const makeDark = function (el) {
    el.style.backgroundColor = '#007c92';
};


const changeColorToGold = async function (el) {
    el.style.backgroundColor = '#FFD700';
}

const changeColorToBlue = async function (el) {
    el.style.backgroundColor = 'rgba(41, 252, 182, 0.788)';
}

const changeColorToRed = function (el) {
    el.style.backgroundColor = '#D21F3C';
}

const disableInput = function () {
    sorting = true;
    arraySize.disabled = true;
    animationSpeed.disabled = true;
    startTimer();
}

const enableInput = function () {
    sorting = false;
    arraySize.disabled = false;
    animationSpeed.disabled = false;
    stopTimer();
    // barsContainer.classList.add('sortedArray');
}

const bubbleSort = async function () {
    let n = numbers.length;
    disableInput();
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            const el1 = document.querySelector(`.bar${j + 1}`);
            const el2 = document.querySelector(`.bar${j + 1 + 1}`);
            changeColorToGold(el1);
            changeColorToGold(el2);
            await comapreAndSwap(el1, el2);
            await new Promise(resolve => setTimeout(resolve, speed));
            changeColorToBlue(el1);
        }
        const el = document.querySelector(`.bar${n - i}`);
        makeDark(el);
    }
    makeArrayGlow();
    enableInput();
};


const selectionSort = async function () {
    let n = numbers.length;
    disableInput();
    for (let i = 0; i < n; i++) {
        let el1 = document.querySelector(`.bar${i + 1}`);
        changeColorToGold(el1);
        for (let j = i + 1; j < n; j++) {
            let el2 = document.querySelector(`.bar${j + 1}`);
            changeColorToGold(el2);
            // await new Promise(resolve => setTimeout(resolve, 100));
            await comapreAndSwap(el1, el2);
            await new Promise(resolve => setTimeout(resolve, speed));
            changeColorToBlue(el2);
        }
        makeDark(el1);
    }
    makeArrayGlow();
    enableInput();
}


const insertionSort = async function () {
    let n = numbers.length;
    disableInput();
    for (let i = 1; i < n; i++) {
        let el2 = document.querySelector(`.bar${i + 1}`);
        for (let j = i - 1; j >= 0; j--) {
            let el1 = document.querySelector(`.bar${j + 1}`);
            let h1 = Number.parseInt(getComputedStyle(el1).height, 10);
            let h2 = Number.parseInt(getComputedStyle(el2).height, 10);
            changeColorToGold(el1);
            changeColorToGold(el2);
            if (h1 < h2) {
                changeColorToBlue(el1);
                changeColorToBlue(el2);
                break;
            }
            // await new Promise(resolve => setTimeout(resolve, 100));          
            await comapreAndSwap(el1, el2);
            await new Promise(resolve => setTimeout(resolve, speed));
            changeColorToBlue(el1);
            changeColorToBlue(el2);
            el2 = el1;
        }
    }
    makeArrayGlow();
    enableInput();
}


const format = async function (k) {
    // console.log('hey');
    let el = document.querySelector(`.bar${k + 1}`);
    changeColorToGold(el);
    el.style.height = Number(numbers[k]) + 'em';
    await new Promise(resolve => setTimeout(resolve, speed));
    changeColorToBlue(el);
}

async function merge(l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;

    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++)
        L[i] = numbers[l + i];
    for (let j = 0; j < n2; j++)
        R[j] = numbers[m + 1 + j];

    // Merge the temp arrays back into arr[l..r]
    let i = 0;
    let j = 0;
    let k = l;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            numbers[k] = L[i];
            i++;
        }
        else {
            numbers[k] = R[j];
            j++;
        }
        await format(k);
        k++;
    }

    while (i < n1) {
        numbers[k] = L[i];
        i++;
        await format(k);
        k++;
    }

    while (j < n2) {
        numbers[k] = R[j];
        j++;
        await format(k);
        k++;
    }
}

async function mergeSortt(l, r) {
    if (l >= r) return;

    let m = l + parseInt((r - l) / 2);
    await mergeSortt(l, m);
    await mergeSortt(m + 1, r);
    await merge(l, m, r);
}


const mergeSort = async function () {
    let n = numbers.length;
    disableInput();
    await mergeSortt(0, n - 1);
    enableInput();
    makeArrayGlow();
    console.log(numbers);
}

async function swap(i, j) {
    let temp = numbers[i];
    numbers[i] = numbers[j];
    numbers[j] = temp;
    const el1 = document.querySelector(`.bar${Number(i) + 1}`);
    const el2 = document.querySelector(`.bar${Number(j) + 1}`);
    await comapreAndSwap(el1, el2);
    changeColorToBlue(el1);
    changeColorToBlue(el2);

};

async function partition(low, high) {

    let pivot = Number(numbers[high]);
    let pivotEl = document.querySelector(`.bar${Number(high) + 1}`);
    pivotEl.style.backgroundColor = '#3fff00';

    let i = (low - 1);

    for (let j = low; j <= high - 1; j++) {
        let el = document.querySelector(`.bar${Number(j) + 1}`);
        await changeColorToGold(el);
        // If current element is smaller 
        // than the pivot
        if (numbers[j] < pivot) {

            // Increment index of 
            // smaller element
            i++;
            await swap(i, j);
        }
        await changeColorToBlue(el);
    }
    await swap(i + 1, high);
    await changeColorToBlue(pivotEl);
    return (i + 1);
}

async function quickSortt(low, high) {
    if (low < high) {

        // pi is partitioning index, arr[p] is now at right place 
        let pi = await partition(low, high);

        // Separately sort elements before
        // partition and after partition
        await quickSortt(low, pi - 1);
        await quickSortt(pi + 1, high);
    }
}

const quickSort = async function () {
    let n = numbers.length;
    disableInput();
    await quickSortt(0, n - 1);
    enableInput();
    makeArrayGlow();
    console.log(numbers);
}


btnBubbleSort.addEventListener('click', function (e) {
    e.preventDefault()
    if (sorting === true || arrayPresent === false) return;
    console.log('btn clicked');
    bubbleSort();
});

btnSelectionSort.addEventListener('click', function (e) {
    e.preventDefault()
    if (sorting === true || arrayPresent === false) return;
    console.log('btn clicked');
    selectionSort();
});

btnInsertionSort.addEventListener('click', function (e) {
    e.preventDefault();
    if (sorting === true || arrayPresent === false) return;
    console.log('btn clicked');
    insertionSort();
});

btnQuickSort.addEventListener('click', function (e) {
    e.preventDefault();
    if (sorting === true || arrayPresent === false) return;
    console.log('btn clicked');
    quickSort();
});

btnMergeSort.addEventListener('click', function (e) {
    e.preventDefault();
    if (sorting === true || arrayPresent === false) return;
    console.log('btn clicked');
    mergeSort();
});

arraySize.addEventListener("input", function (e) {
    e.preventDefault();
    if (sorting === true) return;
    size = arraySize.value;
    barsContainer.innerHTML = "";
    numbers = [];
    generateArray();
});

animationSpeed.addEventListener("input", function (e) {
    e.preventDefault();
    if (sorting === true) return;
    speed = 500-animationSpeed.value;
});


