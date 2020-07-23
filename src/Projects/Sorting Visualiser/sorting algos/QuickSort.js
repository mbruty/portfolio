//Best: O(n) time - O(1) Space
//Average: O(n^2) time - O(1) Space
//Worst: O(n^2) time - O(1) Space

import timeout from './Delay'
import swap from './Swap';
let _delay, _callback;
export default async function ({data, delay, callback}){
    _delay = delay;
    _callback = callback;
    quickSort(data, 0, data.length - 1);
    if(callback){
        callback(data);
    }
}

async function quickSort(array, start, end){
    if (start >= end) return;
    const pivot = start;
    let left = start + 1;
    let right = end;
    while (right >= left) {
        if (array[left] > array[pivot] && array[right] < array[pivot])
            swap(left, right, array);
            if(_callback){
                _callback(array);
                await timeout(_delay);
            }
        
        if (array[left] <= array[pivot]) left++;
        if (array[right] >= array[pivot]) right--;
    }
    swap(pivot, right, array);
    if(_callback){
        _callback(array);
        await timeout(_delay);
    }
    const leftSubSmaller = right - 1 - start < end - (right + 1);
    if (leftSubSmaller) {
        quickSort(array, start, right - 1);
        quickSort(array, right + 1, end);
    }
    else{
        quickSort(array, right + 1, end);
        quickSort(array, start, right - 1);
    }
}