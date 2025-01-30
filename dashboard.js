// Cek apakah user sudah login
if (!localStorage.getItem("loggedIn")) {
    window.location.href = "login.html"; // Arahkan ke halaman login jika belum login
} else {
    // Menampilkan nama pengguna di beranda
    document.getElementById("usernameDisplay").textContent = localStorage.getItem("username");

    // Menampilkan data inventori
    renderInventory();
}

// Fungsi logout
function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    window.location.href = "login.html"; // Kembali ke halaman login
}

// Menampilkan data inventori (contoh sederhana)
function renderInventory() {
    const inventory = [
        { name: 'Laptop', quantity: 10, price: 5000000, category: 'Elektronik' },
        { name: 'Kopi', quantity: 50, price: 20000, category: 'Makanan' },
        { name: 'Kaos', quantity: 20, price: 100000, category: 'Pakaian' }
    ];

    const tableBody = document.getElementById("inventoryTable").getElementsByTagName('tbody')[0];
    inventory.forEach(item => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = item.name;
        row.insertCell(1).textContent = item.quantity;
        row.insertCell(2).textContent = `Rp ${parseInt(item.price).toLocaleString()}`;
        row.insertCell(3).textContent = item.category;
        const deleteButton = row.insertCell(4).appendChild(document.createElement("button"));
        deleteButton.textContent = "Hapus";
    });
}
