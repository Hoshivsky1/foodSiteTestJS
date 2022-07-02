window.addEventListener('DOMContentLoaded', () => {
    
    //? TABS =====================================================================================
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


    //? TIMER =====================================================================================

    // const deadline = prompt('2022-07-1').split('-');
    const deadline = '2023-07-1';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if ( t <= 0 ) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60) % 24));
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }

              

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days); 
            hours.innerHTML = getZero(t.hours); 
            minutes.innerHTML = getZero(t.minutes); 
            seconds.innerHTML = getZero(t.seconds); 

            if (t.total <= 0 ) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    //?Modal=========================================================================================

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

    
    //?Cards Class==============================================================================================
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...clases) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.clases = clases;
            this.parent = document.querySelector(parentSelector);
            this.tramsfer = 31;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = +this.price * this.tramsfer;
        }

        render() {//!Cтвореня рендеру html
            const element = document.createElement('div');
            if (this.clases.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.clases.forEach(className => element.classList.add(className));
            }
 
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Ціна:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
              </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фітнес"',
        `Меню фітнесу - це новий підхід до приготування їжі: більше 
        свіжих овочів та фруктів.Продукт 
        активних та здорових людей.Це абсолютно новий продукт 
        з оптимальною ціною та високою якістю!`,
        9,
        '.menu .container',
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Преміум"',
        `У меню преміум -класу ми використовуємо не лише прекрасний
        дизайн упаковки, але й високоякісну продуктивність страв.
        Червона риба, морепродукти, фрукти - меню ресторану, не
        заходячи до ресторану!`,
        17,
        '.menu .container',
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Пістне"',
        `Меню “Пістне” - Це ретельний вибір інгредієнтів: повна
        відсутність тваринних продуктів, молока з мигдалю, овес,
        кокосового горіха або гречки, правильна кількість білків 
        за рахунок тофу та імпортних вегетаріанських стейків.`,
        13,
        '.menu .container',
    ).render();

    //?Forms====================================================================================================
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Дякую! Скоро ми звяжимось з вами',
        failure: 'Щось пішло не так!'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto; 
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });

            fetch('server.php', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object),
            })
            .then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                form.reset();
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) { //!Відображає змінене модальне вікно(Подяки, Успіше виконання)
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
});     


