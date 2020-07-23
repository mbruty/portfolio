const algoDict = [
    {name: 'Bubble Sort', link: 'https://github.com/mbruty/Sorting-visualiser/blob/master/src/speed%20test%20algos/BubbleSort.js'},
    {name: 'Insertion Sort', link: 'https://github.com/mbruty/Sorting-visualiser/blob/master/src/speed%20test%20algos/InsertionSort.js'},
    {name: 'Selection Sort', link: 'https://github.com/mbruty/Sorting-visualiser/blob/master/src/speed%20test%20algos/SelectionSort.js'}, 
    {name: 'Heap Sort', link:'https://github.com/mbruty/Sorting-visualiser/blob/master/src/speed%20test%20algos/HeapSort.js'}, 
    {name: 'Quick Sort', link:'https://github.com/mbruty/Sorting-visualiser/blob/master/src/speed%20test%20algos/QuickSort.js'}];
export default function(algo){
    window.open(algoDict.find(x => x.name === algo).link, "_blank");
}