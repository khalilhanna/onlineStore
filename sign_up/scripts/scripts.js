const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const terms = document.getElementById('terms');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    checkInputs();
});


function checkInputs(){
   const usernameValue = username.value.trim();
   const emailValue = email.value.trim();
   const passwordValue = password.value.trim();
   const password2Value = password2.value.trim();
   

   let isUsername;
   let isValidEmail;
   let isPassword;
   let isPassword2;
   let accept;
   if(usernameValue === ''){
       //show error
       //add error class
       setErrorFor(username, "Username can't be blank");
   } else {
       // add success class
       setSuccesFor(username);
       isUsername = true;
   }

    if(emailValue === ''){
        //show error
        //add error class
        setErrorFor(email, 'Email can not be blank');
    } else if(!isEmail(emailValue)){
        setErrorFor(email, 'Email is not valid');
    }else {
        // add success class
        setSuccesFor(email);
        isValidEmail= true;
    }

    if(passwordValue === ''){
        //show error
        //add error class
        setErrorFor(password, "Password can't be blank");
    } else {
        // add success class
        setSuccesFor(password);
        isPassword = true;
    }

    if(password2Value === ''){
        //show error
        //add error class
        setErrorFor(password2, "Confirm Password can't be blank");
    } else if (passwordValue !== password2Value){
        setErrorFor(password2, "Confirm Password doesn't match the password");
    } else {
        // add success class
        setSuccesFor(password2);
        isPassword2 = true;
    }

    if(!terms.checked){
        //show error
        //add error class
        setErrorFor(terms, "Accept Terms to continue");
    } else {
        // add success class
        setSuccesFor(terms);
        accept = true;
    }

    if (isUsername && isValidEmail && isPassword && isPassword2 && accept){
        setTimeout(function() { alert("welcome "+ usernameValue); }, 300);
    }
}

function setErrorFor(input, message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    //add error message
    small.innerHTML = message;
    //add error class
    formControl.className = "form-control error";
}

function setSuccesFor(input){
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
