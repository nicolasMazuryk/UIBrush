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
    // Load all saved requests from database
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
})();
