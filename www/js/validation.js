function validator() {
    var regName = /^[A-Za-z0-9_-]{3,16}$/,
        regEmail = /^([A-Za-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        regMessage = /^[\w ]{1,140}$/,
        regExpArray = [regName, regEmail, regMessage],
        userNameInput = $('#username'),
        userEmailInput = $('#useremail'),
        userMessageInput = $('#usermessage'),
        inputsArray = [userNameInput, userEmailInput, userMessageInput],
        inputsAll = $('#username, #useremail, #usermessage');


    for (var i = 0; i<inputsArray.length; i++) {
        inputCheck(inputsArray[i], regExpArray[i]);
    }
    if (inputCheck(inputsArray[0], regExpArray[0]) === true &&
        inputCheck(inputsArray[1], regExpArray[1]) === true &&
        inputCheck(inputsArray[2], regExpArray[2]) === true) {
        inputsAll.parents('.form-group').removeClass('has-success has-error');
        inputsAll.next().css('color', 'red').text('');
        return true;
    } else {
        console.log('Validation error!!!');
        return false;
    }
}

function inputCheck(input, regExp) {
    input.parents('.form-group').removeClass('has-error');
    input.next().css('color', 'red').text('');

    if (input.val().match(regExp)) {
        input.parents('.form-group').addClass('has-success');
        return true;
    } else {
        input.parents('.form-group').addClass('has-error');
        input.focus();

        if (input.val().length === 0) {
            input.next().text('* All fields are mandatory');
            return false;
        } else if (input.val() !== regExp) {
            if (input.selector == "#username") {
                if (input.val().length < 3) {
                    input.next().text('* Should contain at least 3 symbols');
                    return false;
                } else {
                    input.next().text('* Use only A-Z, 0-9, "_" and "-" symbols');
                    return false;
                }
            } else if (input.selector == "#useremail") {
                input.next().text('* Use only A-Z, 0-9, "_", "-" and "." symbols. For instance: example@gmail.com');
                return false;
            } else if (input.selector == "#usermessage") {
                input.next().text('* Can\'t exceed 140 symbols');
                return false;
            }
        } else {
            input.next().text('* Invalid input');
            return false;
        }
    }
}