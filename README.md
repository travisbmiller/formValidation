# Forms and Validation

This should be a fun project as you'll be building forms and setting up validation for them. The approach to this project is to provide you with information and examples, and then let you build your forms and validation how you want. Pause at times throughout this project and pretend you're a user. What would you expect if you forgot to add an '@' when filling out an email input box? Or if you typed in the wrong username/password? In this project  you get to make up and develop what happens in these scenarios.

## Getting started

To get started with this project, you'll need to do the following:
* Fork the repo and clone it to your computer
* Install bower packages

## Creating Forms

Most websites provide forms to their users. Login and Signup forms are two common examples. When creating your own forms, there are different types of form elements that can be used (ex-text inputs, check boxes, and select dropdowns). For this project you will be creating both a login and signup form, and then applying validation to them. Keep in mind that there isn't one right way to create forms as there are different approaches you can take and Angular validation options that you can use. Feel free to customize this project any way you would like, or do extra research to see how others have created their forms.

You can create your forms however you would like, including creating your own CSS. One great option (that we recommend) would be to use Bootstrap. Check out the available Bootstrap CSS for form elements [here](http://getbootstrap.com/css/#forms).

You'll notice on Bootstrap that along with easily creating nice looking form elements using their CSS classes, there are also CSS classes available for changing the appearance of inputs based on their validation state (success, warning, error, icons...). Take a moment to see how they work because you may want to use them later in the project as we deal with validation (using ng-class).

**For now, just worry about creating the forms and their elements.** We'll deal with validation later. In your home.html file you'll see two div tags for the login and signup forms. Notice they each have different controllers.

### Login Form
Create a login form containing two inputs for **username** and **password**, as well as labels for them. Use the 'Basic Example' in that Bootstrap link above for help with what type attribute value (text, password, email) you should use for your inputs. Include a submit button at the bottom of the form.

### Signup Form
Create a signup form containing inputs for at least the following: **name**, **email**, **username**, **password**, **password repeat**. Feel free to add additional inputs. Some extra examples could be age (accept an integer), select option containing a list of states (google 'javascript US states array' or something and store it in your service), male/female radio buttons, etc... The more you branch out, the more exposure you'll get to the variety of form elements available to use.

At this point in the README, you should have both forms created. Both forms appear at the same time though. Add some code so only one form appears at a time, and the user can toggle between them. The links are already created in a div tag with the class 'login-signup-menu.' 

When we type in our form inputs or click the submit button, nothing happens. Let's add some interactivity with our forms, including validation.

## Form Validation

### How does AngularJS validation work?

When creating forms for an app, it's important to show visual feedback depending on the user's input. AngularJS provides a variety of ways to add validation to both forms and their inputs. Its ideal to validate as much as you can, or even all, **before** submitting any data to the server. In some cases however, you may need to send a request to the server for validation while the user fills out your form. An example would be to check if a username or email already exists.

Refer to the [Angular documentation](https://docs.angularjs.org/guide/forms) on forms if needed. The script.js file in the last example of the documentation contains a directive that could be used for a blur (runs code when a user exits an input). That could come in handy later on in this project.

Below are some examples of available Angular validation:
* Required `<input type='text' required />`
* Minimum Length `<input type='text' ng-minlength=5 />`
* Maximum Length`<input type='text' ng-maxlength=20 />`
* Matches a Pattern using regex `<input type='text' ng-pattern='/a-zA-Z/' />`
* Email `<input type='email' />`
* Number `<input type='number' />`
* URL `<input type='url' />`

You can create custom directives as well to create your own validation. Later on in this project we will create some.

To setup Angular validation, **be sure to add a name attribute to both the form and its inputs** because Angular refers to those names when checking their validation. Then, add the validation you'd like to use in the input, like 'required' in *Example 1.1*.

####Example 1.1

````html
<div class='login-signup-form' ng-controller='loginCtrl'>
	<form role='form' name='loginForm'>
		<div class='form-group'>
			<label for='username'>Username</label>
			<input type='text' class='form-control' id='username' name='username' required>
		</div>
	</form>
</div>
````

Angular makes input properties on the $scope object available. These properties are accessed by typing `formName.inputFieldName.property`. Available properties are:
* $pristine `formName.inputFieldName.$pristine': Boolean that tells us whether the user has modified the form element
* $dirty `formName.inputFieldName.$dirty': Boolean that tells us if the user has actually modified the form element
* $valid `formName.inputFieldName.$valid': Boolean that tells us whether or not the form is valid based of defined validation, like the list of Angular validations above.
* $invalid `formName.inputFieldName.$invalid': Boolean that tells us whether or not the form is invalid (opposite of $valid)
* $error `formName.inputfieldName.$error': Object that contains all of the validations on a particular form element and a record of whether they are valid or invalid

The $valid, $invalid, and $error properties are useful for showing/hiding elements in the DOM. For example, let's say we include a message for a 'Required' field that says "This field is required." We can hide that message if the field is $valid, but show that message if its $invalid (or !$valid). To see a way how this works, let's continue with our example.

####Example 1.2:

````html
<div class='login-signup-form' ng-controller='loginCtrl'>
	<form role='form' name='loginForm'>
		<div class='form-group' show-errors>
			<label for='username'>Username</label>
			<input type='text' class='form-control' id='username' name='username' ng-model='user.username' required>
			<p class='help-block' ng-if='loginForm.username.$error.required'>
				The username is required.
			</p>
		</div>
	</form>
</div>
````

In the example above, I was able to specifically access the **required** validation by typing `loginForm.username.$error.required`, and then using an ng-if to determine whether or not the message appears in the DOM. Since I'm using Bootstrap CSS for form help text, i've added the *show-errors* and *help-block* classes to the div and p elements.

####Example 1.3

*Example 1.2* shows the error messages before the user types or enters in the input field. Once the user enters the field and types, the message disappears. How can we not show those errors until the user starts typing? Think about the validation properties that are available. One approach could be to use the $dirty method with the input.

````html
<div class='login-signup-form' ng-controller='loginCtrl'>
	<form role='form' name='loginForm'>
		<div class='form-group'>
			<label for='username'>Username</label>
			<input type='text' class='form-control' id='username' name='username' ng-model='user.username' required>
			<p class='error' ng-if='loginForm.username.$error.required && loginForm.username.$dirty'>
				The username is required.
			</p>
		</div>
	</form>
</div>
````

Now the message won't display unless the required error is set to true and the user has 'dirtied' the form `loginForm.username.$dirty`, or typed in it once. In this case, if the user types, and then hits backspace, the message will appear.

####Example 1.4

This is the last example, which demonstates that not only the form elements have different validation properties, but **forms** also have validation properties.

````html
<div class='login-signup-form' ng-controller='loginCtrl'>
	<form role='form' name='loginForm' novalidate>
		<div class='form-group'>
			<label for='username'>Username</label>
			<input type='text' class='form-control' id='username' name='username' ng-model='user.username' required>
			<p class='error' ng-if='loginForm.username.$error.required && loginForm.username.$dirty'>
				The username is required.
			</p>
		</div>
		<button ng-disabled='loginForm.$invalid' class="btn btn-default">Submit</button>
	</form>
</div>
````

A button was added with an ng-disabled directive. This button will be disabled when the form is invalid (true). The form will not be invalid once all validation, including inputs, are valid.

This covers a lot of what Angular has to offer for form validation. There are a lot of good tutorials out there that shows different approaches to validating. Check them out:
* [Scotch.io](http://scotch.io/tutorials/javascript/angularjs-form-validation)
* [yodersolutions](http://blog.yodersolutions.com/bootstrap-form-validation-done-right-in-angularjs/)

Go ahead and add validation to your forms using what you've learned so far. Create validation for require, min/max length, email validations when necessary, and then others for more exposure and practice. Create messages for each validation. One input can have multiple error messages available to appear depending on the validation issue. As you code, imagine at times that you are a user filling out the form, and then create different scenarios that a user could potentially do. 

Keep in mind that if you want to do anything beyond what has been mentioned so far, there's a good chance a custom directive will need to be created.

#### CSS Styles

It was mentioned above that Bootstrap has its own CSS for validation states. If you didn't use Bootstrap, you could create your own CSS styles using the following classes in your css file:
* .ng-pristine {}
* .ng-dirty {}
* .ng-valid {}
* .ng-invalid {}

So for example, if you wanted a red border to appear around an input, you could create a style for that input by typing:

````CSS
input.ng-invalid {
	border: 1px solid red;
}
````

## Login In (Server Validation)
Now that you've had a chance to add front-end validation, let's get some exposure to server validation. In the root folder, a server.js file has been created. This server is using Node and Express, which you'll learn soon. To complete this portion of the project, do the following:

* Run `npm install` to install the node_modules
* Start the server by typing *node server.js* in you terminal
* Ask mentors if you try the above steps and aren't successful

### Check out the server.js file

Node.js contains javascript. On **line 27** of the server.js file is a users array that contains two different users. Feel free to add yourself as a new user in the array, or use one of the current users when we try to use the credentials to login.

Look at **line 48** in server.js. The code here means anytime an http 'POST' request is received with the url '/loginUser', then run this function. This function will take the data sent in the request (the username and password), loop through the array (beginning on line 58), and then check to determine if there are any issues with the username/password. It will then respond an object (line 81) with keys/values (including a message) that can eventually be used in the view.

### Set up the login request/response

Your job is to take the username and password in the Login Form, send it to a service that makes an http request to the server. You will then receive an object back with keys/values, including a message. Validate to the user what the issue is using the message sent back. If the user was successful, for now just display a 'success' message.

Use the snippet below when you make the server request in your service. The **user** value should be an object with username and password keys ({username: 'pablo', password: 'devmountain'}).

````Javascript
$http({
	method: 'POST',
	url: 'http://localhost:1212/login/',
	data: {
		user: user
	}
````

## Custom directives
There are some techniques that will be used in directives containing validation that you're probably not familiar with. See if you can figure them out. If you can't, please ask a mentor to help you understand.

### Blur

You may have noticed some limitations with only using Angular's validation. For example, what if you want to validate an input as soon as the user leaves it (blur)? We have to create a directive to do that. You could write one on your own, but we don't always need to create things from sratch. Many nice developers have posted their code on the internet that we can use and apply with our own code. Look near the bottom of the link for [Scotch.io](http://scotch.io/tutorials/javascript/angularjs-form-validation). Under the heading 'Only Showing Errors After Clicking Out of an Input' there are some additional links. Check these links out and see if you can apply this to your own code.

### Ensure Unique

When a user types in a username in the Signup Form, have it check the server to see if the username already exist. Again, search for directives that have already been written. Here's one to get you [started](http://weblogs.asp.net/dwahlin/building-a-custom-angularjs-unique-value-directive). 

### Passwords



## Signup User

If you've made it this far, that's very impressive. Just for fun, go ahead and implement the...




