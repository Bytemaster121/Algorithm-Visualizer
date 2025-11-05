var beep = new Audio('beep3.mp3')
var mouseclick = new Audio('Mouseclick.mp3')
var done = new Audio('wrong.mp3')

const QuickSortbutton = document.querySelector(".QuickSort");
QuickSortbutton.addEventListener('click', async function () {
    selectText.innerHTML = `Quick Sort..`
    mouseclick.play()
    const description = document.querySelector('#description')
    description.style.display = 'flex'
    const section = document.querySelector('#fullbody')
    section.style.height = '184vh'
    await descriptionText_quick()
    
    let low = 0;
    let high = arrayData.length - 1;
    
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    
    await quickSort(low, high);
    
    selectText.innerHTML = `Sorting Complete!`
    done.play();
    enableNewArrayBtn();
});

async function descriptionText_quick() {
    const section = document.querySelector('#fullbody')
    section.style.height = `184vh`

    const description = document.querySelector('#description')
    description.style.display = 'flex'

    const code = document.querySelector('#code_java')
    code.innerHTML = `// Java implementation of QuickSort
import java.io.*;

class GFG {

// A utility function to swap two elements
static void swap(int[] arr, int i, int j)
{
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/* This function takes last element as pivot, places
the pivot element at its correct position in sorted
array, and places all smaller (smaller than pivot)
to left of pivot and all greater elements to right
of pivot */
static int partition(int[] arr, int low, int high)
{

    // pivot
    int pivot = arr[high];

    // Index of smaller element and
    // indicates the right position
    // of pivot found so far
    int i = (low - 1);

    for (int j = low; j <= high - 1; j++) {

        // If current element is smaller
        // than the pivot
        if (arr[j] < pivot) {

            // Increment index of
            // smaller element
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return (i + 1);
}

/* The main function that implements QuickSort
        arr[] --> Array to be sorted,
        low --> Starting index,
        high --> Ending index
*/
static void quickSort(int[] arr, int low, int high)
{
    if (low < high) {

        // pi is partitioning index, arr[p]
        // is now at right place
        int pi = partition(arr, low, high);

        // Separately sort elements before
        // partition and after partition
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// Function to print an array
static void printArray(int[] arr, int size)
{
    for (int i = 0; i < size; i++)
        System.out.print(arr[i] + " ");

    System.out.println();
}

// Driver Code
public static void main(String[] args)
{
    int[] arr = { 10, 7, 8, 9, 1, 5 };
    int n = arr.length;

    quickSort(arr, 0, n - 1);
    System.out.println("Sorted array: ");
    printArray(arr, n);
}
}`

    const time = document.querySelector('#time')
    time.innerHTML = `Worst Case: The worst case occurs when the partition process always picks the greatest or smallest element as the pivot.
If we consider the above partition strategy where the last element is always picked as a pivot, the worst case would occur when the array is already sorted in increasing or decreasing order. 

Best Case:
The best case occurs when the partition process always picks the middle element as the pivot. 

Average Case: 
To do average case analysis, we need to consider all possible permutation of array and calculate time taken by every permutation which doesn't look easy. 
We can get an idea of average case by considering the case when partition puts O(n/9) elements in one set and O(9n/10) elements in other set.`

    const space = document.querySelector('#space')
    space.innerHTML = `Space complexity : O(N)

as we are not creating any container other then given array therefore Space complexity will be in order of N`
}

async function partition(low, high) {
    beep.play();
    let i = low - 1;
    let pivotValue = arrayData[high];
    
    updateBarColor(high, 'red');
    
    for (let j = low; j <= high - 1; j++) {
        beep.play();
        updateBarColor(j, 'yellow');
        await waitforme(delay);

        if (arrayData[j] < pivotValue) {
            beep.play();
            i++;
            
            // Swap in data array
            swapping(i, j);
            
            // Re-render
            renderBars();
            
            // Recolor
            updateBarColor(high, 'red');
            updateBarColor(i, 'orange');
            if (i != j) updateBarColor(j, 'orange');

            await waitforme(delay);
        } else {
            beep.play();
            updateBarColor(j, 'pink');
        }
    }
    
    i++;

    await waitforme(delay);
    
    // Swap pivot to correct position
    swapping(i, high);
    
    // Re-render
    renderBars();
    
    // Recolor
    updateBarColor(high, 'pink');
    updateBarColor(i, 'green');
    updateBarStyle(i, 'green', 'white');

    await waitforme(delay);

    // Reset other colors
    for (let k = 0; k < arrayData.length; k++) {
        const bars = document.querySelectorAll('.bar');
        if (bars[k] && bars[k].style.background != 'green') {
            updateBarColor(k, 'cyan');
        }
    }

    return i;
}

async function quickSort(low, high) {
    if (low < high) {
        beep.play();
        let pivot_index = await partition(low, high);
        await quickSort(low, pivot_index - 1);
        await quickSort(pivot_index + 1, high);
    } else {
        if (low >= 0 && high >= 0 && low < arrayData.length && high < arrayData.length) {
            beep.play();
            updateBarStyle(high, 'green', 'white');
            updateBarStyle(low, 'green', 'white');
        }
    }
}