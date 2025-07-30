
    
  



  const input = document.getElementById("inputankeluar");
  const btnInputan = document.getElementById("btnkeluar");

  // Inisialisasi array transaksi
  let transaksi = [];

  // Ambil data awal dari localStorage (harus dari key yang sama saat menyimpan)
  const savedData = localStorage.getItem("pengeluaran");
  if (savedData) {
    transaksi = JSON.parse(savedData);
  }

  // Tampilkan total awal


  // Event saat tombol ditekan
  function addExpense() {
    btnInputan.addEventListener("click", () => {
    const inputan = input.value;

    if (inputan === '' || inputan === null) {
       alert('kkkl');
      return;
    }
    input.value = '';

    // Tambahkan inputan ke array (pastikan disimpan sebagai angka)
    transaksi.push(Number(inputan));

    // Simpan array ke localStorage
    localStorage.setItem("pengeluaran", JSON.stringify(transaksi));

    console.log("Data tersimpan:", transaksi);


console.log('klik');

    
  });

}

export function init() { 
  addExpense();
}