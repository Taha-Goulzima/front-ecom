const url = "http://localhost:3000";
async function getProducts() {
  const response = await fetch(url+"/products");
  const products = await response.json();
  return products;
}


async function postProducts(productData) {
  try {
    const response = await fetch(url+"/products", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting product:", error);
  }
}

async function deleteProductById(productId) {
  try {
    const response = await fetch(url+`/products/${productId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete the product');
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}

async function editProductById(productId, newTitle) {
  console.log(newTitle)
  try {
    const response = await fetch(url+`/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: newTitle })
    });
    if (!response.ok) {
      throw new Error('Failed to edit the product');
    }
    return await response.json();
  } catch (error) {
    console.error("Error editing product:", error);
  }
}



async function searchProduct(searchTerm) {
  try {
    const response = await fetch(`${url}/Products?search=${searchTerm}`);
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