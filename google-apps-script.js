// ============================================
// HEALTHCARE COLLEGE - GOOGLE APPS SCRIPT
// Copy this entire code to Google Apps Script
// ============================================

function doPost(e) {
  try {
    // Get the active spreadsheet and sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming JSON data
    var data = JSON.parse(e.postData.contents);
    
    // Log the received data (for debugging)
    Logger.log('Received data: ' + JSON.stringify(data));
    
    // Append the data to the sheet
    sheet.appendRow([
      data.name || '',
      data.email || '',
      data.phone || '',
      data.program || '',
      data.message || '',
      data.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    ]);
    
    // Optional: Send email notification to admin
    // Uncomment the lines below and add your email
    /*
    var emailBody = "New Application Received!\n\n" +
                    "Name: " + data.name + "\n" +
                    "Email: " + data.email + "\n" +
                    "Phone: " + data.phone + "\n" +
                    "Program: " + data.program + "\n" +
                    "Message: " + data.message + "\n" +
                    "Time: " + data.timestamp;
    
    MailApp.sendEmail({
      to: "your-email@example.com", // Replace with your email
      subject: "🏥 New Application: " + data.name,
      body: emailBody
    });
    */
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Application submitted successfully',
      'row': sheet.getLastRow()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log the error
    Logger.log('Error: ' + error.toString());
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script is working
function doGet(e) {
  return ContentService.createTextOutput("✅ Healthcare College Form API is working!");
}

// Test function - Run this to test if script can write to sheet
function testWrite() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    'Test Name',
    'test@email.com',
    '9999999999',
    'Test Program',
    'Test Message',
    new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  ]);
  Logger.log('Test row added successfully!');
}
