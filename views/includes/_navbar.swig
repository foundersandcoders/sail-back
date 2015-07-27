<ul class="navigation">
    <li id="nav-home">
        <a href="/">Home</a>
    </li>
    {% if not user %}
        <li id="nav-signup">
            <a href="#/signup">Signup</a>
        </li>
        <li id="nav-login">
            <a href="#/signin">Signin</a>
        </li>
    {% endif %}
    {% if user %}
        <li id="nav-logout">
            <a href="/account">Account</a>
        </li>
        <li id="nav-logout">
            <a href="/signout">Signout</a>
        </li>
    {% endif %}
    {% if user.privileges === "admin" %}
        <li id="nav-add-member">
            <a href="/admin">Search member</a>
        </li>
        <li id="nav-add-member">
            <a href="/addmember">Add member</a>
        </li>
        <li id="nav-data-maintenance">
            <a href="/maintenance">Data maintenance</a>
        </li>
        <!-- <li id="nav-reports">
            <a href="#">Reports</a>
        </li>
        <li id="nav-emails">
            <a href="#">Emails</a>
        </li> -->
    {% endif %}
</ul>