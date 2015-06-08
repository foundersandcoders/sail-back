<div id="member-info">
	<div class="member-info-controls">
		<button id="edit-member-mode" class="button-two m-l-15 right w-100">Edit</button>
	</div>
	<div class="member-info-content">
		<div class="col-1">
			<h2>Personal info</h2>
			<p>
				<span class="info">Name: </span><span id="view-member-name-">Mr Besart Hoxhaj</span>
			</p>
			<p>
				<span class="info">ID: </span><span id="view-member-id-">44b9b78c-2045-4e69-8645-530320e63c35</span>
			</p>
			<p>
				<span class="info">Primary email: </span><span id="view-member-primary-email">bes@gmail.com</span>
			</p>
			<p>
				<span class="info">News: </span><span id="view-member-news-">Online</span>
			</p>
		</div>
		<div class="col-2">
			<h2>Address info</h2>
			<p>
				<span class="info">Mobile phone: </span><span id="view-member-mobile-phone">+447432821547</span>
			</p>
		</div>
		<div class="col-3">
			<h2>Membership info</h2>
			<p>
				<span class="info">Date joined: </span><span id="view-member-date-joined">Invalid date</span>
			</p>
			<p>
				<span class="info">GAD Signed: </span><span id="view-member-gad-signed">Invalid date</span>
			</p>
			<p>
				<span class="info">GAD cancelled: </span><span id="view-member-gad-cancelled">Invalid date</span>
			</p>
			<p>
				<span class="info">Standing order: </span><span id="view-member-standing-order">No</span>
			</p>
			<p>
				<span class="info">Status online: </span><span id="view-member-status-online">Registered</span>
			</p>
			<p>
				<span class="info">Due date: </span><span id="view-member-due-date">Invalid date</span>
			</p>
		</div>
	</div>
</div>

#{% extends './../layouts/_default.swig' %}

{% extends './../layouts/_mobile.swig' %}

{% block content %}
	<div class="main-container">

		<div class="inner-section-divider-small"></div>

		<div class="section-label">

			<h1>My account</h1>
		</div>

		<div class="container-small">

			<div class="inner-section-divider-small"></div>

			<div class="table-payments">
				<div class="header">
					<div class="item">
						<p class="meta">Date</p>
					</div>
					<div class="item-desc">
						<p class="meta">Description</p>
					</div>
					<div class="item-less">
						<p class="meta">Charge</p>
					</div>
					<!-- <div class="item-less">
						<p class="meta">Bal</p>
					</div> -->
				</div>
				<div class="body">
					<div class="row">
						<div class="item">
							<p class="micro">24 Jan 16</p>
						</div>
						<div class="item-desc">
							<p class="micro">Hello world</p>
						</div>
						<div class="item-less">
							<p class="micro">£ 45</p>
						</div>
						<!-- <div class="item-less">
							<p class="micro">£ 20</p>
						</div> -->
					</div>
					<div class="row">
						<div class="item">
							<p class="micro">12 Mar 16</p>
						</div>
						<div class="item-desc">
							<p class="micro">Nice foo bar</p>
						</div>
						<div class="item-less">
							<p class="micro">£ 20</p>
						</div>
						<!-- <div class="item-less">
							<p class="micro">£ 20</p>
						</div> -->
					</div>
					<div class="row">
						<div class="item">
							<p class="micro">12 Mar 16</p>
						</div>
						<div class="item-desc">
							<p class="micro">Nice foo bar</p>
						</div>
						<div class="item-less">
							<p class="micro">£ 20</p>
						</div>
						<!-- <div class="item-less">
							<p class="micro">£ 20</p>
						</div> -->
					</div>
					<div class="row">
						<div class="item">
							<p class="micro">12 Mar 16</p>
						</div>
						<div class="item-desc">
							<p class="micro">Nice foo bar</p>
						</div>
						<div class="item-less">
							<p class="micro">£ 20</p>
						</div>
						<!-- <div class="item-less">
							<p class="micro">£ 20</p>
						</div> -->
					</div>
					<div class="row">
						<div class="item">
							<p class="micro">12 Mar 16</p>
						</div>
						<div class="item-desc">
							<p class="micro">Nice foo bar</p>
						</div>
						<div class="item-less">
							<p class="micro">£ 20</p>
						</div>
						<!-- <div class="item-less">
							<p class="micro">£ 20</p>
						</div> -->
					</div>
					<div class="row">
						<div class="item">
							<p class="micro">12 Mar 16</p>
						</div>
						<div class="item-desc">
							<p class="micro">Nice foo bar</p>
						</div>
						<div class="item-less">
							<p class="micro">£ 20</p>
						</div>
						<!-- <div class="item-less">
							<p class="micro">£ 20</p>
						</div> -->
					</div>
					<div class="row">
						<div class="item">
							<p class="micro">12 Mar 16</p>
						</div>
						<div class="item-desc">
							<p class="micro">Nice foo bar</p>
						</div>
						<div class="item-less">
							<p class="micro">£ 20</p>
						</div>
						<!-- <div class="item-less">
							<p class="micro">£ 20</p>
						</div> -->
					</div>
					<div class="row">
						<div class="item">
							<p class="micro">12 Mar 16</p>
						</div>
						<div class="item-desc">
							<p class="micro">Nice foo bar</p>
						</div>
						<div class="item-less">
							<p class="micro">£ 20</p>
						</div>
						<!-- <div class="item-less">
							<p class="micro">£ 20</p>
						</div> -->
					</div>
					<div class="row">
						<div class="item">
							<p class="micro">12 Mar 16</p>
						</div>
						<div class="item-desc">
							<p class="micro">Nice foo bar</p>
						</div>
						<div class="item-less">
							<p class="micro">£ 20</p>
						</div>
						<!-- <div class="item-less">
							<p class="micro">£ 20</p>
						</div> -->
					</div>
					<div class="row">
						<div class="item">
							<p class="micro">12 Mar 16</p>
						</div>
						<div class="item-desc">
							<p class="micro">Nice foo bar</p>
						</div>
						<div class="item-less">
							<p class="micro">£ 20</p>
						</div>
						<!-- <div class="item-less">
							<p class="micro">£ 20</p>
						</div> -->
					</div>
					<div class="row">
						<div class="item">
							<p class="micro">12 Mar 16</p>
						</div>
						<div class="item-desc">
							<p class="micro">Nice foo bar</p>
						</div>
						<div class="item-less">
							<p class="micro">£ 20</p>
						</div>
						<!-- <div class="item-less">
							<p class="micro">£ 20</p>
						</div> -->
					</div>
					<div class="row">
						<div class="item">
							<p class="micro">12 Mar 16</p>
						</div>
						<div class="item-desc">
							<p class="micro">Nice foo bar</p>
						</div>
						<div class="item-less">
							<p class="micro">£ 20</p>
						</div>
						<!-- <div class="item-less">
							<p class="micro">£ 20</p>
						</div> -->
					</div>
					<div class="row">
						<div class="item">
							<p class="micro">12 Mar 16</p>
						</div>
						<div class="item-desc">
							<p class="micro">Nice foo bar</p>
						</div>
						<div class="item-less">
							<p class="micro">£ 20</p>
						</div>
						<!-- <div class="item-less">
							<p class="micro">£ 20</p>
						</div> -->
					</div>
					<div class="row">
						<div class="item">
							<p class="micro">12 Mar 16</p>
						</div>
						<div class="item-desc">
							<p class="micro">Nice foo bar</p>
						</div>
						<div class="item-less">
							<p class="micro">£ 20</p>
						</div>
						<!-- <div class="item-less">
							<p class="micro">£ 20</p>
						</div> -->
					</div>
					<div class="row">
						<div class="item">
							<p class="micro">12 Mar 16</p>
						</div>
						<div class="item-desc">
							<p class="micro">Nice foo bar</p>
						</div>
						<div class="item-less">
							<p class="micro">£ 20</p>
						</div>
						<!-- <div class="item-less">
							<p class="micro">£ 20</p>
						</div> -->
					</div>
				</div>
			</div>

			<div class="inner-section-divider-medium"></div>

			<div class="input-label-container">
				<h3>Subscription</h3>
			</div>

			<div class="input-label-container">
				<h4>Your annual subscription is due on 12-12-2012 pay it now ? </h4>
			</div>
			<div class="block">
				<button 
					id="button_sign_up"
					class="btn-primary align-one"
				>Yes please</button>

				<button 
					id="button_sign_up"
					class="btn-primary align-two"
				>No thanks</button>
			</div>

			<div class="inner-section-divider-medium"></div>

			<div class="input-label-container">
				<h3>Donation</h3>
			</div>
			<div class="block">
				<input 
					class="align-one"
					type="text"
					placeholder="Amount"
				>
				<button 
					id="button_sign_up"
					class="btn-primary align-two"
				>Add</button>
			</div>
		</div>


<br><br><br><br><br><br><br><br>
<br><br><br><br><br><br><br><br>


	<div class="main-container">

		<div class="inner-section-divider-small"></div>

		<div class="section-label">

			<h1>Payment method</h1>
		</div>

		<div class="container-small">

			<div class="inner-section-divider-medium"></div>

			<button 
				id="button_sign_up"
				class="btn-primary"
			>Credit Card</button>

			<div class="inner-section-divider-small"></div>

			<button 
				id="button_sign_up"
				class="btn-primary"
			>PayPal</button>

			<div class="inner-section-divider-small"></div>

			<button 
				id="button_sign_up"
				class="btn-primary"
			>Bank transfer</button>

			<div class="inner-section-divider-small"></div>

			<button 
				id="button_sign_up"
				class="btn-primary"
			>Cheque</button>
		</div>


<br><br><br><br><br><br><br><br>
<br><br><br><br><br><br><br><br>


	<div class="main-container">

		<div class="inner-section-divider-small"></div>

		<div class="section-label">

			<h1>Login</h1>
		</div>

		<div class="container-small">


			<div class="inner-section-divider-medium"></div>


			<div class="input-label-container">
				<h3>Membership number</h3>
			</div>
			<input type="text", placeholder="Membership number">


			<div class="inner-section-divider-small"></div>


			<div class="input-label-container">
				<h3>... or email</h3>
			</div>
			<input type="text", placeholder="Email">


			<div class="inner-section-divider-small"></div>


			<div class="input-label-container">
				<h3>Password</h3>
			</div>
			<input type="password", placeholder="Password">


			<div class="inner-section-divider-medium"></div>


			<div class="input-label-container">
				<a href="#">Forgot password</a>
				<h4>If you are an existing member who is logging in for the first time please click "Forgot Password" and we’ll email you a temporary one.</h4>
			</div>


			<div class="inner-section-divider-medium"></div>


			<button 
				id="button_sign_up"
				class="btn-primary"
			>Login</button>
		</div>


<br><br><br><br><br><br><br><br>
<br><br><br><br><br><br><br><br>

	
	<div class="main-container">

		<div class="inner-section-divider-small"></div>

		<div class="section-label">

			<h1>Login</h1>
		</div>

		<div class="container-small">


			<div class="inner-section-divider-medium"></div>


			<div class="input-label-container">
				<h3>Membership number</h3>
			</div>
			<input type="text", placeholder="Membership number">


			<div class="inner-section-divider-small"></div>


			<div class="input-label-container">
				<h3>... or email</h3>
			</div>
			<input type="text", placeholder="Email">


			<div class="inner-section-divider-small"></div>


			<div class="input-label-container">
				<h3>Password</h3>
			</div>
			<input type="password", placeholder="Password">


			<div class="inner-section-divider-medium"></div>


			<div class="input-label-container">
				<a href="#">Forgot password</a>
				<h4>If you are an existing member who is logging in for the first time please click "Forgot Password" and we’ll email you a temporary one.</h4>
			</div>


			<div class="inner-section-divider-medium"></div>


			<button 
				id="button_sign_up"
				class="btn-primary"
			>Login</button>
		</div>
{% endblock %}



			<!-- <input 
				id="email"
				type="text" 
				name="email" 
				tabindex=1 
				placeholder="Email address"
			>

			<div class="inner-section-divider-small"></div>

			<input 
				id="confirm-email"
				type="text" 
				name="cemail" 
				tabindex=2 
				placeholder="Confirm email address"
			>

			<div class="inner-section-divider-small"></div>

			<input 
				id="password" 
				type="password" 
				name="password" 
				tabindex=3 
				placeholder="Password"
			>

			<div class="inner-section-divider-small"></div>

			<input 
				id="confirm-password" 
				type="password" 
				name="cpassword" 
				tabindex=4 
				placeholder="Confirm password"
			>

			<div class="inner-section-divider-small"></div>

			<button 
				id="button_sign_up"
				class="btn-primary"
			>Next</button> -->