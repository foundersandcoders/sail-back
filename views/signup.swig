{% extends './layout.swig' %}

<div class="container-large">

	<div class="inner-section-divider-small"></div>

	<div style="maring:auto;text-align:center;"
		class="section-label"
	>
		<h1>Sign Up</h1>
	</div>

	<div class="inner-section-divider-medium"></div>

	<div class="container-small">
		<form action="/signup" method="post">

			<input style="margin-bottom: 10px;"
				id="email"
				type="text" 
				name="email" 
				tabindex=1 
				placeholder="Email adress"
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
			<input style="margin-bottom: 10px;"
				id="cpassword" 
				type="password" 
				name="cpassword" 
				tabindex=2 
				placeholder="Confirm Password"
			>
			<div class="inner-section-divider-small"></div>
			<button 
				id="button_sign_up"
				type="submit"
				class="btn-primary"
			>Sign up</button>
		</form>
	</div>
</div>