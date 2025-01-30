// Data pengguna yang disimpan (misalnya, di server atau local storage)
const users = [
    { username: "admin", password: "admin123" },
    { username: "user1", password: "user123" }
];

// Login Form
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginError = document.getElementById("loginError");

    // Validasi login
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Jika login berhasil, simpan informasi login (misalnya, di localStorage) dan redirect ke beranda
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("username", username);
        window.location.href = "dashboard.html"; // Arahkan ke beranda
    } else {
        // Tampilkan pesan error
        loginError.textContent = "Username atau Password salah!";
    }
});
