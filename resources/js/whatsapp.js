import { showObject, hideObject } from "./scrollPopUp.js";

const wpp = document.querySelector('#whatsapp');
let timeout, hovered = false, focused = false;

window.addEventListener('scroll', () => {
    if(timeout) clearTimeout(timeout);

    showObject(wpp);

    if(timeout && !hovered && !focused) { timeout = setTimeout(() => { hideObject(wpp); }, 3000); } /* Preciso checar o porque disso estar funcionando */
});

wpp.addEventListener('mouseover', () => {
    if(timeout) clearTimeout(timeout);

    showObject(wpp);

    hovered = true;
});

wpp.addEventListener('mouseleave', () => {
    hovered = false;

    timeout = setTimeout(() => { hideObject(wpp); }, 1500);
});

wpp.addEventListener('focus', () => {
    if(timeout) clearTimeout(timeout);

    showObject(wpp);

    focused = true;
});

wpp.addEventListener('blur', () => {
    focused = false;

    timeout = setTimeout(() => { hideObject(wpp); }, 1500);
});