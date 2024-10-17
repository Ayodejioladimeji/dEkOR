export const formatMoney = (amount) => {
  let amountStr = amount.toString();

  let parts = amountStr.split(".");
  let integerPart = parts[0];
  let fractionalPart = parts.length > 1 ? "." + parts[1] : "";

  // Add commas to the integer part
  let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  let formattedFractional =
    fractionalPart.length > 2 ? fractionalPart.slice(0, 3) : fractionalPart;

  let formattedAmount = formattedInteger + formattedFractional;

  return formattedAmount;
};

export const calculateTotal = (data) => {
  const subtotal = data?.reduce((prev, item) => {
    return prev + Number(item?.sellingPrice) * item?.quantity;
  }, 0);
  return subtotal;
};

export function screenPixels(size, setState) {
  const mediaQuery = window.matchMedia(`(max-width: ${size}`);

  function handleScreenSizeChange(event) {
    setState(event.matches);
  }

  mediaQuery.addEventListener("change", handleScreenSizeChange);

  // Initialize the state
  setState(mediaQuery.matches);

  // Cleanup the event listener when the component unmounts
  return () => {
    mediaQuery.removeEventListener("change", handleScreenSizeChange);
  };
}

// first two words
export const firstTwoWords = (str) => {
  const words = str?.split(" ");
  return words?.slice(0, 2).join(" ");
};

// check if product has empty images
export const EmptyImagesCheck = (products: any) => {
  const hasEmptyImages = products.some(
    (product) => product.images.length === 0
  );
  return !hasEmptyImages;
};

export const mergeCarts = (dbCart, localCart) => {
  const combinedCart = [...dbCart];

  localCart.forEach((localItem) => {
    const existingItem = combinedCart.find(
      (dbItem) => dbItem._id === localItem._id
    );
    if (!existingItem) {
      combinedCart.push(localItem);
    } else {
      // update the quantity if the item already exists in both carts
      existingItem.quantity += localItem.quantity;
    }
  });

  return combinedCart;
};
