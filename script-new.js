// Menyimpan data barang
let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

// Menampilkan data inventori ke tabel
function renderInventory() {
    const tableBody = document.getElementById("inventoryTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    inventory.forEach((item, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = item.name;
        row.insertCell(1).textContent = item.quantity;
        row.insertCell(2).textContent = `Rp ${parseInt(item.price).toLocaleString()}`;
        row.insertCell(3).textContent = item.category;
        const deleteButton = row.insertCell(4).appendChild(document.createElement("button"));
        deleteButton.textContent = "Hapus";
        deleteButton.onclick = () => deleteItem(index);
    });
    updateChart();
}

// Menambahkan barang baru
document.getElementById("addItemForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("itemName").value;
    const quantity = document.getElementById("itemQuantity").value;
    const price = document.getElementById("itemPrice").value;
    const category = document.getElementById("itemCategory").value;
    
    if (name && quantity && price && category) {
        const newItem = { name, quantity, price, category };
        inventory.push(newItem);
        localStorage.setItem("inventory", JSON.stringify(inventory));
        renderInventory();
        this.reset();
    }
});

// Menghapus barang
function deleteItem(index) {
    inventory.splice(index, 1);
    localStorage.setItem("inventory", JSON.stringify(inventory));
    renderInventory();
}

// Pencarian barang
function searchItem() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filteredItems = inventory.filter(item => item.name.toLowerCase().includes(searchTerm));
    renderFilteredInventory(filteredItems);
}

// Menampilkan hasil pencarian
function renderFilteredInventory(filteredItems) {
    const tableBody = document.getElementById("inventoryTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    filteredItems.forEach((item, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = item.name;
        row.insertCell(1).textContent = item.quantity;
        row.insertCell(2).textContent = `Rp ${parseInt(item.price).toLocaleString()}`;
        row.insertCell(3).textContent = item.category;
        const deleteButton = row.insertCell(4).appendChild(document.createElement("button"));
        deleteButton.textContent = "Hapus";
        deleteButton.onclick = () => deleteItem(index);
    });
}

// Grafik statistik stok barang
function updateChart() {
    const categories = ['Elektronik', 'Makanan', 'Pakaian'];
    const categoryCounts = categories.map(category => 
        inventory.filter(item => item.category === category).reduce((total, item) => total + parseInt(item.quantity), 0)
    );

    const ctx = document.getElementById("inventoryChart").getContext('2d');
    new Chart(ctx, {
        type
