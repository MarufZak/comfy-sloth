export const formatPrice = (number) => {
    return Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'USD'
    }).format(number / 100)
}

export const getUniqueValues = (array,type) => {
    let uniqueValues = array.map(item=>item[type]);
    if (type==="colors") {
        uniqueValues = uniqueValues.flat(1);
    }
    return [...new Set(uniqueValues)];
}