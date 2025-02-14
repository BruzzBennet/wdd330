const pin1 = document.querySelector('#pin1');
const pin2 = document.querySelector('#pin2');
const pin3 = document.querySelector('#pin3');
const pin4 = document.querySelector('#pin4');

function pin(pinner){
    pinner.addEventList('click', () => {
        pinner.classList.toggle('clicked');
    });
}

pin(pin1);
pin(pin2);
pin(pin3);
pin(pin4);
