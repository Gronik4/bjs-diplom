const userForm = new UserForm();
userForm.loginFormCallback = data => ApiConnector.login(data, (response) => {
  if(response.success === true) {location.reload();} else {
    loginErrorMessageBox = userForm.setLoginErrorMessage(response.error);
  } 
})

userForm.registerFormCallback = data => ApiConnector.register(data, (response) => {
  if(response.success === true) {location.reload();} else {
    registerErrorMessageBox = userForm.setRegisterErrorMessage(response.error)
  }
})