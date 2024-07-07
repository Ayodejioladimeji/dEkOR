export const formatMoney = (amount) => {
    let amountStr = amount.toString();

    let parts = amountStr.split(".");
    let integerPart = parts[0];
    let fractionalPart = parts.length > 1 ? "." + parts[1] : "";

    // Add commas to the integer part
    let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    let formattedFractional = fractionalPart.length > 2 ? fractionalPart.slice(0, 3) : fractionalPart;

    let formattedAmount = formattedInteger + formattedFractional;

    return formattedAmount;
}


export const calculateTotal = (data) => {
    const subtotal = data.reduce((prev, item) => {
        return prev + Number(item.price) * item.quantity;
    }, 0);
    return subtotal;
}