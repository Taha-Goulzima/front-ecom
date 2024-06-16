
async function getStock() {
  const response = await fetch(url + "/stock-operations");
  const stockOperation = await response.json();
  return stockOperation;
}

async function postStock(stockData) {
  try {
    const response = await fetch(url + "/stock-operations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stockData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting stock operation:", error);
  }
}


async function deleteStockOperation(stockOperationId) {
  try {
    const response = await fetch(`${url}/stock-operations/${stockOperationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting stock operation: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting stock operation:", error);
  }
}



async function searchStockOperation(searchTerm) {
  try {
    const response = await fetch(`${url}/stock-operations?search=${searchTerm}`);
    if (!response.ok) {
      throw new Error(`Error searching stock operation: ${response.statusText}`);
    }
    const stockOperations = await response.json();
    return stockOperations;
  } catch (error) {
    console.error("Error searching stock operation:", error);
  }
}

