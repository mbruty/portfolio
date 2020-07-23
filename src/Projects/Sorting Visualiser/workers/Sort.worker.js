import bubbleSort from '../sorting algos/BubbleSort';
import insertionSort from '../sorting algos/InsertionSort';
import selectionSort from '../sorting algos/SelectionSort';
import heapSort from '../sorting algos/HeapSort';
import quickSort from '../sorting algos/QuickSort';

/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('message', function(e) {
    const params = {
        data: e.data.data,
        delay: e.data.delay,
        callback: (data) => {
            /* eslint-disable-next-line no-restricted-globals */
            self.postMessage(data);
        }
    }

    switch (e.data.algorithm) {
        case 'Bubble Sort':
            bubbleSort(params);
            break;
        
        case 'Insertion Sort':
            insertionSort(params);
            break;

        case 'Selection Sort':
            selectionSort(params);
            break;

        case 'Heap Sort':
            heapSort(params);
            break;

        case 'Quick Sort':
            quickSort(params);
            break;
            
    }
}, false);
