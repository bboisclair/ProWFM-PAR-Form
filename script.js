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
  var businessImpact = document.getElementById('businessImpact').value;
  var workaroundValue = getSelectedValue(form.elements["workaround"]);
  var workaroundDetails = document.getElementById('workaroundDetails').value;
  var impactedUserTextbox = document.getElementById('impactedUserTextbox').value;
  var impactedUsersDropdown = document.getElementById("impactedUsers");
  var integrationCheckbox1 = document.getElementById('integrationCheckbox1');
  var integrationCheckbox2 = document.getElementById('integrationCheckbox2');
  var boomiAccountName = document.getElementById('boomiAccountName').value;
  var executionID = document.getElementById('executionID').value;
  var mobileDevice = document.getElementById('mobileDevice').value;
  var mobileApp = document.getElementById('mobileApp').value;
  var supportCode = document.getElementById('supportCode').value;
  
  var workaroundOutput = '';
  var integrationOutput = '';
  var integrationDetails = '';
  var mobileDetails = '';
  var missingFields = [];
  
  if (mobileDevice || mobileApp || supportCode) {
    mobileDetails = `
      <br>
      <strong>Manufacturer, Model, and OS version:</strong> ${mobileDevice}
      <br>
      <strong>Name, Version:</strong> ${mobileApp}
      <br>
      <strong>Support Code:</strong> ${supportCode}
    `;
  }

  if (integrationCheckbox1.checked || integrationCheckbox2.checked) {
    integrationOutput = '<br>This impacts integrations, specifically in the following areas:';
  }

  // Include integration details based on the checked checkboxes
  if (integrationCheckbox1.checked && integrationCheckbox2.checked) {
    integrationDetails = `<br>Issue is present within the Integration Hub and anytime the API call is made
    <br>
    <strong>Boomi Account:</strong> ${boomiAccountName}
    <br>
    <strong>Execution ID:</strong> ${executionID}`;
  } else {
    if (integrationCheckbox1.checked) {
      integrationDetails += `<br>Issue is present within the Integration Hub.
      <br>
      <strong>Boomi Account:</strong> ${boomiAccountName}
      <br>
      <strong>Execution ID:</strong> ${executionID}`;
    }

    if (integrationCheckbox2.checked) {
      integrationDetails += '<br>Issue is present anytime the API call is made.';
    }
  }

  //IF STATEMENT TO COMPARE AFFECTED CUSTOMER RADIO BUTTONS
  if (affectedCustomers === "affectedCustomersSpecific") {
    affectedCustomers = 'The problem is customer specific.';
  } else if (affectedCustomers === "affectedCustomersAll") {
    affectedCustomers = 'The problem affects all customers.';
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

  function checkMissingField(field, fieldName) {
    if (!field || field.trim() === "") {
      missingFields.push(fieldName);
    }
  }

  // Check each required field
  checkMissingField(summary, 'Issue Summary');
  checkMissingField(prevWorked, 'Did this previously work?');
  checkMissingField(problem, 'Problem Statement');
  checkMissingField(expectedResult, 'Expected Result');
  checkMissingField(tenantURL, 'Tenant URL');
  checkMissingField(tenantStack, 'Tenant Stack');
  checkMissingField(impactedUsers, 'Who is impacted by this issue?');
  checkMissingField(impactedUsersRange, 'What range of users, employees, managers does the issue affect?');
  checkMissingField(timeframeTrigger, 'Is there a specific time or event that triggers the problem?');
  checkMissingField(affectedCustomers, 'What customers would be affected by this issue?');
  checkMissingField(reproducibility, 'What is the reproducibility for the issue?');
  checkMissingField(reproductionSteps, 'Steps to Reproduce');
  checkMissingField(businessImpact, 'Business Impact');
  checkMissingField(workaroundValue, 'Is a workaround available?');

  //IF STATEMENT FOR REQUIRED FIELD CHECK
  if (missingFields.length > 0) {
    alert("Please fill out the following required fields:\n" + missingFields.join('\n'));
  }
  else {
    // Construct the content for the new tab
    var content = `
      <link rel="stylesheet" href="style.css">
    <header>
        <img src="defect_white.png" class="header-icon" title="Defect Icon">
        <h1> PAR Generator for Pro WFM </h1>
        <img src="defect_white.png" class="header-icon" title="Defect Icon">
    </header>
      <script>
      function closeCurrentTab() {
        window.close();
      }
      </script>
      <div id="outputContainer">
        <form id="outputForm">
          <h2>Issue Summary</h2>
          <p>${summary}</p>
  
          <h2>JIRA Description</h2>
          <p><strong>Problem:</strong><br>=======
          <br>
          ${problem.replace(/\n/g, '<br>')}
          
          <p><strong>Expected Result:</strong><br>=============
          <br>
          ${expectedResult.replace(/\n/g, '<br>')}
          <br>
          <p><strong>Tenant Details:</strong><br>============
          <br>
          <strong>Tenant URL:</strong> ${tenantURL}
          <br>
          <strong>Tenant Stack:</strong> ${tenantStack}
          <p><strong>Additional Information:</strong><br>====================
          <br>
          ${additionalInfo.replace(/\n/g, '<br>')}
  
          <p><strong>Suspected Problem Origin:</strong><br>=======================
          <br>
          ${prevWorked}
          <p><strong>Scope:</strong><br>======
          <br>
          <strong>This issue affects the following:</strong> ${impactedUsers}  ${impactedUserTextbox}
          <br>
          <strong>What range of users, employees, managers does the issue affect?:</strong> ${impactedUsersRange}
          <br>
          <strong>Is there a specific time or event that triggers the problem?:</strong> ${timeframeTrigger}
          ${mobileDetails}
          ${integrationOutput}
          ${integrationDetails}
          <br>
          <p><strong>Business Impact:</strong><br>==============
          <br>
          ${businessImpact.replace(/\n/g, '<br>')}
          <p><strong>Workaround</strong><br>===========
          <p><strong>Is a workaround available?:</strong> ${workaroundOutput}
          <br>
          ${workaroundDetails.replace(/\n/g, '<br>')}
          <h2>Steps to Reproduce</h2>
          <p><strong>Reproducibility:</strong> ${reproducibility}</p>
          ${reproductionSteps.replace(/\n/g, '<br>')}
          <br>
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
}

function hideComponentSectionFormContainer() {
  var additionalComponentsToggle = document.getElementById("componentSectionFormContainer");
  additionalComponentsToggle.style.display = "none";
}

function hideComponents() {
  var integrationComponentsToggle = document.getElementById("integrationComponent");
  var mobileComponentsToggle = document.getElementById("mobileAppComponent");

  integrationComponentsToggle.style.display = "none";
  mobileComponentsToggle.style.display = "none";
}

function toggleIntegrationComponent() {
  var additionalComponentsToggle = document.getElementById("componentSectionFormContainer");
  var integrationComponentsToggle = document.getElementById("integrationComponent");
  var mobileComponentsToggle = document.getElementById("mobileAppComponent");

  hideComponents(); // Hide both components

  var currentDisplayStyle = window.getComputedStyle(integrationComponentsToggle).display;
  integrationComponentsToggle.style.display = currentDisplayStyle === "none" ? "block" : "none";
  additionalComponentsToggle.style.display = currentDisplayStyle === "none" ? "block" : "none";
}

function toggleMobileAppComponent() {
  var additionalComponentsToggle = document.getElementById("componentSectionFormContainer");
  var integrationComponentsToggle = document.getElementById("integrationComponent");
  var mobileComponentsToggle = document.getElementById("mobileAppComponent");

  hideComponents(); // Hide both components

  var currentDisplayStyle = window.getComputedStyle(mobileComponentsToggle).display;
  mobileComponentsToggle.style.display = currentDisplayStyle === "none" ? "block" : "none";
  additionalComponentsToggle.style.display = currentDisplayStyle === "none" ? "block" : "none";
}

function toggleIntegrationTextbox() {
  var integrationCheckbox1 = document.getElementById('integrationCheckbox1');
  var additionalTextboxContainer = document.getElementById('integrationTextboxContainer');

  if (integrationCheckbox1.checked) {
    showIntegrationTextbox();
  } else {
    hideIntegrationTextbox();
  }
}

function showIntegrationTextbox() {
  var additionalTextboxContainer = document.getElementById('integrationTextboxContainer');
  additionalTextboxContainer.style.display = 'block';
}

function hideIntegrationTextbox() {
  var additionalTextboxContainer = document.getElementById('integrationTextboxContainer');
  additionalTextboxContainer.style.display = 'none';
}

function showImpactedUserTextbox() {
  // Check the selected value
  if (impactedUsers.value === "Other") {
    // If the selected value is "other", show the textbox
    impactedUsersTextboxContainer.style.display = "block";
  } else {
    // Otherwise, hide the textbox
    impactedUsersTextboxContainer.style.display = "none";
  }
}

function selectComponent(componentName, callback){
  document.getElementById('selectedComponent').textContent = componentName;

  if (typeof callback === 'function') {
    callback();
}
}

function changeBackgroundColor(button) {
  // Get all buttons with the class name 'menuButton'
  var buttons = document.getElementsByClassName('menuButton');

  // Remove background color from all buttons
  for (var i = 0; i < buttons.length; i++) {
      buttons[i].style.backgroundColor = '';
  }

  // Set background color for the clicked button
  button.style.backgroundColor = '#087C79';
}
