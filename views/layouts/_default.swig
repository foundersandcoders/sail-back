<!DOCTYPE html>
<html moznomarginboxes>
    <head>
        {% block head %}
            {% include "../includes/_head.swig" %}
        {% endblock %}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
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

        {% block footer %}
            {% include "../includes/_footer.swig" %}
        {% endblock %}

        {% block scripts %}
            {% include "../includes/_scripts.swig" %}
        {% endblock %}
    </body>
</html>
