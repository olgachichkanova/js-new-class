'use strict'
/*add post*/
const modalAdd = document.querySelector('.modal__add');
const addAd = document.querySelector('.add__ad');
const modalBtnSubmit = document.querySelector('.modal__btn-submit');
const modalSubmit = document.querySelector('.modal__submit'); 

const catalog = document.querySelector('.catalog');
const modalItem = document.querySelector('.modal__item');

const elementsModalSubmit = [...modalSubmit.elements].filter(elem => elem.tagName !== 'BUTTON');
const modalBtnWarning = document.querySelector('.modal__btn-warning');

const dataBase = [];
/*modal windows closing function*/
const closeModal = function (event) {
    const target = event.target;

    if (target.classList.contains('modal__close') ||
    target === this){
        this.classList.add('hide');
        modalSubmit.reset();
    }
}

/*modal windows closing function by Esc*/
const closeModalEsc = event => {
    if (event.code === 'Escape'){
        modalItem.classList.add('hide');
        modalAdd.classList.add('hide');
        document.removeEventListener('keydown', closeModalEsc);
    }
 }

 modalSubmit.addEventListener('input', () => {
     const validForm = elementsModalSubmit.every(elem => elem.value);
     modalBtnSubmit.disabled = !validForm;
     /*if valid form true return none, else return ''*/
     modalBtnWarning.style.display = validForm ? 'none' : '';
    });

    modalSubmit.addEventListener('submit', event => {
        event.preventDefault();
        const itemObj = {};

        for(const elem of elementsModalSubmit) {
            itemObj[elem.name] = elem.value;
        }

        dataBase.push(itemObj);

        modalSubmit.reset();
        
       });
/*open modal window add Ad*/
addAd.addEventListener('click', () => {
     modalAdd.classList.remove('hide');
     modalBtnSubmit.disabled = true;
     document.addEventListener('keydown', closeModalEsc);
 });

 /*Close modal window add Ad*/
 modalAdd.addEventListener('click', closeModal);

/*catalog items*/
catalog.addEventListener('click', event => {
    const target = event.target;

    if (target.closest('.card')){
        modalItem.classList.remove('hide');
        document.addEventListener('keydown', closeModalEsc);
     }
});

/*Close modal window item*/
modalItem.addEventListener('click', closeModal);

