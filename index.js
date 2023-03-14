// Since Microsoft Azure remove the app service domain control center, I have to create a workaround to redirect to the domain portal.
// This is a simple express app that will redirect to the domain portal when you GET /
// Hope this helps someone else.
// Note: You must have:
// 1. A domain registered with Azure
// 2. The Azure CLI installed, logged in, and have the correct subscription set
// 3. Your domain name, resource group, and subscription id handy.


const { WebSiteManagementClient } = require('@azure/arm-appservice');
const { DefaultAzureCredential } = require('@azure/identity');
const creds = new DefaultAzureCredential();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// static files
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

app.post('/sso', (req, res) => {
  var subid = req.body.subid;
  var reqdomain = req.body.domain;
  var rg = req.body.rg;
  const client = new WebSiteManagementClient(creds, subid, { credentialScopes: ['https://management.azure.com/.default'] });
  client.domains.get(rg, reqdomain).then(domain => { // sanity check to make sure the domain exists
    client.domains.getControlCenterSsoRequest(rg, reqdomain).then(sso => {
      console.log('Generating SSO request...')
      var html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Redirecting to Domain Portal</title>
      </head>
      <body onload="submitForm()">
        <h1>Redirecting to Domain Portal...</h1>
        <form id="samlForm" method="post" action="${sso.url}">
          <input type="hidden" name="${sso.postParameterKey}" value='${sso.postParameterValue}'>
        </form>
        <script>
          function submitForm() {
            document.getElementById("samlForm").submit();
          }
        </script>
      </body>
      </html>
      `
      console.log('SSO request generated. Redirecting to domain portal...')
      res.send(html);
    }).catch(err => {
      console.log(`Error getting domain: ${err}`);
      res.send(`Error getting domain: ${err}`);
    });
  }).catch(err => {
    console.log(`Error getting domain: ${err}`);
    res.send(`Error getting domain: ${err}`);
  });
});



app.listen(3000, () => {
  console.log('SSO Request Generator on 3000');
  console.log('Navigate to http://localhost:3000 to get started.');
  console.log('You\'ll need your subscription ID, domain name, and resource group handy.');
  console.log('Ensure you have the Azure CLI installed, logged in, and have the correct subscription set or this will not work properly.')
});


