<!DOCTYPE html>
<html>
    <head>
        {% block head %}
            {% include "../includes/_head.swig" %}
        {% endblock %}  
    </head>
    <body>
        <!-- Navbar here -->
        {% block navbar %}
            {% include "../includes/_navbar.swig" %}
        {% endblock %}
        <!-- Page content -->
        {% block content %}
        {% endblock %}

        <footer>
            {% block footer %}
                {% include "../includes/_footer.swig" %}
            {% endblock %}
        </footer>
            {% block scripts %}
                {% include "../includes/_scripts.swig" %}
            {% endblock %}
        <script type="text/javascript" src="/js/bundle.js"></script>
    </body>
</html>