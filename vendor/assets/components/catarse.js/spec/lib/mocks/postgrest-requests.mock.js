var testToken = "test_token";
var nContributions = 20;
var apiPrefix = "https://api.catarse.me";
m.postgrest.init(apiPrefix, {method: "GET", url: "/api_token"});

beforeAll(function() {
  jasmine.Ajax.install();

  //API token stub
  jasmine.Ajax.stubRequest('/api_token').andReturn({
    'responseText' : '{"token": "' + testToken + '"}'
  });


});

afterAll(function() {
  jasmine.Ajax.uninstall();
});
