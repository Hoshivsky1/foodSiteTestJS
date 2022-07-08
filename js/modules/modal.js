function modal() {
    const  modalTrigger = document.querySelectorAll('[data-modal]'),
           modal = document.querySelector('.modal');
        //    modalCloseBtn = document.querySelector('[data-close]');


    
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('show');
            modal.classList.remove('hide');
            // modal.classList.toggle('show');
            document.body.style.overflow = 'hidden';  //!забороняє крутити в низ або в верх сторінки
        });
    });
    
    function showModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';  //!забороняє крутити в низ або в верх сторінки
        clearInterval(modalTimer);//!якщомодалье вікно відкрито власно руч то інтервал більше не буде працювати!
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow = '';  //!забороняє крутити в низ або в верх сторінки
    }

    // modalCloseBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => { //*вимкунити нажаттям за модальне вікно
        if( e.target === modal || e.target.getAttribute('data-close') == '') {
           closeModal();
        }
    });

    document.addEventListener('keydown', (e) => { //*Вимкнути нажаттям на "Escape"
        if(e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimer =  setInterval(showModal, 6000);

    function  showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) { 
            //!-1 в кіні условія, може допомогти якщо не буде працювати
            showModal();
            window.removeEventListener('scroll', showModalByScroll); //!появляэться в кінці тільки 1 раз!
            clearInterval(modalTimer);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;