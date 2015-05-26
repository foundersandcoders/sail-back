{% extends './../layouts/_default.swig' %}

{% block content %}
	<div class="container-large">

		<div class="inner-section-divider-small"></div>

		<div style="maring:auto;text-align:center;"
			class="section-label">
			<h1>Sign In</h1>
		</div>

		<div class="inner-section-divider-medium"></div>

		<div class="container-small">
			<form action="/signin" method="POST">

				<input style="margin-bottom: 10px;"
					id="email" 
					type="text" 
					name="username"
					tabindex=1 
					placeholder="Email address"
				>
				<div class="inner-section-divider-small"></div>
				<input style="margin-bottom: 10px;"
					id="password" 
					type="password" 
					name="password" 
					tabindex=2 
					placeholder="Password"
				>
				<div class="inner-section-divider-small"></div>
				<button id="button_sign_in" type="submit" class="btn-primary">Sign in</button>
			</form>
		</div>
	</div>
{% endblock %}