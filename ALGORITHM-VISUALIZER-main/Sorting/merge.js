//Merged sort is basically based on DIVIDE AND CONQUER RULE
// First we have to divide the whole array into smaller parts.
//a. si --> mid and another one is b. mid+1 --> ei
//Then we have to follow this steps until we get a single elements
//then we have to sort that indivitual arrays
//then put it into an empty array which is a merged array and a sorted array too
//this is the conquer step and thus we can easily do the merge sort

var beep = new Audio('beep3.mp3')
var mouseclick = new Audio('Mouseclick.mp3')
var done = new Audio('wrong.mp3')

const MergeSortButton = document.querySelector(".MergeSort");

MergeSortButton.addEventListener('click', async function () {
    selectText.innerHTML = `Merge Sort..`
    mouseclick.play()
    const description = document.querySelector('#description')
    description.style.display = 'flex'
    const section = document.querySelector('#fullbody')
    section.style.height = '184vh'

    await descriptionText_merge();
    
    let si = 0;
    let ei = arrayData.length - 1;
    
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();

    await MergeSort(si, ei);
    
    selectText.innerHTML = `Sorting Complete!`
    done.play();
    enableNewArrayBtn();
});

async function descriptionText_merge() {
    const section = document.querySelector('#fullbody')
    section.style.height = `184vh`

    const description = document.querySelector('#description')
    description.style.display = 'flex'

    const code = document.querySelector('.language-java')
    code.innerHTML = `/* Java program for Merge Sort */
class MergeSort {
// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
void merge(int arr[], int l, int m, int r)
{
   // Find sizes of two subarrays to be merged
   int n1 = m - l + 1;
   int n2 = r - m;

   /* Create temp arrays */
   int L[] = new int[n1];
   int R[] = new int[n2];

   /*Copy data to temp arrays*/
   for (int i = 0; i < n1; ++i)
      L[i] = arr[l + i];
   for (int j = 0; j < n2; ++j)
      R[j] = arr[m + 1 + j];

   /* Merge the temp arrays */

   // Initial indexes of first and second subarrays
   int i = 0, j = 0;

   // Initial index of merged subarray array
   int k = l;
   while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
         arr[k] = L[i];
         i++;
      }
      else {
         arr[k] = R[j];
         j++;
      }
      k++;
   }

   /* Copy remaining elements of L[] if any */
   while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
   }

   /* Copy remaining elements of R[] if any */
   while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
   }
}

// Main function that sorts arr[l..r] using merge()
void sort(int arr[], int l, int r)
{
   if (l < r) {
      // Find the middle point
      int m = l + (r - l) / 2;

      // Sort first and second halves
      sort(arr, l, m);
      sort(arr, m + 1, r);

      // Merge the sorted halves
      merge(arr, l, m, r);
   }
}

/* A utility function to print array of size n */
static void printArray(int arr[])
{
   int n = arr.length;
   for (int i = 0; i < n; ++i)
      System.out.print(arr[i] + " ");
   System.out.println();
}

// Driver code
public static void main(String args[])
{
   int arr[] = { 12, 11, 13, 5, 6, 7 };

   System.out.println("Given Array");
   printArray(arr);

   MergeSort ob = new MergeSort();
   ob.sort(arr, 0, arr.length - 1);

   System.out.println("\\nSorted array");
   printArray(arr);
}
}`

    const time = document.querySelector('#time')
    time.innerHTML = `Time Complexity: O(N log(N)),  Sorting arrays on different machines. 
Merge Sort is a recursive algorithm and time complexity can be expressed as following recurrence relation. 

T(n) = 2T(n/2) + θ(n)`

    const space = document.querySelector('#space')
    space.innerHTML = `Auxiliary Space: O(n), In merge sort all elements are copied into an auxiliary array. 
So N auxiliary space is required for merge sort.`
}

// Divide
async function MergeSort(si, ei) {
    if (si >= ei) {
        return;
    }
    
    const middle = si + Math.floor((ei - si) / 2);
    await MergeSort(si, middle);
    await MergeSort(middle + 1, ei);
    await Merge(si, middle, ei);
}

// Conquer
async function Merge(low, mid, high) {
    const a1 = mid - low + 1;
    const a2 = high - mid;
    let left = new Array(a1);
    let right = new Array(a2);

    // Copy data to temp arrays
    for (let i = 0; i < a1; i++) {
        await waitforme(delay);
        beep.play();
        updateBarColor(low + i, 'red');
        left[i] = arrayData[low + i];
    }

    for (let i = 0; i < a2; i++) {
        await waitforme(delay);
        beep.play();
        updateBarColor(mid + 1 + i, 'yellow');
        right[i] = arrayData[mid + 1 + i];
    }
    
    await waitforme(delay);

    // Merge the arrays back
    let i = 0, j = 0, k = low;
    
    while (i < a1 && j < a2) {
        beep.play();
        await waitforme(delay);
        
        if (left[i] <= right[j]) {
            arrayData[k] = left[i];
            i++;
        } else {
            arrayData[k] = right[j];
            j++;
        }
        
        // Re-render
        renderBars();
        
        // Color appropriately
        if ((a1 + a2) === arrayData.length) {
            updateBarColor(k, 'rgb(0,255,0)');
        } else {
            updateBarColor(k, 'lightgreen');
        }
        
        k++;
    }

    // Copy remaining elements of left[]
    while (i < a1) {
        beep.play();
        await waitforme(delay);
        
        arrayData[k] = left[i];
        
        // Re-render
        renderBars();
        
        if ((a1 + a2) === arrayData.length) {
            updateBarColor(k, 'rgb(0,255,0)');
        } else {
            updateBarColor(k, 'lightgreen');
        }
        
        i++;
        k++;
    }

    // Copy remaining elements of right[]
    while (j < a2) {
        beep.play();
        await waitforme(delay);
        
        arrayData[k] = right[j];
        
        // Re-render
        renderBars();
        
        if ((a1 + a2) === arrayData.length) {
            updateBarColor(k, 'rgb(0,255,0)');
        } else {
            updateBarColor(k, 'lightgreen');
        }
        
        j++;
        k++;
    }
}