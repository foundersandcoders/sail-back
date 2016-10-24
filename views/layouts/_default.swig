<!DOCTYPE html>
<html moznomarginboxes>
    <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
        {% block head %}
            {% include "../includes/_head.swig" %}
        {% endblock %}
    </head>
    <body>
        <div id="wrap">
            <div id="main">
                <!-- Navbar here -->
                <!-- Page content -->
                {% block content %}
                {% endblock %}
            </div>
        </div>
    </body>
</html>
