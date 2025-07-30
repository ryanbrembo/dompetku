
    
  



 

export function init() { 



   const input = document.getElementById("inputan");
  const btnInputan = document.getElementById("btnSubmit");

  // Inisialisasi array transaksi
  let transaksi = [];

  // Ambil data awal dari localStorage (harus dari key yang sama saat menyimpan)
  const savedData = localStorage.getItem("pemasukan");
  if (savedData) {
    transaksi = JSON.parse(savedData);
  }

  // Tampilkan total awal


  // Event saat tombol ditekan
  function addIncome() {
    btnInputan.addEventListener("click", () => {
    const inputan = input.value.trim();

    if (inputan === '' || inputan === null) {
       alert('kkkl');
      return;
    }
    input.value = '';

    // Tambahkan inputan ke array (pastikan disimpan sebagai angka)
    transaksi.push(Number(inputan));

    // Simpan array ke localStorage
    localStorage.setItem("pemasukan", JSON.stringify(transaksi));

    console.log("Data tersimpan:", transaksi);


console.log('inputan:' , inputan);

    
  });

}

  addIncome();
}