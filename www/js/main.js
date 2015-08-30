(function () {

    function xhr() {
        var xmlHttp;

        if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        } else {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
        }
        return xmlHttp;
    }

    // Load all requests from database
    $(document).ready(function(){
        var request = xhr();

        request.open('GET', 'http://localhost:2000/onload');
        request.send(null);
        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var responseParsed = JSON.parse(this.responseText);
                for (var i = 0; i < responseParsed.requests.length; i++) {
                    $('table tbody').append('<tr><td>' + responseParsed.requests[i].id + '</td><td>' + responseParsed.requests[i].name + '</td><td>' + responseParsed.requests[i].email + '</td><td>' + responseParsed.requests[i].message + '</td><td class="btn btn-default"><span class="glyphicon glyphicon-remove"></span></td></tr>');
                }
            }
        }
    });
    // Submit-button event-handler
    $(document).on('click', '#submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        function initRequest() {
            var request = xhr(),
                postData = $('#contact-form').serialize();

            request.open('POST', 'http://localhost:2000/submit');
            request.onreadystatechange = responseHandler;
            request.send(postData);
            // LOADER ICON
            //$('#loading').bind("ajaxSend", function(){
            //    $(this).show();
            //}).bind("ajaxComplete", function(){
            //    setTimeout(function() {
            //        $(this).hide();
            //    }, 500);
            //});
        }
            
        function responseHandler() {
            if (this.readyState == 4 && this.status == 200) {
                var responseParsed = JSON.parse(this.responseText);
                $('table tbody').append('<tr><td>' + responseParsed.id + '</td><td>' + responseParsed.name + '</td><td>' + responseParsed.email + '</td><td>' + responseParsed.message + '</td><td class="btn btn-default"><span class="glyphicon glyphicon-remove"></span></td></tr>');
            } else if (this.readyState == 4 && this.status == 404) {
                $('body').append('<h1>' + this.responseText + '</h1>');
            }
                // Clear the form values
            $('#username, #useremail, #usermessage').val('');
        }

        validator() ? initRequest() : console.log('Validation failure!');
    });
    // remove Request from database
    $(document).on('click', 'table td.btn', function () {
        var request = xhr(),
            removeRowId = $(this).parents('tr').find('td:first-child').text();
        request.open('POST', 'http://localhost:2000/remove');
        request.send(removeRowId);
        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        };
        $(this).parents('tr').remove();
    });
    // Form inputs validation
    function validator() {
        var regName = /^[A-Za-z0-9_-]{3,16}$/,
            regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
            regMessage = /./,
            userNameInput = $('#username'),
            userEmailInput = $('#useremail'),
            userMessageInput = $('#usermessage'),
            inputsAll = $('#username, #useremail, #usermessage');

        if (inputCheck(userNameInput, regName) === true &&
            inputCheck(userEmailInput, regEmail) === true &&
            inputCheck(userMessageInput, regMessage) === true) {
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

        if (input.val().length === 0) {
            input.parents('.form-group').addClass('has-error');
            input.next().text('* All fields are mandatory');
            input.focus();
            return false;

        } else if (input.val().match(regExp)) {
            input.parents('.form-group').addClass('has-success');
            input.next().css('color', 'green').text('* Valid input');
            return true;
        } else {
            input.parents('.form-group').addClass('has-error');
            input.next().text('* Invalid input');
            input.focus();
            return false;
        }
    }

    slider();

})();

// my changes for git commit