var beep = new Audio('beep3.mp3')
var mouseclick = new Audio('Mouseclick.mp3')
var done = new Audio('wrong.mp3')

const BubbleSortButton = document.querySelector(".BubbleSort");
BubbleSortButton.addEventListener('click', async function () {
    mouseclick.play()
    selectText.innerHTML = `Bubble Sort..`
    const description = document.querySelector('#description')
    description.style.display = 'flex'
    const section = document.querySelector('#fullbody')
    section.style.height = '184vh'
    console.log('Bubble sort')
    
    await descriptionText_bubble();
    
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await BubbleSort();
    enableNewArrayBtn();
})

async function descriptionText_bubble() {
    const section = document.querySelector('#fullbody')
    section.style.height = `184vh`

    const description = document.querySelector('#description')
    description.style.display = 'flex'

    const code = document.querySelector('#code_java')
    code.innerHTML = `// Java program for implementation of Bubble Sort
class BubbleSort {
    void bubbleSort(int arr[])
    {
        int n = arr.length;
        for (int i = 0; i < n-1; i++)
            for (int j = 0; j < n-i-1; j++)
                if (arr[j] > arr[j+1])
                {
                    // swap arr[j+1] and arr[j]
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
    }

    /* Prints the array */
    void printArray(int arr[])
    {
        int n = arr.length;
        for (int i=0; i<n; ++i)
            System.out.print(arr[i] + " ");
        System.out.println();
    }

    // Driver method to test above
    public static void main(String args[])
    {
        BubbleSort ob = new BubbleSort();
        int arr[] = {64, 34, 25, 12, 22, 11, 90};
        ob.bubbleSort(arr);
        System.out.println("Sorted array");
        ob.printArray(arr);
    }
}`

    const time = document.querySelector('#time')
    time.innerHTML = `<b>Time Complexity:</b> O(N^2)

Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.

<b>Worst Case:</b> O(N^2) - When the array is reverse sorted
<b>Average Case:</b> O(N^2) - When the array is randomly ordered  
<b>Best Case:</b> O(N) - When the array is already sorted`

    const space = document.querySelector('#space')
    space.innerHTML = `<b>Auxiliary Space:</b> O(1)

Bubble sort is an in-place sorting algorithm. It does not require any additional memory space apart from a temporary variable used for swapping. 

Therefore, the space complexity is constant O(1).`
}

async function BubbleSort() {
    let n = arrayData.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Color the bars being compared
            updateBarColor(j, 'rgb(250, 5, 54)');
            updateBarColor(j + 1, 'rgb(250, 5, 54)');
            
            await waitforme(delay);
            
            // Compare values in the data array
            if (arrayData[j] > arrayData[j + 1]) {
                // Swap in data array
                swapping(j, j + 1);
                
                // Re-render to show the swap
                renderBars();
                
                // Recolor the swapped bars
                updateBarColor(j, 'rgb(250, 5, 54)');
                updateBarColor(j + 1, 'rgb(250, 5, 54)');
                
                beep.play();
                await waitforme(delay);
            }
            
            // Reset colors
            updateBarColor(j, 'rgb(245, 212, 24)');
            updateBarColor(j + 1, 'rgb(245, 212, 24)');
        }
        
        // Mark the sorted element
        updateBarColor(n - 1 - i, 'rgb(0,255,0)');
    }
    
    // Mark the first element as sorted
    updateBarColor(0, 'rgb(0,255,0)');
    
    done.play();
    selectText.innerHTML = `Sorting Complete!`;
}