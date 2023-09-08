1. In a vanilla JS app, at what point in the form submission
   process do you gather all the data from the filled-out form?
When you click submit


2. In a React app, when do you gather all the data from
   the filled-out form?
Every timme you press a key or select an option the state changes


3. Which attribute in the form elements (value, name, onChange, etc.)
   should match the property name being held in state for that input?
The property name in the form elements should match the name held in state.


4. What's different about a saving the data from a checkbox element
   vs. other form elements?
in a checkbox you have to put a boolean value

<!-- REsponse of the yt video, better: -->
A checkbox uses the `checked` property to determine what should
be saved in state. Other form elements use the `value` property instead.


5. How do you watch for a form submit? How can you trigger
   a form submit?
by default it will work using the default html behaviour and rerendering the page, but if you capture yourself the onSubmit of the buttom and inside the function you type evt.preventDefault(), then it will not rerender and you will be able to do whatever you want with the value of the formData.