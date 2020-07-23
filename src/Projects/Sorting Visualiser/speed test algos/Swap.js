export default function (i, j, array){
    const tempItem = array[j];
    array[j] = array[i];
    array[i] = tempItem;
}
