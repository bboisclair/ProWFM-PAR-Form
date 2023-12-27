function submitForm(event) {
  //This will stop the form from clearing upon submission
  event.preventDefault();
  // Retrieve values from all sections
  var form = document.getElementById("myForm");
  var summary = document.getElementById('summary').value;
  var prevWorked = document.getElementById('prevWorked').value;
  var problem = document.getElementById('problem').value;
  var expectedResult = document.getElementById('expectedResult').value;
  var additionalInfo = document.getElementById('additionalInfo').value;
  var tenantURL = document.getElementById('tenantURL').value;
  var tenantStack = document.getElementById('tenantStack').value;
  var impactedUsers = document.getElementById('impactedUsers').value;
  var impactedUsersRange = document.getElementById('impactedUsersRange').value;
  var timeframeTrigger = document.getElementById('timeframeTrigger').value;
  var affectedCustomers = getSelectedValue(form.elements["affectedCustomers"]);
  var reproducibility = document.getElementById('reproducibility').value;
  var reproductionSteps = document.getElementById('reproductionSteps').value;
  var mobileValue = getSelectedValue(form.elements["mobile"]);
  var integrationsValue = getSelectedValue(form.elements["integrations"]);
  var businessImpact = document.getElementById('businessImpact').value;
  document.getElementById('reproductionSteps').innerHTML = reproductionSteps;
  var mobileOutput = '';
  var mobileDetails = '';
  var integrationsOutput = '';
  var mobileDevice = document.getElementById('mobileDevice').value;
  var mobileApp = document.getElementById('mobileApp').value;
  var workaroundValue = getSelectedValue(form.elements["workaround"]);
  var workaroundOutput = '';
  var workaroundDetails = document.getElementById('workaroundDetails').value;
  document.getElementById('workaroundDetails').innerHTML = workaroundDetails;

  // Replace line breaks with a placeholder before submitting for textareas
  reproductionSteps = reproductionSteps.replace(/\n/g, '|||');
  additionalInfo = additionalInfo.replace(/\n/g, '|||');
  workaroundDetails = workaroundDetails.replace(/\n/g, '|||');

  //IF STATEMENT TO COMPARE MOBILE RADIO BUTTONS
  if (mobileValue === "No") {
    mobileOutput = '';
  } else if (mobileValue === "Yes") {
    mobileOutput = `
    <br>
    <br>
    This impacts the mobile app.
    <br>
    <br>
    `;
  }

  //IF STATEMENT TO COMPARE INTEGRATION RADIO BUTTONS
  if (integrationsValue === "No") {
    integrationsOutput = '';
  } else if (integrationsValue === "Yes") {
    integrationsOutput = 'This impacts integrations.';
  }

  //IF STATEMENT TO COMPARE AFFECTED CUSTOMER RADIO BUTTONS
  if (affectedCustomers === "affectedCustomersSpecific") {
    affectedCustomers = 'The problem is customer specific.';
  } else if (affectedCustomers === "affectedCustomersAll") {
    affectedCustomers = 'The problem affects all customers.';
  }

  //IF STATEMENT TO CHECK IF MOBILE RADIO BUTTON IS YES
  if (mobileOutput) {
    // If mobileOutput is not null, include mobile details
    mobileDetails = `
      <strong>Manufacturer, Model, and OS version:</strong> ${mobileDevice}
      <br>
      <strong>Name, Version:</strong> ${mobileApp}
    `;
  }

  //IF STATEMENT TO COMPARE WORKAROUND OPTIONS
  if (workaroundValue === "No") {
    workaroundOutput = 'No';
  } else if (workaroundValue === "YesCustNo") {
    workaroundOutput = 'Yes, but the customer does not accept it. The details are below:';
  } else if (workaroundValue === "Yes") {
    workaroundOutput = 'Yes, the details are below:';
  }

  //FUNCTION TO GET SELECTED VALUE OF RADIO BUTTONS
  function getSelectedValue(radioButtons) {
    // Loop through radio buttons to find the selected one
    for (var i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        return radioButtons[i].value;
      }
    }
    // Return null if no radio button is selected
    return null;
  }

  //IF STATEMENT FOR REQUIRED FIELD CHECK
  if (summary && prevWorked && problem && expectedResult && tenantURL && tenantStack && mobileValue && integrationsValue
    && impactedUsers && impactedUsersRange && timeframeTrigger && affectedCustomers && reproducibility && reproductionSteps
    && businessImpact && workaroundValue) {
    // Construct the content for the new tab
    var content = `
    <link rel="stylesheet" href="style.css">
    <div id="header">
      <img src="defect.png" class="header-icon">
      <h1>Pre-PAR Generator for Pro WFM</h1>
      <img src="defect.png" class="header-icon">
    </div>
    <script>
    function closeCurrentTab() {
      window.close();
    }
    </script>
    <div id="outputContainer">
      <form id="outputForm">
        <h2>Issue Summary</h2>
        <p><strong>Issue Summary:</strong> ${summary}</p>

        <h2>JIRA Description</h2>
        <p><strong>Problem:</strong><br>=======
        <br>
        ${problem}
        
        <p><strong>Expected Result:</strong><br>=============
        <br>
        ${expectedResult}

        <p><strong>Additional Information:</strong><br>====================
        <br>
        ${additionalInfo.replace(/\|\|\|/g, '<br>')}

        <p><strong>Suspected Problem Origin:</strong><br>=======================
        <br>
        ${prevWorked}
        <p><strong>Scope:</strong><br>=======
        <br>
        <strong>This issue affects the following:</strong> ${impactedUsers}
        <br>
        <strong>What range of users, employees, managers does the issue affect?:</strong> ${impactedUsersRange}
        <br>
        <strong>Is there a specific time or event that triggers the problem?:</strong> ${timeframeTrigger}
        ${mobileOutput}
        ${mobileDetails}
        <br>
        ${integrationsOutput}
        <p><strong>Tenant Details:</strong><br>===========
        <br>
        <strong>Tenant URL:</strong> ${tenantURL}
        <br>
        <strong>Tenant Stack:</strong> ${tenantStack}
        <br>
        <p><strong>Business Impact:</strong><br>==============
        <br>
        ${businessImpact}
        <p><strong>Workaround</strong><br>=================
        <p><strong>Is a workaround available?:</strong> ${workaroundOutput}
        <br>
        ${workaroundDetails.replace(/\|\|\|/g, '<br>')}
        <h2>Steps to Reproduce:</h2>
        <p><strong>Reproducibility:</strong> ${reproducibility}</p>
        ${reproductionSteps.replace(/\|\|\|/g, '<br>')}

        <div class="buttonSection" id="buttonSection">
          <button type="button" class = "button" onclick="closeCurrentTab(event)">Edit Information</button>
      </form>
    </div>
  `;

    // Open a new tab and write the content
    var newTab = window.open();
    newTab.document.write(content);
    newTab.document.close();
  }
  else {
    alert("Please fill out all required fields to continue. The defect cannot be approved without them.");
  }
  
}

//FUNCTION TO SHOW MOBILE TEXTBOX IF RADIO BUTTON IS CHECKED YES
function showMobileTextbox() {
  var additionalTextboxContainer = document.getElementById('mobileTextboxContainer');
  additionalTextboxContainer.style.display = 'block';
}

//FUNCTION TO HIDE MOBILE TEXTBOX IF RADIO BUTTON IS CHECKED NO
function hideMobileTextbox() {
  var additionalTextboxContainer = document.getElementById('mobileTextboxContainer');
  additionalTextboxContainer.style.display = 'none';
}
