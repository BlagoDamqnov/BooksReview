const passwordRegex = /^(?=.*[A-Za-zА-Яа-яЁё])[A-Za-zА-Яа-яЁё\d@$!%*#?&]{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = {
    passwordRegex,
    emailRegex
}