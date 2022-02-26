import xapi from 'xapi';

// PRIMARY DEVICE //

const token = "<removed>";
const AUTHTOKEN = "Authorization: Bearer " + token;
const DEVICE_ID = "<removed>";
const CONTENT_TYPE = "Content-Type: application/json";


xapi.event.on('UserInterface Extensions Widget Action', (event) => {
    if(event.WidgetId == 'roomLayout'){
      if ((event.Type == 'pressed') && (event.Value == "one")){
        toggleButtons("True")
        setVideo();
        displayAlertMessage('Changing to One Room...');
        //setWallpaper(); // not used as the secondary device switches to HDMI input, but keeping for basic scenario
      }else if ((event.Type == 'pressed') && (event.Value == "two")){
        toggleButtons("False")
        cancelVideo();
        displayAlertMessage('Changing to Two Rooms...');
        //clearWallpaper();
      }
    }
});


function toggleButtons(state){
  const MONITORING_URL = "https://webexapis.com/v1/deviceConfigurations?deviceId=" + DEVICE_ID;
  const CONTENT_TYPE = "Content-Type: application/json-patch+json";

  var messagecontent = {"value":state,"op": "replace","path":"UserInterface.Features.HideAll/sources/configured/value"};
  var body = JSON.stringify(messagecontent);
  console.log("message: " + body);

  xapi.command('HttpClient Patch', { 'Header': [CONTENT_TYPE, AUTHTOKEN] , 'Url':MONITORING_URL, 'AllowInsecureHTTPS': 'True'}
     , JSON.stringify(messagecontent)).then(
    (result) => {
  });

}


function setVideo(){
  const MONITORING_URL = "https://api.ciscospark.com/v1/xapi/command/Presentation.Start";

  var messagecontent = {"deviceId": DEVICE_ID, "arguments":{"ConnectorId": [4]}    };
  var body = JSON.stringify(messagecontent);
  console.log("message: " + body);

  xapi.command('HttpClient Post', { 'Header': [CONTENT_TYPE, AUTHTOKEN] , 'Url':MONITORING_URL, 'AllowInsecureHTTPS': 'True'}
     , JSON.stringify(messagecontent)).then(
    (result) => {
    });
}

function cancelVideo(){
  const MONITORING_URL = "https://api.ciscospark.com/v1/xapi/command/Presentation.Stop";

  var messagecontent = {"deviceId": DEVICE_ID};
  var body = JSON.stringify(messagecontent);
  console.log("message: " + body);

  xapi.command('HttpClient Post', { 'Header': [CONTENT_TYPE, AUTHTOKEN] , 'Url':MONITORING_URL, 'AllowInsecureHTTPS': 'True'}
     , JSON.stringify(messagecontent)).then(
    (result) => {
    });
} 

function displayAlertMessage(textMessage){
  xapi.command("UserInterface Message Alert Display", {
    Title: 'Updating Room Layout'
    , Text:  textMessage
    , Duration: 5
  }).catch((error) => { console.error(error); })
}


function setWallpaper(){
  var url = "https://www.employees.org/~dhenwood/WbxWallpaper/apraOneRoom.zip";
  const MONITORING_URL = "https://api.ciscospark.com/v1/xapi/command/Provisioning.Service.Fetch";

  var messagecontent = {"deviceId": DEVICE_ID, "arguments":{"URL": url}    };
  var body = JSON.stringify(messagecontent);
  console.log("message: " + body);

  xapi.command('HttpClient Post', { 'Header': [CONTENT_TYPE, AUTHTOKEN] , 'Url':MONITORING_URL, 'AllowInsecureHTTPS': 'True'}
     , JSON.stringify(messagecontent)).then(
    (result) => {
    });
}


function clearWallpaper(){
  const MONITORING_URL = "https://api.ciscospark.com/v1/xapi/command/UserInterface.Branding.Clear";

  var messagecontent = {"deviceId": DEVICE_ID};
  var body = JSON.stringify(messagecontent);
  console.log("message: " + body);

  xapi.command('HttpClient Post', { 'Header': [CONTENT_TYPE, AUTHTOKEN] , 'Url':MONITORING_URL, 'AllowInsecureHTTPS': 'True'}
     , JSON.stringify(messagecontent)).then(
    (result) => {
    });
}
