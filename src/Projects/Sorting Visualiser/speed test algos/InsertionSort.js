//Best: O(n) time - O(1) space
//Average: O(n^2) time - O(1) space
//Worst: O(n^2) time - O(1) space

import swap from './Swap';

export default async function ({data, delay, callback}){
    for (let i = 1; i < data.length; ++i) {
        let j = i;
        while (j > 0 && data[j] < data[j - 1]){
            swap(j, j - 1, data);
            --j;
        }
    }
}