const productQuantities = [];

let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
    arrowParent.classList.toggle("showMenu");
  });
}
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);
sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

function editProduct() {

}

function closeEditPopup() {
  document.getElementById("editPopup").style.display = "none";
}

function deleteProduct() {
  document.getElementById("deletePopup").style.display = "flex";
}

function closeDeletePopup() {
  document.getElementById("deletePopup").style.display = "none";
}

function confirmDelete() {

  console.log("Deleting operation...");
  closeDeletePopup();
}

function alertAddToStock() {
  var stock = document.querySelector(".stock");
  stock.style.display = "block";
  getProductsName();
  productQuantities = [];
}

document.getElementById("cancelButton").addEventListener("click", function () {
  var stock = document.querySelector(".stock");
  stock.style.display = "none";
});
document.getElementById("confirmButton").addEventListener("click", function () {
  var stock = document.querySelector(".stock");
  stock.style.display = "none";
});

function getStockOpertaion() {
  getStock().then((data) => {
    const table = document.getElementById("stock-operation-table");
    data.forEach((stockOperation) => {
      showStockOperation(stockOperation);
    });
  });
}


function showStockOperation(stockOperation) {
  const table = document.getElementById("stock-operation-table");

  const row = table.insertRow(-1);
  row.id = `stock-row-${stockOperation._id}`;
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  const cell5 = row.insertCell(4);
  cell1.innerHTML = stockOperation._id;
  cell2.innerHTML = stockOperation.name;
  cell3.innerHTML = stockOperation.date.substring(0, 10);
  cell4.innerHTML = stockOperation.articles.length + ' produits';
  const editIcon = document.createElement('i');
  editIcon.className = 'fa fa-eye';
  editIcon.style.cursor = 'pointer';
  editIcon.onclick = function () {
  
   

    document.getElementById("editPopup-" + stockOperation._id).style.display = "flex";

  };
  var editPopup = document.createElement('div');
  editPopup.innerHTML = ` <div class="editPopup" id="editPopup-${stockOperation._id}">
  <div class="popupContent">
    <h2>Nouvelle Opération Stock</h2>
    <div class="inputFields">
      <div class="name1">
        <label for="nom">Nom Fournisseur</label>
        <input type="text" id="nom" value='${stockOperation.name}'>
      </div>
      <div class="date1">
        <label for="date">Date Livraison</label>
        <input type="date" id="date" class="dateInput" value='${stockOperation.date.substring(0, 10)}'>
      </div>
    </div>
    <div class="down">
      <h3>Produit</h3>
      <table class="productTable">
        <tbody>
          ${stockOperation.articles.map((product) => {
    var row = document.createElement('tr');
    var nameCell = document.createElement('td');
    nameCell.textContent = product.product.title;
    row.appendChild(nameCell);
    var quantityCell = document.createElement('td');
    quantityCell.textContent = product.quantity
    row.appendChild(quantityCell);
    console.log(row);
    return row.outerHTML;
  })}
        </tbody>
      </table>
    </div>
    <div class="btns">
      <button class="cancel" onclick="this.parentElement.parentElement.parentElement.style.display='none'">Annuler</button>
    </div>
  </div>
</div>`
  cell5.appendChild(editIcon);


  const removeIcon = document.createElement('i');
  removeIcon.className = 'fa fa-trash';
  removeIcon.style.cursor = 'pointer';
  removeIcon.onclick = function () {
  
    deleteProduct();
  };
  var deletePopUp = document.createElement("dev");
  deletePopUp.innerHTML = `<div class="deletePopup" id="deletePopup">
  <div class="popupContent">
    <h2>Supprimer Opération Stock</h2>
    <p>Vous êtes entrain de supprimer l'opération de stock de <span style="color: red;">${stockOperation.name}</span> le <span style="color: red;">${stockOperation.date.substring(0, 10)}</span>.</p>
    <p>La suppression de cette opération va impacter la quantité du stock des produits qui y sont inclus.
    </p>
    <p>Êtes-vous sûr de vouloir supprimer cette opération?</p>
    <div class="btns">
      <button class="cancel" onclick="closeDeletePopup()">Annuler</button>
      <button class="delete" onclick="deleteStockById('${stockOperation._id}'); this.parentElement.parentElement.parentElement.style.display='none'">Supprimer</button>
    </div>
  </div>
</div>`
  cell5.appendChild(removeIcon);
  cell5.appendChild(deletePopUp);
  cell5.appendChild(editPopup);
}

getStockOpertaion();

function addStockOperation() {
  var name = document.getElementById("nom").value;
  var date = document.getElementById("date").value;
  postStock({
    name: name,
    date: date,
    articles: [...productQuantities],
  })
    .then((data) => showStockOperation(data))
    .catch((error) => console.log(error));

  document.getElementById("nom").value='';
  document.getElementById("date").value='';
}

function getProductsName() {
  getProducts().then((products) => {
    var select = document.getElementById("produitNom");
    products.forEach((product) => {
      var option = document.createElement("option");
      option.value = product.id;
      option.textContent = product.title;
      select.appendChild(option);
    });
  });
}

function addProductToStockList() {
  var select = document.getElementById("produitNom");
  var quantity = document.getElementById("produitQuantity");
  var productTabel = document.getElementById("productStockTabel");
  if (select.selectedIndex != 0 && quantity.value != "") {
    var row = document.createElement("tr");
    var productCell = document.createElement("td");
    productCell.textContent = select.options[select.selectedIndex].text;
    row.appendChild(productCell);

    var quantityCell = document.createElement("td");
    quantityCell.textContent = quantity.value;
    row.appendChild(quantityCell);

    var article = { product: select.value, quantity: quantity.value };

    productQuantities.push(article);
    console.log(productQuantities);

    select.selectedIndex = 0;
    quantity.value = "";

    productTabel.appendChild(row);
  }
}


function deleteStockById(stockId) {
  deleteStockOperation(stockId)
    .then(response => {
      console.log('Stock operation deleted successfully:', response);
    
    })
    .catch(error => {
      console.error('Failed to delete stock operation:', error);
    });

  let stockTable = document.getElementById("stock-operation-table");
  let rows = stockTable.querySelectorAll("tr");
  rows.forEach(row => {
    let productIdCell = row.cells[0];
    if (productIdCell.textContent == stockId) {
      row.remove();
    }
  });
}


function fetchAndDisplayStockOperations() {
  var name = document.getElementById("search-stock-operation").value;
  let stockOperationTable = document.querySelector("#stock-operation-table");
  let rows = stockOperationTable.querySelectorAll("tbody tr");
  rows.forEach((row) => {
    if (row !== stockOperationTable.tBodies[0].rows[0]) {
      row.remove();
    }
  });
  searchStockOperation(name)
    .then(stockOperations => {
      stockOperations.forEach((operation) => showStockOperation(operation));
    })
    .catch(error => {
      console.error('Error fetching stock operations:', error);
    });
}




