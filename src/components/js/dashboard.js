



const button = document.getElementById("addTransaction");
const incomeEl = document.getElementById("saldo-masuk");
const totalSaldoEl = document.getElementById("totalSaldo");
const expenEl = document.getElementById("pengeluaran");
const btnReset = document.getElementById("reset"); // ✅ sekarang DOM-nya sudah siap

const saldoIncome = JSON.parse(localStorage.getItem("pemasukan")) || [];
const saldoExpens = JSON.parse(localStorage.getItem("pengeluaran")) || [];


function addTransaction() {
  if (button) {
    button.addEventListener("click", () => {
      // Ini memanggil router SPA untuk memuat halaman transaksi
      history.pushState({page: 'transactionOption'}, '', `?page=transactionOption`);
      console.log("addDashbord klik");
      loadPage('transactionOption');
    });
  }
}

// Hitung total income dan tampilkan
function updateUI() {
  const totalIncome = saldoIncome.reduce((acc, val) => acc + Number(val), 0);
  if (incomeEl) {
    incomeEl.textContent = "Rp " + totalIncome.toLocaleString("id-ID");
  }

  // Hitung total pengeluaran dan tampilkan
  const totalExpens = saldoExpens.reduce((acc, val) => acc + Number(val), 0);
  if (expenEl) {
    expenEl.textContent = "Rp " + totalExpens.toLocaleString("id-ID");
  }

  // Hitung saldo akhir dan tampilkan
  const totalSaldo = totalIncome - totalExpens;
  if (totalSaldoEl) {
    totalSaldoEl.textContent = "Rp " + totalSaldo.toLocaleString("id-ID");
  }
}

function reset() {
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      console.log("Reset ditekan");
      localStorage.removeItem("pemasukan");
      localStorage.removeItem("pengeluaran");
      
    });
  } else {
    console.warn("Tombol reset tidak ditemukan.");
  }
updateUI();

}




export function init() {
addTransaction();

}