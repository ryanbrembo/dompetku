document.addEventListener("DOMContentLoaded", () => {
    const transaksi = document.getElementById('transaksi');
    const reset = document.getElementById('reset');
    let inputan = document.getElementById('inputan');
    let saldoEl = document.getElementById('saldo-masuk');

    const inputanKeluar = document.getElementById('inputankeluar');
    const btnKeluar = document.getElementById('btnkeluar');

    const pengeluaran = document.getElementById('pengeluaran');
    const totalSaldoEl = document.getElementById('totalSaldo');
    const transaksiListEl = document.getElementById('list-transaksi');

    let transaction = [];

    function formatCurrency(nilai) {
        return new Intl
            .NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximumFractionDigits: 0
            })
            .format(nilai);
    }

    function loadInitialData() {
        const storedTransactions = localStorage.getItem('transactions');
        if (storedTransactions) {
            transaction = JSON.parse(storedTransactions);
        }
        updateUI();
    }

    function simpanDataLocalStorage() {
        localStorage.setItem('saldo-masuk', saldoEl.innerText.replace(/\D/g, ''));
        localStorage.setItem('pengeluaran', pengeluaran.innerText.replace(/\D/g, ''));
        localStorage.setItem('saldoBersih', totalSaldoEl.innerText.replace(/\D/g, ''));
        localStorage.setItem('transactions', JSON.stringify(transaction));
    }

    function updateUI() {
        let currentIncome = 0;
        let currentExpense = 0;

        transaction.forEach(trans => {
            if (trans.type === 'pemasukan') {
                currentIncome += trans.amount;
            } else if (trans.type === 'pengeluaran') {
                currentExpense += trans.amount;
            }
        });

        saldoEl.innerText = formatCurrency(currentIncome);
        pengeluaran.innerText = formatCurrency(currentExpense);

        const netBalance = currentIncome - currentExpense;
        totalSaldoEl.innerText = formatCurrency(netBalance);

        transaksiListEl.innerHTML = '';
        transaction.forEach((trans, index) => {
            const listItem = document.createElement("li");
            listItem.className = `flex justify-between items-center p-3 rounded-lg mb-2 ${trans.type === 'pemasukan' ? 'bg-green-50' : 'bg-red-50'}`;

            listItem.innerHTML = `
                <div class="">
                    <p class="font-semibold ${trans.type === 'pemasukan' ? 'text-green-700' : 'text-red-700'}">
                        ${trans.type === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}
                    </p>
                    <p class="text-xs text-gray-500">${trans.date}</p>
                </div>
                <p class="font-bold text-lg ${trans.type === 'pemasukan' ? 'text-green-600' : 'text-red-600'}">
                    ${formatCurrency(trans.amount)}
                </p>
                <button class="ml-4 px-2 py-1 bg-red-400 text-white rounded hover:bg-red-600" data-index="${index}">Hapus</button>
            `;
            transaksiListEl.appendChild(listItem);
        });

        simpanDataLocalStorage();
    }

    transaksiListEl.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Hapus') {
            const indexToDelete = parseInt(e.target.dataset.index);
            transaction.splice(indexToDelete, 1);
            updateUI();
        }
    });

    function tambahData() {
        const proms = inputan.value;

        if (proms === '' || proms === null) {
            alert('Input tidak boleh kosong');
            return;
        }

        const nilai = parseFloat(proms);
        if (isNaN(nilai) || nilai <= 0) {
            alert('Nilai harus angka positif');
            return;
        }

        transaction.push({
            type: 'pemasukan',
            amount: nilai,
            date: new Date().toLocaleString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        });

        inputan.value = '';
        updateUI();
    }

    function saldoPengeluaran() {
        const keluaran = inputanKeluar.value;

        if (keluaran === '' || keluaran === null) {
            alert('Input tidak boleh kosong');
            return;
        }

        const nilaiKeluar = parseFloat(keluaran);
        if (isNaN(nilaiKeluar) || nilaiKeluar <= 0) {
            alert('Harus nomor positif');
            return;
        }

        transaction.push({
            type: 'pengeluaran',
            amount: nilaiKeluar,
            date: new Date().toLocaleString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        });

        inputanKeluar.value = '';
        updateUI();
    }

    reset.addEventListener('click', () => {
        localStorage.clear();
        transaction = [];
        updateUI();
    });

    transaksi.addEventListener('click', () => {
        tambahData();
    });

    btnKeluar.addEventListener('click', () => {
        saldoPengeluaran();
    });

    loadInitialData();
});