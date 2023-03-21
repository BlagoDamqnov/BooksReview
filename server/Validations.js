const passwordRegex = /^(?=.*[A-Za-zА-Яа-яЁё])[A-Za-zА-Яа-яЁё\d@$!%*#?&]{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const inputValidate = /^[\'][A-Za-z \d\=\-]+$/;

module.exports = {
    passwordRegex
    ,emailRegex
    ,inputValidate
}