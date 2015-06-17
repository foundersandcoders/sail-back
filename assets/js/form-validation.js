;(function () {

    var form = document.getElementById('create-member-form');

    form.addEventListener("submit", function (event) {
        // if (!check(email, 1)) {
        //     email.focus();
        //     email.className = 'invalid';
        //     event.preventDefault();
        // }
        // if (!check(password, 1)) {
        //     password.focus();
        //     password.className = 'invalid';
        //     event.preventDefault();
        // }
        console.log(event);
        event.preventDefault();
    },false);

    function check (e, b) {
        return e.value.length < b ? false : true;
    };
}());