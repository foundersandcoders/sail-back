<!DOCTYPE html>
<html>
    <head>
        {% block head %}
            {% include "../includes/_head.swig" %}
        {% endblock %}  
    </head>
    <body>
        <div id="wrap">
            {% block content %}
            {% endblock %}
        </div>

        {% block footer %}
            {% include "../includes/_footer.swig" %}
        {% endblock %}

        {% block scripts %}
            {% include "../includes/_scripts.swig" %}
        {% endblock %}
    </body>
</html>