#{% extends './../layouts/_default.swig' %}

{% extends './../layouts/_mobile.swig' %}

{% block content %}
	<div class="main-container">
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

		<br><br><br><br><br><br><br><br>

		<div id="table-payments">
			<div class="table-section-individual">
				<div class="table-section-individual-header">
					<div class="col-1">
						<p>Date</p>
					</div>
					<div class="col-2">
						<p>Description</p>
					</div>
					<div class="col-3">
						<p>Charges</p>
					</div>
					<div class="col-3">
						<p>Payments</p>
					</div>
					<div class="col-4">
						<p>Balance Due</p>
					</div>
					<div class="col-5">
						<p>Reference</p>
					</div>
					<div class="col-6">
						<p>Notes</p>
					</div>
					<div class="col-7">
						<button id="member-delete-payment" class="button-two m-l-15 right w-full red">Del.</button>
					</div>
				</div>
				<div class="table-section-individual-rows"></div>
			</div>
		</div>


		<br><br><br><br><br><br><br><br>


		<div class="refund-section">
			<div class="container-1">
				<div class="title-ctrl">
					<p>Pay subscription</p>
				</div>
				<div class="body-ctrl">
					<div class="gbp">
						<input placeholder="Amount" id="member-controls-subscription-amount" class="input-three">
					</div>
				</div>
				<div class="container-2">
					<button id="member-controls-subscription-pay" class="button-two left">Pay</button>
					<button id="member-controls-subscription-refund" class="button-two right">Refund</button>
				</div>
			</div>
		</div>

		<br><br><br><br><br><br><br><br>

		<div class="add-donation-section">
			<div class="container-1">
				<p>Add donation</p>
				<div class="gbp">
					<input placeholder="Amount" id="member-controls-donation-amount" class="input-three">
				</div>
				<input placeholder="Optional note" id="member-controls-donation-notes" class="input-four">
				<button id="member-controls-donation-pay" class="button-two right full-width margin-top-10">Add</button>
			</div>
		</div>

		<br><br><br><br><br><br><br><br>

		<div class="enter-payment-section">
			<div class="container-1">
				<p>Enter payments</p>
				<select id="member-controls-membership-type" class="mb10">
					<option value="" disabled="">Select type</option><option value="CHQ">CHQ</option><option value="CASH">CASH</option><option value="SOA">SOA</option><option value="SOR">SOR</option><option value="BACSA">BACSA</option><option value="BACSR">BACSR</option><option value="CAFA">CAFA</option><option value="CAFR">CAFR</option><option value="HO">HO</option>
				</select>
				<input placeholder="Payment date" id="member-controls-payment-date" class="input-one">
				<input placeholder="Reference" id="member-controls-payment-reference" class="input-one">
				<input placeholder="Amount £" id="member-controls-payment-amount" class="input-one">
				<input placeholder="Notes" id="member-controls-payment-notes" class="input-two">
				<div>
					<button class="button-two">Close</button>
					<button id="member-controls-payment-enter" class="button-one right">Enter</button>
				</div>
			</div>
		</div>
	</div>

	<br><br><br><br><br><br><br><br>

	<div class="container-large">
		<div class="inner-section-divider-medium"></div>
		<div id="account-component">
			<div class="main-container">
				<div class="inner-section-divider-small"></div>
				<div class="section-label">
					<h1>Account</h1>
				</div>
				<div class="inner-section-divider-small"></div>
						<!-- Single event -->
				<div class="input-label-container">
					<h3>Event 1</h3>
				</div>
				<div class="event-info">
					<p class="date">23/02/90</p>
					<p class="ref">Ref:S3</p>
				</div>
				<!-- <img src="/images/orca.jpg" class="event-img"> -->


				<div style="background-image: url(/images/orca.jpg)" class="event-img"></div>

				<div class="event-info">
					<p class="open">Open for booking: Yes</p>
					<p class="available">Places available: Yes</p>
				</div>
				

					<br><br><br><br><br><br><br><br>


				<div class="inner-section-divider-small"></div>
					<!-- Single event -->
				<div class="input-label-container">
					<h3>Event 1</h3>
				</div>
				<div style="background-image: url(/images/orca.jpg)" class="event-img"></div>
				<div class="single-event-info">
					<p>23/02/90</p>
					<p>Ref:S3</p>
					<p>Open for booking: Yes</p>
					<p>Places available: Yes</p>
					<p>Other information...</p>
					<div class="line"></div>
					<p>Event description</p>
				</div>
			</div>
		</div>
	</div>
</div>
{% endblock %}


