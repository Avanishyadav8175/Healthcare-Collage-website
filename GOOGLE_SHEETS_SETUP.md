# Google Sheets Integration Setup Guide

Follow these steps to connect your application form to Google Sheets.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Healthcare College Applications"
4. In the first row, add these column headers:
   - A1: `Name`
   - B1: `Email`
   - C1: `Phone`
   - D1: `Program`
   - E1: `Message`
   - F1: `Timestamp`

## Step 2: Create Google Apps Script

1. In your Google Sheet, click on `Extensions` → `Apps Script`
2. Delete any existing code
3. Copy and paste this code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Append the data to the sheet
    sheet.appendRow([
      data.name,
      data.email,
      data.phone,
      data.program,
      data.message,
      data.timestamp
    ]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Data added successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Google Sheets API is working!");
}
```

4. Click on the disk icon (💾) to save
5. Name your project: "Healthcare Form Handler"

## Step 3: Deploy the Script

1. Click on `Deploy` → `New deployment`
2. Click on the gear icon ⚙️ next to "Select type"
3. Choose `Web app`
4. Configure the deployment:
   - **Description**: Healthcare Application Form
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click `Deploy`
6. Review permissions:
   - Click `Authorize access`
   - Choose your Google account
   - Click `Advanced` → `Go to [Project Name] (unsafe)`
   - Click `Allow`
7. Copy the **Web app URL** (it looks like: `https://script.google.com/macros/s/AKfycby.../exec`)

## Step 4: Update Your Website

1. Open `js/script.js` file
2. Find this line (around line 180):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
3. Replace `YOUR_GOOGLE_SCRIPT_URL_HERE` with your copied Web app URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```
4. Save the file

## Step 5: Test the Integration

1. Open your website in a browser
2. Click on "Apply Now" button
3. Fill out the form with test data
4. Submit the form
5. Check your Google Sheet - the data should appear in a new row!

## Troubleshooting

### Form not submitting?
- Check browser console for errors (F12 → Console tab)
- Verify the Google Script URL is correct
- Make sure the script is deployed with "Anyone" access

### Data not appearing in sheet?
- Check if the sheet has the correct column headers
- Verify the Apps Script code is saved and deployed
- Check the Apps Script execution logs: Apps Script Editor → Executions

### Permission errors?
- Re-authorize the script: Deploy → Manage deployments → Edit → Re-authorize
- Make sure "Execute as: Me" is selected

## Email Notifications (Optional)

To receive email notifications when someone submits the form, add this to your Apps Script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.name,
      data.email,
      data.phone,
      data.program,
      data.message,
      data.timestamp
    ]);
    
    // Send email notification
    var emailBody = "New Application Received!\n\n" +
                    "Name: " + data.name + "\n" +
                    "Email: " + data.email + "\n" +
                    "Phone: " + data.phone + "\n" +
                    "Program: " + data.program + "\n" +
                    "Message: " + data.message + "\n" +
                    "Time: " + data.timestamp;
    
    MailApp.sendEmail({
      to: "your-email@example.com", // Replace with your email
      subject: "New Application: " + data.name,
      body: emailBody
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Data added successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

Replace `your-email@example.com` with your actual email address.

## Security Notes

- The form uses `mode: 'no-cors'` which is necessary for Google Apps Script
- All form data is validated before submission
- Phone numbers are validated for 10 digits
- Email addresses are validated with regex
- The script only accepts POST requests with JSON data

## Support

If you face any issues:
1. Check the browser console for errors
2. Verify all steps are completed correctly
3. Test the Google Script URL directly in browser
4. Check Apps Script execution logs

---

**Important**: Keep your Google Script URL private. Don't share it publicly as anyone with the URL can submit data to your sheet.
