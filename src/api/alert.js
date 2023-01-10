const box = document.getElementById('alert');
const span = box.querySelector('span');

export function successfullyAlert(message){
    span.textContent = message;
    box.style.display = 'block';

    setTimeout(()=>box.style.display = 'none',1500);
}