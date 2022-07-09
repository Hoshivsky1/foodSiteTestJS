function showModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';  //!забороняє крутити в низ або в верх сторінки
    
    if(modalTimerId){
        clearInterval();//!якщомодалье вікно відкрито власно руч то інтервал більше не буде працювати!
    }
    
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    // modal.classList.toggle('show');
    document.body.style.overflow = '';  //!забороняє крутити в низ або в верх сторінки
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    
    const  modalTrigger = document.querySelectorAll(triggerSelector),
           modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => showModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => { //*вимкунити нажаттям за модальне вікно
        if( e.target === modal || e.target.getAttribute('data-close') == "") {
           closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => { //*Вимкнути нажаттям на "Escape"
        if(e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function  showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) { 
            //!-1 в кіні условія, може допомогти якщо не буде працювати
            showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); //!появляэться в кінці тільки 1 раз!
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}
 
export default modal;
export {closeModal};
export {showModal};