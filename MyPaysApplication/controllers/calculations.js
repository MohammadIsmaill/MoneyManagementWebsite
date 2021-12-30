module.exports.totalPrice = (arr) => {
    let sum = 0;
    for (let element of arr) {
        sum += element.price;
    }
    return sum;
}