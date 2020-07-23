export default function(nItems) {
    let arr = [];
    for (let i = 0; i < nItems; ++i) {
        arr.push(Math.floor(Math.random() * 100) + 1);
    }
    return arr;
}