async function getSells() {
  const response = await fetch(url + "/sell-operations");
  const stockOperation = await response.json();
  return stockOperation;
}

async function postSells(sellData) {
  try {
    const response = await fetch(url + "/sell-operations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sellData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting stock operation:", error);
  }
}

async function deleteSellOperation(sellOperationId) {
  try {
    const response = await fetch(`${url}/sell-operations/${sellOperationId}`, {
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

async function searchSellOperation(searchTerm) {
  try {
    const response = await fetch(
      `${url}/sell-operations?search=${searchTerm}`
    );
    if (!response.ok) {
      throw new Error(
        `Error searching stock operation: ${response.statusText}`
      );
    }
    const stockOperations = await response.json();
    return stockOperations;
  } catch (error) {
    console.error("Error searching stock operation:", error);
  }
}
