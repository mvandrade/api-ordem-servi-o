'use strict';

let errors = [];

function ValidationContract() {
    errors = [];
}

ValidationContract.prototype.isRequired = (value, message) => {
    if (!value || value.length <= 0)
        errors.push({ message: message });
}

ValidationContract.prototype.hasMinLen = (value, min, message) => {
    if (!value || value.length < min)
        errors.push({ message: message });
}

ValidationContract.prototype.hasMaxLen = (value, max, message) => {
    if (!value || value.length > max)
        errors.push({ message: message });
}

ValidationContract.prototype.isFixedLen = (value, len, message) => {
    if (value.length != len)
        errors.push({ message: message });
}

ValidationContract.prototype.isEmail = (value, message) => {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value))
        errors.push({ message: message });
}

ValidationContract.prototype.isNumber = (value, message) => {
    var reg = new RegExp(/^[0-9]+(\.([0-9]{1,2})?)?$/)
    if (!reg.test(value))
        errors.push({ message: message });
}

ValidationContract.prototype.isValidIncricaoFederal = (value, type,  message) => {
    if (type == "Física"){
        if ( !value || value.length != 11
            || value == "00000000000"
            || value == "11111111111"
            || value == "22222222222" 
            || value == "33333333333" 
            || value == "44444444444" 
            || value == "55555555555" 
            || value == "66666666666"
            || value == "77777777777"
            || value == "88888888888" 
            || value == "99999999999" )
            errors.push({ message: message });

        var soma = 0
        var resto
        for (var i = 1; i <= 9; i++) 
            soma = soma + parseInt(value.substring(i-1, i)) * (11 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11))  resto = 0
        if (resto != parseInt(value.substring(9, 10)) ) return false
        soma = 0
        for (var i = 1; i <= 10; i++) 
            soma = soma + parseInt(value.substring(i-1, i)) * (12 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11))  resto = 0
        if (resto != parseInt(value.substring(10, 11) ) ) 
            errors.push({ message: message });

    }else{
        if ( !value || value.length != 14
            || value == "00000000000000" 
            || value == "11111111111111" 
            || value == "22222222222222" 
            || value == "33333333333333" 
            || value == "44444444444444" 
            || value == "55555555555555" 
            || value == "66666666666666" 
            || value == "77777777777777" 
            || value == "88888888888888" 
            || value == "99999999999999")
            errors.push({ message: message });

        var tamanho = value.length - 2
        var numeros = value.substring(0,tamanho)
        var digitos = value.substring(tamanho)
        var soma = 0
        var pos = tamanho - 7

        for (var i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--
            if (pos < 2) pos = 9
        }

        var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11

        if (resultado != digitos.charAt(0)) 
            errors.push({ message: message });

        tamanho = tamanho + 1
        numeros = value.substring(0,tamanho)
        soma = 0
        pos = tamanho - 7

        for (var i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--
            if (pos < 2) pos = 9
        }

        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11

        if (resultado != digitos.charAt(1))
             errors.push({ message: message });
    }
}

ValidationContract.prototype.errors = () => { 
    return errors; 
}

ValidationContract.prototype.clear = () => {
    errors = [];
}

ValidationContract.prototype.isValid = () => {
    return errors.length == 0;
}

module.exports = ValidationContract;