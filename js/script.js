let user = []
let errorsMsg = document.querySelectorAll("span")
var len = JSON.parse(localStorage.getItem("user")).length
console.log(len);

// Login part =========
let loginPart = document.getElementById("login");
let signUpLink= document.querySelector("#login a");
let loginInputs = Array.from(document.querySelectorAll("#login input"))
let loginBtn = document.querySelector("#login .btn")



// Sign up part =========
let signUpPart = document.getElementById("signUp");
let loginLink= document.querySelector("#signUp a");
let signUpInputs = Array.from(document.querySelectorAll("#signUp input"))
let signUpBtn = document.querySelector("#signUp .btn")


// Home oage ============
let homePage = document.querySelector("#home-page")
let logOutBtn = document.querySelector("#home-page .btn")
let welcome = document.querySelector(".welcome")



signUpBtn.onclick = function (event) {
  let validationName = false
  let validationMail = false
  let validationPassword = false
  let usersDet = {
    uName : signUpInputs[0].value,
    uEmail : signUpInputs[1].value,
    uPass : signUpInputs[2].value,
  }


  
  signUpInputs.forEach(function (ele) {
    if(ele.value != "") {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("usersDet", JSON.stringify(usersDet));
      user.push(usersDet)
      validationMail =true
    }
  })
  
    // REGEX
    let mailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z]+.[a-zA-Z]+$/
    let passRegex = /^(?=.*[A-Za-z0-9]).{8,16}$/


    if(signUpInputs[0].value.length > 3) {
      validationName = true
      localStorage.setItem("user", JSON.stringify(user))
      signUpInputs[0].classList.remove("border-danger")
      signUpInputs[0].nextElementSibling.classList.replace("d-inline-block","d-none")
    } else {
      signUpInputs[0].classList.add("border-danger")
      if (signUpInputs[0].nextElementSibling.classList.contains("d-none")) {
        signUpInputs[0].nextElementSibling.classList.replace("d-none", "d-inline-block")
        signUpInputs[0].nextElementSibling.textContent = `The name must be more than 3 char`
      }
    }



    if(signUpInputs[1].value.match(mailRegex)) {
      for (let i =0; i< len; i++) {
        if ((JSON.parse(localStorage.getItem("user"))[i].uEmail) == signUpInputs[1].value ) {
          signUpInputs[1].classList.add("border-danger")
          if (signUpInputs[1].nextElementSibling.classList.contains("d-none")) {
            signUpInputs[1].nextElementSibling.classList.replace("d-none", "d-inline-block")
            signUpInputs[1].nextElementSibling.textContent = `This mail already exist`
          }
          break;
          } else {
          validationMail = true
          localStorage.setItem("user", JSON.stringify(user))
          signUpInputs[1].classList.remove("border-danger")
          signUpInputs[1].nextElementSibling.classList.replace( "d-inline-block","d-none")
        }
      }
    } else {
      signUpInputs[1].classList.add("border-danger")
      signUpInputs[1].nextElementSibling.textContent = `This mail is invalid`
      signUpInputs[1].nextElementSibling.classList.replace("d-none", "d-inline-block")
    }


    if(signUpInputs[2].value.match(passRegex)) {
      validationPassword = true
      localStorage.setItem("user", JSON.stringify(user))
      signUpInputs[2].classList.remove("border-danger")
      signUpInputs[2].nextElementSibling.classList.replace("d-inline-block","d-none")
    } else {
      signUpInputs[2].classList.add("border-danger")
      if (signUpInputs[2].nextElementSibling.classList.contains("d-none")) {
        signUpInputs[2].nextElementSibling.classList.replace("d-none", "d-inline-block")
        signUpInputs[2].nextElementSibling.textContent = `The assword must be more than 8 char or digits`
      }
    }




    if(validationName===false || validationMail === false || validationPassword === false) {
      event.preventDefault()
    } else {
      user.push(usersDet)
      loginPart.classList.toggle("active");
      signUpPart.classList.toggle("active")
    }

}




// Login Validation ====================
loginBtn.onclick  = function (event) {
  let validationMail = false
  let validationPassword = false

  for (let i =0; i< len; i++) {
    if ((JSON.parse(localStorage.getItem("user"))[i].uEmail) == loginInputs[0].value ) {
      validationMail = true
      signUpInputs[0].classList.remove("border-danger")
      signUpInputs[0].nextElementSibling.classList.replace("d-inline-block","d-none")
      var welcomeMsg = `Welcome ${(JSON.parse(localStorage.getItem("user"))[i].uName)}`
      } else {
        loginInputs[0].classList.add("border-danger")
        if (loginInputs[0].nextElementSibling.classList.contains("d-none")) {
          loginInputs[0].nextElementSibling.classList.replace("d-none", "d-inline-block")
          loginInputs[0].nextElementSibling.textContent = `This mail is not exist`
        }
    }
    if ((JSON.parse(localStorage.getItem("user"))[i].uPass) == loginInputs[1].value ) {
      validationPassword = true
      signUpInputs[1].classList.remove("border-danger")
      signUpInputs[1].nextElementSibling.classList.replace("d-inline-block","d-none")
      } else {
        loginInputs[1].classList.add("border-danger")
        if (loginInputs[1].nextElementSibling.classList.contains("d-none")) {
          loginInputs[1].nextElementSibling.classList.replace("d-none", "d-inline-block")
          loginInputs[1].nextElementSibling.textContent = `This Password is incorrect`
        }
    }
  }

  
  if( validationMail === false || validationPassword === false) {
    event.preventDefault()
  } else {
    loginPart.classList.toggle("active");
    homePage.classList.toggle("active")
    welcome.innerHTML =welcomeMsg
  } 
}


// Home =================



// login & signUp Swapping ====================
signUpLink.onclick = function () {
  loginPart.classList.toggle("active");
  signUpPart.classList.toggle("active")
}

loginLink.addEventListener("click", function () {
  signUpPart.classList.toggle("active")
  loginPart.classList.toggle("active")
})


// Log Out ==============
logOutBtn.onclick = function () {
  homePage.classList.toggle("active")
  loginPart.classList.toggle("active")
}
