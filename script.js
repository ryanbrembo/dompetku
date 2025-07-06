document.addEventListener("DOMContentLoaded", () => {
    const transaksi = document.getElementById('transaksi');
    const reset = document.getElementById('reset');
    let inputan = document.getElementById('inputan');
    let saldoEl = document.getElementById('saldo-masuk');

    const inputanKeluar = document.getElementById('inputankeluar');
    const btnKeluar = document.getElementById('btnkeluar');

    const pengeluaran = document.getElementById('pengeluaran');
    const totalSaldoEl = document.getElementById('totalSaldo');



    transaksi.addEventListener('click', () => {

        tambahData();
        saldoBersih();
       

    });

    function formatCurrency(nilai) {
        return new Intl
            .NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximumFractionDigits: 0
            })
            .format(nilai);
    }

    //memformat currency pemasukan
    let saldoMasukAwal = parseInt(localStorage.getItem('saldo-masuk') || 0);
    saldoEl.innerText = formatCurrency(saldoMasukAwal);

    let saldoKeluarAwal = parseInt(localStorage.getItem('pengeluaran') || 0);
    pengeluaran.innerText = formatCurrency(saldoKeluarAwal);

    let totalSaldo = parseInt(localStorage.getItem("saldoBersih") || 0);
    totalSaldoEl.innerText = formatCurrency(totalSaldo);

    function tambahData() {
        const proms = inputan.value.trim();
        inputan.value = '';

        if (proms !== '' && proms !== null) {
            const nilai = Math.floor(parseFloat(proms));

            if (!isNaN(nilai)) {

                //ambil data saldo sebelumnya
                let saldoSebelum = parseInt(localStorage.getItem('saldo-masuk') || 0);
                //penjumlahan saldo sebelum + inputan nilai baru
                let totalSaldo = saldoSebelum + nilai;

                //simpan total saldo baru ke localStorage
                localStorage.setItem('saldo-masuk', totalSaldo);

               

                saldoEl.innerText = formatCurrency(totalSaldo);



                const listMasuk = document.getElementById('list-transaksi');
                const item = document.createElement("li");

                let listSaldoMasuk = parseInt(localStorage.getItem('list-saldo-masuk'));

                localStorage.setItem('list-saldo-masuk', listSaldoMasuk);

                item.innerText = formatCurrency(proms);
                listMasuk.appendChild(item);
                item.style.color = 'green';

                proms.value = '';
            } else {
                alert('nilai harus number');
            }

        } else {
            alert('input tidak bboleh kosong');
        }

    }

    //function untuk reset nilai keseluruhan
    function updateSaldoDisplay() {

        if (saldoEl && pengeluaran && totalSaldoEl) {
            saldoEl.innerText = 'Rp 0';
            pengeluaran.innerText = 'Rp 0';
            totalSaldoEl.innerText = 'Rp 0';

        }
    }

    reset.addEventListener('click', () => {
        localStorage.removeItem('saldo-masuk');
        localStorage.removeItem('pengeluaran');
        localStorage.removeItem('saldoBersih');
        localStorage.removeItem('list-saldo-masuk');
        updateSaldoDisplay();

    });

    // --------------------------

    btnKeluar.addEventListener('click', () => {
        saldoPengeluaran();
        saldoBersih();

    });

    function saldoPengeluaran() {
        const keluaran = inputanKeluar.value;

        if (keluaran !== '' && keluaran !== null) {
            const nilaiKeluar = Math.floor(parseFloat(keluaran));

            if (!isNaN(nilaiKeluar)) {
                const saldoKeluarAwal = parseInt(localStorage.getItem('pengeluaran') || 0);
                totalSaldoKeluar = saldoKeluarAwal + nilaiKeluar;

                localStorage.setItem("pengeluaran", totalSaldoKeluar);

                const formateds = formatCurrency(totalSaldoKeluar);

                pengeluaran.innerText = formateds;
                inputanKeluar.value = '';
            } else {
                alert('harus nomor');

            }
        } else {
            alert('tidak boleh kosong');
        }
    }

    /*----------------SALDO KELUAR-----------------*/

    function saldoBersih() {
        const saldoPemasukan = localStorage.getItem("saldo-masuk");
        const saldoPengeluaran = localStorage.getItem("pengeluaran");
        


        const calculateSaldo = saldoPemasukan - saldoPengeluaran;
        localStorage.setItem('saldoBersih', calculateSaldo);

       
        localStorage.getItem('saldoBersih', calculateSaldo);
        totalSaldoEl.innerText = formatCurrency(calculateSaldo);
    }

});