"use strict";

function printReceipt(inputs) {
  const allItems = loadAllItems();
  const countedCart = countCart(inputs);
  const countedItems = getItems(countedCart, allItems);

  const total = calculateTotal(countedItems);
  const details = getReceiptDetails(countedItems);

  const result = `***<没钱赚商店>收据***
${details}
----------------------
总计：${total}(元)
**********************`;

  console.log(result);
}

function countCart(inputs) {
  let result = [];
  inputs.forEach(element => {
    const matchedIndex = findMatchedIndex(result, element);
    if (matchedIndex > -1) {
      result[matchedIndex] = {
        barcode: element,
        count: result[matchedIndex].count + 1
      };
    } else {
      result.push({ barcode: element, count: 1 });
    }
  });
  return result;
}

function findMatchedIndex(collection, barcode) {
  return collection.findIndex(item => item.barcode === barcode);
}

function findMatchedItem(collection, barcode) {
  return collection.find(item => item.barcode === barcode);
}

function getItems(countedCart, allItems) {
  return countedCart.map(item => {
    const matchedItem = findMatchedItem(allItems, item.barcode);
    if (matchedItem) {
      return { ...item, ...matchedItem };
    }
    return { ...item };
  });
}

function calculateTotal(countedItems) {
  const total = countedItems.reduce(
    (total, item) => (total += item.price * item.count),
    0
  );
  return total.toFixed(2);
}

function calculateSubTotal(item) {
  const total = item.price * item.count;
  return total.toFixed(2);
}

function getReceiptDetails(countedItems) {
  let result = "";
  countedItems.forEach((item, index) => {
    result += getLine(item) + (index === countedItems.length - 1 ? "" : "\n");
  });
  return result;
}

function getLine(item) {
  return `名称：${item.name}，数量：${item.count}${
    item.unit
  }，单价：${item.price.toFixed(2)}(元)，小计：${calculateSubTotal(item)}(元)`;
}
