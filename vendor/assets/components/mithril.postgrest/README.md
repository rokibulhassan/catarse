#mithril.postgrest [![Circle CI](https://circleci.com/gh/catarse/mithril.postgrest/tree/master.svg?style=svg)](https://circleci.com/gh/catarse/mithril.postgrest/tree/master) [![Code Climate](https://codeclimate.com/github/catarse/mithril.postgrest/badges/gpa.svg)](https://codeclimate.com/github/catarse/mithril.postgrest)

## Use cases
What this library is supposed to do:
  
  * Help you authenticating in a [PostgREST](https://github.com/begriffs/postgrest) server.
  * Keep some session information in the browser localStorage.
  * Provide wrappers arround the mithril request function to use JWT.
  * Provide a constructor for objects that will interact with PostgREST endpoints
  * Provide some helpers to build some useful View-Model objects.
  
## Usage
First we should init the library so that it will build the functions to access the API.
The init function takes one argument which is the API endpoint prefix, 
containing the URI to which all addresses will be appended. 
If the API is being served from exactly the same location as the page running the JS
you can just initialize without any argument.

To use an API available at ```http://api.foo.com/v1``` you can use the code:
```javascript
m.postgrest.init(
  "http://api.foo.com/v1", 
  {method: "GET", url: "/authentication_endpoint"}
);
```

This will create three functions:

  * m.postgrest.request - which should be used for anonymous API calls.
  * m.postgrest.requestWithToken - which should be used for authenticated API calls.
  * m.postgrest.model - creates an object that abstracts an API endpoint

Both request functions are just proxies for mithril's ```m.request``` and will return in the same fashion.

However, the ```m.postgrest.requestWithToken``` stores the JWT for api authentication in the localStorage key "postgrest.token".

To logout of the API and erase the token from the browser localStorage you should call:

```javascript
m.postgrest.reset();
```

### Models
To generate a model you should call the model function passing its name. The name of the model should be the name of the endpoint in the PostgREST server.

For example, the following code:
```javascript
var users = m.postgrest.model('users');
```

will generate an object with functions to operate the ```/users``` endpoint.

The model will have the following methods:

 * getPage(page, filters) - gets a page of data issueing a GET request to the endpoint.
 * getPageWithToken(page, filters) - gets a page of data issueing a GET request to the endpoint using the JWT authentication.
 * getRow(filters)
 * getRowWithToken(filters)
 * patch(filters, data)
 * patchWithToken(filters, data)
 * post(data)
 * postWithToken(data)
 * delete(filters)
 * deleteWithToken(filters)
 * options()

The model will have the following property once it is created:

 * pageSize - defines the size of each page that comes in ```getPage``` call. Default is 10. 

### View-Models
There are some commom View-Model objects that can be generated automaticaly.

#### filtersVM
One of such cases is the filters VM. It is used to bind a HTML form to a set of getter/setter functions that will be used to generate a query string.
You can use the function:

 * filtersVM(attributes) - Generate a View-Model based on the attributes object (maps names to operators).

As in the example:

```javascript
var filters = m.postgrest.filtersVM({id: 'eq', name: 'ilike'});
filters.id(7);
filters.name('foo');
filters.order({name: 'desc'});
filters.parameters();
```

The ```filters.parameters()``` will return an object that can be fed directly to a request with filters and the order by.

If you want to apply any transformation to the value before it being fed to the ```parameters()``` function you have a ```toFilter``` function
that has been created in each property for you. So let's say we want to remove diacriticts from the name before sending the string:

```javascript
filters.name.toFilter = function(){
  return removeDiacritics(this());
};
```
Assuming that you have a ```removeDiacritics``` function defined within the scope of the above code, once you call the ```parameters()``` this function
will be applied to the property.

#### paginationVM
Another View-Model very convenient is one that can paginate a model and fetch pages from the API.
To create such an object you can call:

```javasctipt
 * paginationVM(loadPageFunction) - Generate a pagination View-Model that loads pages using the loadPageFunction (should be a mithril request)
```

This can be used with the model and filters defined above like:

```javascript
var userPages = m.postgrest.paginationVM(users.getPageWithToken);
// The firstPage function returns a mithril promise
userPages.firstPage(filters.parameters()).then(function(){
  // Results are in collection
  console.log(userPages.collection());
}, 
function(){
    alert('Error loading users');
});
```

After the first call to ```.firstPage``` the parameters are stored for use in next pages. To change the filters you need to call ```.firstPage``` again.

```javascript
// The nextPage function returns a mithril promise
userPages.nextPage().then(function(){
  // Results are appended to collection
  console.log(userPages.collection());
}, 
function(){
    alert('Error loading next page');
});
```
