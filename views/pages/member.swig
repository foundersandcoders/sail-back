{% extends './../layouts/_default.swig' %}

{% block content %}
	<div class="full-screen-fixed-members">
	    <p id="member-id" style="display:none">{{member.id}}</p>
	    <p id="member-status" style="display:none">{{member.status}}</p>
	    <p id="member-type" style="display:none">{{member.membership_type}}</p>
	</div>
{% endblock %}