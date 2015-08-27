'use strict'

var React = require('react')

var Navigation = require('../../shared/navigation.js')

var SectionTitle = React.createClass({
  render: function () {
    return (
	<div className='topSectionDividor'>
	<h2>{this.props.title}</h2>
	</div>
    )
  }
})

var Input = React.createClass({
  render: function () {
    var required = !!this.props.required
    return (
	<div className='innerSectionContainer'>
	<div className='inner-section-divider-medium'>
	<h3>{this.props.label}</h3>
	<input id={this.props.id} className={this.props.size} name={this.props.name} required={required} placeholder={this.props.placeholder} value={this.props.value} />
      </div>
      </div>
    )
  }
})

var create_inputs = function (mappable) {
  return mappable.map(function (x, i) {
    return <Input id={x.id} size={x.size} name={x.name} placeholder={x.placeholder} required={x.required} key={i} label={x.label} value={x.value} />
  })
}

var ProfileSection = React.createClass({
  fields: function () {
    return [
      {id: 'add-member-id', size: 'short', name: 'id', placeholder: 'Membership number', required:'true', label: 'Member ID'},
      {id: 'add-member-title', size: 'short', name:'title', placeholder: 'Title', label: 'Title'},
      {id: 'add-member-first-name', size: 'short', name:'first_name', placeholder:'First name', label: 'Full Name'},
      {id:'add-member-initials', size:'short', name:'initials', placeholder: 'Initials'},
      {id: 'add-member-last-name', size: 'short', name:'last_name', placeholder:'Last name'},
    ]
  },
  render: function () {
    var inputs = create_inputs(this.fields())
    return (
      <div>
	<SectionTitle title='1. Profile' />
	{ inputs }
	</div>
    )
  }
})

var AddressSection = React.createClass({
  fields: function () {
    return [
      { id: 'add-member-address1', size:'short', name:'address1', placeholder: 'Address line 1', label: 'Address' },
      { id: 'add-member-address2', size:'short', name:'address2', placeholder: 'Address line 2' },
      { id: 'add-member-address3', size:'short', name:'address3', placeholder: 'Address line 3' },
      { id: 'add-member-address4', size:'short', name:'address4', placeholder: 'Address line 4' }
    ]
  },
  render: function () {
    var inputs = create_inputs(this.fields())
    return (
      <div>
      <SectionTitle title='2. Address' />
	{ inputs }
	<div className='innerSectionContainer'>
	<div className='inner-section-divider-medium'>
	<div className='couterContainer'>
	<h3>County</h3>
	<input id='add-member-county' className='short-relative' name='county' placeholder='County name' />
	<input id='add-member-postcode' className='short-relative' name='postcode' placeholder='Postcode' />
      </div>
      </div>
      </div>
      </div>
    )
  }
})

var ContactSection = React.createClass({
  fields: function () {
    return [
      {id:'add-member-home-phone', label:'Phone', placeholder: 'Home phone', size:'short', name: 'home_phone'},
      {id:'add-member-mobile-phone', placeholder:'Mobile phone', size:'short', name: 'mobile_phone'},
      {id:'add-member-work-phone', placeholder:'Work phone', size:'short', name: 'work_phone'},
      {id:'add-member_email1', label: 'Email', placeholder:'Primary email', size:'short', name:'primary_email'},
      {id:'add-member_email2', placeholder:'Secondary email', size:'short', name:'secondary_email'}
    ]
  },
  render: function () {
    var inputs = create_inputs(this.fields())
    return (
      <div>
	<SectionTitle title='3. Contact' />
	{ inputs }
	</div>
    )
  }
})

var MembershipSection = React.createClass({
  options: function () {
    return ['Annual Single', 'Annual Double', 'Annual Family',
	    'Annual Group', 'Annual Corporate', 'Life Single',
	    'Life Double']
  },
  create_options: function () {
    return this.options().map(function (option, i) {
      var formatted_option = option.replace(/ /g, '-').toLowerCase()
      return <option key={i} value={formatted_option}>{option}</option>
    })
  },
  fields: function () {
    return [
      { label: 'Date joined', id:'add-member-date-joined', size:'short', name:'date_joined' },
      { label: 'Membership due date', id:'membership_due_date', size:'short', name:'due_date', value:'01-01-2015', placeholder: 'DD-MM-YYYY' }
    ]
  },
  render: function () {
    var inputs = create_inputs(this.fields())
    return (
	<div>
	<SectionTitle title='4. Membership' />
	<div className='innerSectionContainer'>
	<div className='couterContainer'>
	<h3>Membership Type</h3>
      </div>
	<select name='membership_type' id='add-member-membership-type' class='short' style={{color:'#ccc',width:'320px'}}>
	<option class='meta' value='' disabled selected>Click to select one</option>
	{ this.create_options() }
      </select>
	{inputs}
      </div>
      </div>
    )
  }
})

var GiftAidSection = React.createClass({
  fields: function () {
    return [
      { label:'Date gift aid signed', id:'add-member-date-gift-aid-signed', size:'short', name: 'date_gift_aid_signed', placeholder:'DD-MM-YYYY' },
      { label:'Date gift aid cancelled', id:'add-member-date-gift-cancelled', size:'short', name: 'date_gift_aid_cancelled', placeholder: 'DD-MM-YYYY' }
    ]
  },
  render: function () {
    var inputs = create_inputs(this.fields())
    return (
	<div>
	<SectionTitle title='5. Gift aid' />

	<div className='innerSectionContainer'>
	<div className='inner-section-divider-medium'>
	<div className='checkbox'>
	<input id='add-member-gift-aid-signed' type='checkbox' name='gift_aid_signed' value='true'/>
	</div>
	</div>
	</div>

      { inputs }

	</div>
    )
  }
})

var OtherSection = React.createClass({
  render: function () {
    return (
	<div>
	<SectionTitle title='6. Other' />
	<div className='innerSectionContainer'>
	<div className='inner-section-divider-medium'>
	<div className='couterContainer'>
	<h3>News type</h3>
	<select name='news_type' class='short' style={{color:'#ccc',width:'320px'}}>
	<option class='meta' value='' disabled>Click to select one</option>
	<option value='post'>Post</option>
	<option value='online'>Online</option>
	</select>
	<div className='innerSectionContainer'>
	<div className='inner-section-divider-medium'>
	<div className='couterContainer'>
	<h3>Notes</h3>
	</div>
	<textarea id='add-member-membership-notes' name='notes'></textarea>
	</div>
	</div>
      </div>
      </div>
      </div>
	</div>
    )
  }
})

var NewMember = React.createClass({
  render: function () {
    return (
	<div>
	<Navigation />
	<div className='new-member-container'>
	<h1>New Member Form</h1>
	<form id='create-member-form' action='/addmember' method='post'>
	<ProfileSection />
	<AddressSection />
	<ContactSection />
	<MembershipSection />
	<GiftAidSection />
	<OtherSection />
	<SectionTitle title='7. Close' />
	<div className='innerSectionContainer'>
	<div className='inner-section-divider-medium'>
	<button id='create-member-btn' className='button-one left' type='submit'>Submit</button>
	<a href='javascript:history.back()'>
	<button id='cancel-member-btn' class='button-two right'>Cancel</button>
	</a>
	</div>
	</div>
	</form>
	</div>
	</div>
    )
  }
})

module.exports = NewMember
