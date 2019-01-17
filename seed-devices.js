'use strict';

const axios = require('axios');
const FormData = require('form-data');
const makeCreateBody = require('./lib/bulk-devices').create

/**
 * Configuration - edit here
 */
const accessTokenUri = 'http://localhost:12451/v1/token';
const bulkCreateUri = `http://localhost:12451/v1/tenants/${tenantId}/devices-bulk`;
const tenantId = 'tenant-1';
const prefix = "AAA";
const thousandsDevices = 100; // i.e. 100,000 devices as we create a batch of 1000 at once
const password = '';
const username = '';
const clientId = '';

const formData = new FormData();
formData.append('grant_type', 'password');
formData.append('username', username);
formData.append('password', password);
formData.append('client_id', clientId);

axios.post(accessTokenUri, formData, {
  headers: formData.getHeaders()
})
.then((response) => {
  console.log('Got access token')
  seed(`Bearer ${response.data.accessToken}`)
})
.catch((err) => {
  console.log('Failed to get access token');
  console.log(err);
})

function seed(accessToken) {
  const requests = [...Array(thousandsDevices)]
    .map((_, index) => makeCreateRequest(accessToken, makeCreateBody(createConfig(index))))
  // this will run the requests in parallel - convenient but not ideal
  axios.all(input)
}

function makeCreateRequest(accessToken, body) {
  return axios.post(bulkCreateUri, body, {
    headers: {
      Authorization: accessToken
    }
  }).catch((err) => console.log(err))
}

function createConfig(index) {
  return {
    rangeStart: index * 1000,
    rangeEnd: (index * 1000) + 999,
    prefix: prefix,
    includeFolders: true
  }
}
