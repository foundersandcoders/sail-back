<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="/styles/main.css">
        <link href='https://fonts.googleapis.com/css?family=Sorts+Mill+Goudy' rel='stylesheet' type='text/css'>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <!-- Navbar here -->
        <ul class="navigation">
            <li id="nav-home">
                <a href="/admin">Home</a>
            </li>
            <li id="nav-signup">
                <a href="/signup">Signup</a>
            </li>
            <li id="nav-login">
                <a href="/login">Login</a>
            </li>
            <li id="nav-logout">
                <a href="/logout">Logout</a>
            </li>
            <li id="nav-add-member">
                <a href="/addmember">Add member</a>
            </li>
            <li id="nav-data-maintenance">
                <a href="/maintenance">Data maintenance</a>
            </li>
            <li id="nav-reports">
                <a href="#">Reports</a>
            </li>
            <li id="nav-emails">
                <a href="#">Emails</a>
            </li>
        </ul>
            {% block content %}
            {% endblock %}
        <footer>
        </footer>
        <script type="text/javascript" src="/js/app.js"></script>
    </body>
</html>
