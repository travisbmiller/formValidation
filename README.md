
Creating Forms
Most websites provide forms to their users. Login and Signup forms are two common examples. When creating your own forms, there are different types of form elements that can be used (ex - text inputs, check boxes, and select dropdowns). For this project you will be creating both a login and signup form, and then applying validation to them. Keep in mind that there isn't one right way in creating forms. Their are different approaches you can take and Angular validation options that you can use. Feel free to customize this project any way you would like, or do extra research to see how others have created their forms. 

You can create your forms however you would like, including creating your own CSS. One great option (that we recommend) would be to use Bootstrap. Check out the available Bootstrap CSS for form elements here (link to http://getbootstrap.com/css/#forms).

You'll notice on Bootstrap that along with easily creating nice looking form elements using their CSS classes, there are also CSS classes available for changing the appearance of inputs based of their validation (success, warning, error, icons...). Take a moment to see how they work because you may want to use them later in the project as we deal with validation.

For now, just worry about creating the forms and their elements. We'll deal with validation later. In your home.html file you'll see two div tags for the login and signup forms. They each have different controllers.

Login Form
Create a form containing two inputs for username and password, as well as labels for them. Use the 'Basic Example' in that Bootstrap link above for help with what type attribute value you should use for your inputs. Include a submit button at the bottom of the form.

Signup Form
Create a form containing inputs for at least the following: name, email, username, password, password repeat. If you can think of more inputs to add for additional practice, feel free to do so. Some extra examples could be age, select option containing a list of states (google 'javascript US states array' or something), male/female check boxes...

At this point you should have both forms created. When we type in them or click the submit button, nothing happens. Let's add some interactivity with our forms.

Form Validation

When creating forms for an app, it's important to show visual feedback depending on the user's input. AngularJS provides a variety of ways to add validation to both forms and their inputs. Its ideal to validate as much as you can, or even all, before submitting any data to the server. In some cases however, you may need to send a request to the server while the user fills out your form. An example would be to check if a username or email already exists. (link to angular docs for more info)

Below are some examples of available Angular validation:
- Required (<input type='text' required />)
- Minimum Length (<input type='text' ng-minlength=5 />)
- Maximum Length(<input type='text' ng-maxlength=20 />)
- Matches a Pattern using regex (<input type='text' ng-pattern='/a-zA-Z/' />)
- Email (<input type='email' />)
- Number (<input type='number' />)
- URL (<input type='url' />)

You can create custom directives as well to create your own validation. Later on in this project we will create one that checks if passwords match in two different fields.

To setup Angular validation, be sure to add a name attribute to both the form and its inputs because Angular refers to those names when checking their validation. Then, add the validation you'd like to use in the input (ex - 'required').

Example 1.1:

<div class='login-signup-form' ng-controller='loginCtrl'>
	<form role='form' name='loginForm'>
		<div class='form-group'>
			<label for='username'>Username</label>
			<input type='text' class='form-control' id='username' name='username' required>
		</div>
	</form>
</div>

Angular makes input properties on the $scope object available. These properties are accessed by typing formName.inputFieldName.property. Available properties are:
- $pristine (formName.inputFieldName.$pristine): Boolean that tells us whether the user has modified the form element
- $dirty (formName.inputFieldName.$dirty): Boolean that tells us if the user has actually modified the form element
- $valid (formName.inputFieldName.$valid): Boolean that tells us whether or not the form is valid based of defined validation, like the list of Angular validations above.
- $invalid (formName.inputFieldName.$invalid): Boolean that tells us whether or not the form is invalid (opposite of $valid)
- $error (formName.inputfieldName.$error): Object that contains all of the validations on a particular form element and a record of whether they are valid or invalid

The $valid, $invalid, and $error properties are useful for showing/hiding elements in the DOM. For example, let's say we include a message for a 'Required' field that says "This field is required." We can hide that message if the field is $valid, but show that message if its $invalid (or !$valid). To see a way how this works, let's take a look at another example.

Example 1.2:

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

In the example above, I was able to specifically access the required validation by typing 'loginForm.username.$error.required' and then used an ng-if to determine whether or not the message appears in the DOM. I'm using Bootstrap form help text, so i've added the 'show-errors' and 'help-block' classes to their respective elements.

Example 1.3:

<div class='login-signup-form' ng-controller='loginCtrl'>
	<form role='form' name='loginForm'>
		<div class='form-group'>
			<label for='username'>Username</label>
			<input type='text' class='form-control' id='username' name='username' ng-model='user.username' required>
			<p class='error' ng-if='loginForm.username.$error.required'>
				The username is required.
			</p>
		</div>
	</form>
</div>

Example 1.4

Example 1.3 showed the error messages from the beginning, and then they disappared once the user started typing. How can we not show those errors until the user starts typing? Think about the validation properties that are available. One approach could be to use the $dirty method with the input.

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

Now the message won't display unless the require error is set to true and the user had 'dirtied' the form, or typed in it once. In this case, if the user types, and then hits backspace, the message will appear.

Example 1.5

This is the last example, which demonstates that not only elements have different validation properties, but forms as well.

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

I've added a button with an ng-disabled directive. This button will be disabled when the form is invalid (true). The form will not be invalid once all validation, including inputs, are valid.

This covers a lot of what Angular has to offer for form validation. There are a lot of good tutorials out there that show different approaches to validating. Check them out:
- http://scotch.io/tutorials/javascript/angularjs-form-validation
- http://blog.yodersolutions.com/bootstrap-form-validation-done-right-in-angularjs/

Go ahead and add validation to your forms using what has been discussed so far. Use the require, min/max length, email validations when necessary, and then the others if you can. Create messages for each. Imagine that you are user feeling out the form, and then create different scenarios of what could happen. Keep in mind that if you want to do anything beyond what has been mentioned so far, there's a good chance a custom directive will need to be created. Include messages that appear when a validation issue occurs.

Login In (Server Validation)
Now that you've had a chance to add front-end validation, let's get some exposure to server validation. In the root folder, a server.js file has been created. This server is using Node and Express, which you'll learn soon. On line 27 is a users array that contains two different users. Feel free to add yourself as a new user in the array, or use one of the current users when we try to use the credentials to login.

Look at line 48 in server.js. The code here means anytime an http 'POST' request is received with the url '/loginUser', then run this function. This function will take the data sent in the request (the username and password), loop through the array (beginning on line 58), and then check to determine if there are any issues with the username/password. It will then respond an object (line 81) with keys/values (including a message) that can be used in the view.

Your job is to take the username and password in the Login Form, send it to a service that makes an http request to the server. You will receive an object with keys/values, including a message if the login failed. Validate to the user what the issue is. If the login was successful, just include a message that says 'success'.

Use the snippet below when you make the request in your service. The user value is an object with username and password keys ({username: 'pablo', password: 'devmountain'})

$http({
	method: 'POST',
	url: 'http://localhost:1212/login/',
	data: {
		user: user
	}

Custom directives

Blur
You may have noticed some limitations with only using Angular's validation. For example, what if you want to validate an input when the user leaves it (blur)? We have to create a directive to do that. Creating one on your own is possible, but we don't always need to create things from sratch. Many kind developers have posted their code on the internet that we can use and apply with our own. Look near the bottom of the link for http://scotch.io/tutorials/javascript/angularjs-form-validation. Under the heading 'Only Showing Errors After Clicking Out of an Input' there are some additional links. See if you can apply this to your own code!

Ensure Unique
When a user types in a username in the Signup Form, have it check the server to see if the username already exist. Again, search for directives that have already been written. Here's one that explains things pretty well: http://weblogs.asp.net/dwahlin/building-a-custom-angularjs-unique-value-directive

Signup User




