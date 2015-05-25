<div class="new-member-container">
    <h1>New Member Form</h1>
    <form action="/api/members" method="post">

        <div class="topSectionDividor">
            <h2>1. Profile</h2>
        </div>

        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <h3>Member id</h3>
                <input id="add-member-id" class="short" name="id" placeholder="Membership number">
            </div>
        </div>

        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <div class="couterContainer">
                    <h3>Title</h3>
                </div>
                <input id="add-member-title" class="short" name="title" placeholder="Title">
            </div>
        </div>
        
        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <h3>Full name*</h3>
                <input id="add-member-first-name" class="short" name="firstName" placeholder="First name">
            </div>
        </div>

        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <input id="add-member-initials" class="short" name="initials" placeholder="Initials">
            </div>
        </div>

        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <input id="add-member-last-name" class="short" name="lastName" placeholder="Last name">
            </div>
        </div>


        <div class="topSectionDividor">
            <h2>2. Address</h2>
        </div>

        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <div class="couterContainer">
                    <h3>Address</h3>
                </div>
                <input id="add-member-address1" class="short" name="address1" placeholder="Address line 1">
            </div>
        </div>

        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <input id="add-member-address2" class="short" name="address2" placeholder="Address line 2">
            </div>
        </div>

        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <input id="add-member-address3" class="short" name="address3" placeholder="Address line 3">
            </div>
        </div>

        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <input id="add-member-address4" class="short" name="address4" placeholder="Address line 4">
            </div>
        </div>

        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <div class="couterContainer">
                    <h3>County</h3>
                </div>
                <input id="add-member-county" class="short-relative" name="county" placeholder="County name">
                <input id="add-member-postcode"class="short-relative" name="postcode" placeholder="Postcode">
            </div>
        </div>

        <div class="innerSectionContainer" style="display:none;">
            <div class="inner-section-divider-medium">
                <h3>Deliverer</h3>
                <input id="add-member-deliverer" class="short" name="deliverer" value="post" disabled>
            </div>
        </div>

        <div class="topSectionDividor">
                <h2>3. Contact online</h2>
        </div>

        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <div class="couterContainer">
                    <h3>Home phone</h3>
                </div>
                <input id="add-member-home-phone" class="short" name="homePhone">
            </div>
        </div>

        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <div class="couterContainer">
                    <h3>Mobile phone</h3>
                </div>
                <input id="add-member-mobile-phone" class="short" name="mobilePhone">
            </div>
        </div>

        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <div class="couterContainer">
                    <h3>Work phone</h3>
                </div>
                <input id="add-member-work-phone" class="short" name="workPhone">
            </div>
        </div>

        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <div class="couterContainer">
                    <h3>Contact primary email</h3>
                </div>
                <input id="add-member-email1" class="short" name="primaryEmail">
            </div>
        </div>

        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <div class="couterContainer">
                    <h3>Contact secondary email</h3>
                </div>
                <input id="add-member-email2" class="short" name="secondaryEmail">
            </div>
        </div>

        <div class="topSectionDividor">
            <h2>4. Membership</h2>
        </div>


        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <div class="couterContainer">
                    <h3>Membership type</h3>
                </div>
                <select name="membershipType" id="add-member-membership-type" class="short" style="color:#ccc;width:320px;">
                    <option class="meta" value="" disabled="" selected="">Click to select one</option>
                    <option value="Annual Single">Annual Single</option>
                    <option value="Annual Double">Annual Double</option>
                    <option value="Annual Family">Annual Family</option>
                    <option value="Life Single">Life Single</option>
                    <option value="Life Double">Life Double</option>
                    <option value="Group Annual">Group Annual</option>
                    <option value="Corporate Annual">Corporate Annual</option>
                </select>
            </div>
        </div>

        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <div class="couterContainer">
                    <h3>Date joined</h3>
                </div>
                <input id="add-member-date-joined" class="short" type="text" name="dateJoined">
            </div>
        </div>

        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <div class="couterContainer">
                    <h3>Date life membership paid</h3>
                </div>
                <input id="add-member-life-payment-date" class="short" type="text" name="lifePaymentDate">
            </div>
        </div>

        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <div class="couterContainer">
                    <h3>Due membership date</h3>
                </div>
                <input id="membership-due-date" class="short" type="text" name="dueDate" value="2015-01-01">
            </div>
        </div>


        <div class="topSectionDividor">
            <h2>5. Gift aid</h2>
        </div>

        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <div class="checkbox">
                    <input id="add-member-gift-aid-signed" type="checkbox" name="giftAid" value="true">
                </div>
            </div>
        </div>

        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <div class="couterContainer">
                    <h3>Date gif aid signed</h3>
                </div>
                <input 
                    id="add-member-date-gift-aid-signed" 
                    class="short" 
                    type="text" 
                    name="dateGiftAidSigned"
                >
            </div>
        </div>

        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <div class="couterContainer">
                    <h3>Date gif aid cancelled</h3>
                </div>
                <input 
                    id="add-member-date-gift-cancelled"
                    class="short" 
                    type="text" 
                    name="dateGiftAidCancelled"
                >
            </div>
        </div>

        <div class="topSectionDividor">
            <h2>6. Other</h2>
        </div>

        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <div class="couterContainer">
                    <h3>News type</h3>
                </div>
                <select name="newsType" class="short" style="color:#ccc;width:320px;">
                    <option class="meta" value="" disabled="" selected="">Click to select one</option>
                    <option value="post">Post</option>
                    <option value="online">Online</option>
                </select>
            </div>
        </div>

        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <div class="couterContainer">
                    <h3>Notes</h3>
                </div>
                <textarea id="add-member-membership-notes" name="notes"></textarea>
            </div>
        </div>

        <div class="topSectionDividor">
            <h2>8. Close</h2>
        </div>
        <div class="innerSectionContainer">
            <div class="inner-section-divider-medium">
                <button id="create-member-btn" class="button-one left" type="submit">Save</button>
                <a href="javascript:history.back();">
                    <button id="cancel-member-btn" class="button-two right">Cancel</button>
                </a>
            </div>
        </div>
    </form>
</div>