//Best: O(nlog(n)) time - O(1) space
//Average:O(nlog(n)) time - O(1) space
//Worst: O(nlog(n)) time - O(1) space

import timeout from './Delay'
import swap from './Swap';

export default async function ({data, delay, callback}){
    buildMaxHeap(data);
    for(let i = data.length - 1; i > 0; --i){
        swap(0, i, data);
        shiftDown(0, i - 1, data);
        callback(data);
        await timeout(delay);
    }
}

function buildMaxHeap(array){
    const firstParent = Math.floor((array.length - 2) / 2);
    for (let i = firstParent; i >= 0; --i){
        shiftDown(i, array.length - 1, array);
    }
}

function shiftDown(i, endIdx, heap){
    let childOne = i * 2 + 1;
    while(childOne <= endIdx){
        const childTwo = i  * 2 + 2 <= endIdx ? i * 2 + 2 : -1;
        let swapIdx;
        if(childTwo !== -1 && heap[childTwo] > heap[childOne]) {
            swapIdx = childTwo
        }
        else {
            swapIdx = childOne;
        }
        if(heap[swapIdx] > heap[i]){
            swap(i, swapIdx, heap);
            i = swapIdx;
            childOne = i * 2 + 1;
        }
        else{
            return;
        }
    }
}