{% extends './../layouts/_default.swig' %}

{% block content %}
	<div class="container-large">

		<div class="inner-section-divider-small"></div>

		<div style="maring:auto;text-align:center;"
			class="section-label"
		>
			<h1>Welcome to Friends of Chichester Harbour!</h1>
			<h2>Please check your email to complete the sign up process.</h2>
		</div>

		{% if show === true %}
			<div id="check_email_message" class="inner-section-divider-medium">
				<h3>Member email: {{ data.email }}</h3>
				<h3>
					<a id="activation_link" href="/activate?code={{ data.code }}">
						Activation code: {{ data.code }}
					<a>
				</h3>
			</div>
		{% endif %}
	</div>
{% endblock %}