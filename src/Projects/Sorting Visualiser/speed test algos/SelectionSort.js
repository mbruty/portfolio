//Best: O(n^2) time - O(1) space
//Average: O(n^2) time - O(1) space
//Worst: O(n^2) time - O(1) space

import swap from './Swap';

export default async function ({data, delay, callback}){
	let idx = 0;
	while(idx < data.length - 1) {
		let smallestIdx = idx;
		for (let i = idx + 1; i < data.length; ++i){
			if (data[smallestIdx] > data[i]) smallestIdx = i;
		}
        swap(idx, smallestIdx, data);
		++idx;
	}
}