import bubbleSort from '../speed test algos/BubbleSort';
import insertionSort from '../speed test algos/InsertionSort';
import selectionSort from '../speed test algos/SelectionSort';
import heapSort from '../speed test algos/HeapSort';
import quickSort from '../speed test algos/QuickSort';
import mergeSort from '../speed test algos/MergeSort';
/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('message', function(e) {
	let results = [];

	timeFunction(bubbleSort, e.data, results, 'Bubble Sort');

	timeFunction(insertionSort, e.data, results, 'Insertion Sort');

	timeFunction(selectionSort, e.data, results, 'Selection Sort');

	timeFunction(heapSort, e.data, results, 'Heap Sort');

	timeFunction(quickSort, e.data, results, 'Quick Sort');

	timeFunction(mergeSort, e.data, results, 'Merge Sort');
	/* eslint-disable-next-line no-restricted-globals */
	self.postMessage(results);
}, false);

function timeFunction(fun, data, results, _name){
	let _data = [...data];
	let t0 = performance.now();
	fun({data: _data});
	let t1 = performance.now();
	results.push({name: _name, result: (t1 - t0).toFixed(2)});
}