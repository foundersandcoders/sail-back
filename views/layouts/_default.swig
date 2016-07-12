<!DOCTYPE html>
<html moznomarginboxes>
    <head>
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

        {% block footer %}
            {% include "../includes/_footer.swig" %}
        {% endblock %}

        {% block scripts %}
            {% include "../includes/_scripts.swig" %}
        {% endblock %}
    </body>
</html>
