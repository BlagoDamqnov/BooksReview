const box = document.getElementById('errorBox');
const span = box.querySelector('span');

export function notify(message){
    span.textContent = message;
    box.style.display = 'block';

    setTimeout(()=>box.style.display = 'none',1500);
}