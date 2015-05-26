{% extends './../layouts/_default.swig' %}

{% block content %}
    <div class="full-screen-fixed">

        {% block navbar %}
            {% include "../includes/_navbar.swig" %}
        {% endblock %}

        <div class="overall-container-member">
            <div style="maring:auto;text-align:center;"
                class="section-label"
            >
                <h1>Search member</h1>
            </div>
        </div>
    </div>
{% endblock %}