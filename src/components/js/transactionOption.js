

const optionPemasukan = document.getElementById('btnOptionPemasukan');
const optionPengeluaran = document.getElementById('btnOptionPengeluaran');


    if (optionPemasukan) {
 optionPemasukan.addEventListener('click', () => {
       
        history.pushState({ page: 'formPemasukan' }, '', '?page=formPemasukan');
      console.log('bisa');
      loadPage('formPemasukan');
    });

    }
   
     optionPengeluaran.addEventListener('click', () => {
        if (window.navigateToPage) {
        window.navigateToPage('formPengeluaran');
        history.pushState({ page: 'formPengeluaran' }, '', '#formPengeluaran');
      }
    });

    export function init() {
    

}