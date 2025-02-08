const nav = document.querySelector("nav");
const hambutton = document.querySelector('#menu');
hambutton.addEventListener('click', () => {
	nav.classList.toggle('show');
	hambutton.classList.toggle('show');

});