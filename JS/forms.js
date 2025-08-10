// registration form inputs and elements

// registration form inputs and elements


function registerUser() {
    event.preventDefault();
    const reg_email = document.getElementById("reg_email")
    const reg_username = document.getElementById("reg_username")
    const reg_phone = document.getElementById("reg_tel")
    const reg_password = document.getElementById("reg_pass")
    const reg_confirm_password = document.getElementById("reg_conf_pass")

    let users = JSON.parse(localStorage.getItem("users"))
    if (!users) {
        users = []
    }

    if (reg_email.value && reg_username.value && reg_password.value && reg_phone.value) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].userEmail === reg_email.value) {
                // alert("User with this email already exists");
                resultPage(`<i class="fa-solid fa-triangle-exclamation"></i>`, `Already Exist`, `Your account is already exist.`, `./login.html`, `Login`)
            }

            const email_regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

            if (!email_regex.test(reg_email.value)) {
                document.querySelector(".display_error").classList.remove("hidden");
                document.querySelector(".display_error").textContent = `Your email is Invalid.`
                return;
            }

            const password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            let password_div = document.querySelector(".password");
            if (!password_regex.test(reg_password.value)) {
                password_div.children[1].classList.remove("hidden");
                password_div.children[1].textContent = "Your Password is weak."
                return;
            };
            if (reg_password.value !== reg_confirm_password.value) {
                password_div.children[1].classList.remove("hidden");
                password_div.children[1].textContent = "Password do not match."
                return;
            }
        }
        users.push({ userEmail: reg_email.value, userName: reg_username.value, phoneNumber: reg_phone.value, password: reg_password.value })
        localStorage.setItem("users", JSON.stringify(users))
        emptyInputVals(reg_email, reg_username, reg_phone, reg_password, reg_confirm_password)
        resultPage(`<i class="fa-solid fa-circle-check"></i>`, `Registered`, `Your account has been created.`, `./login.html`, `Login to continue...`)
    }
}

function emptyInputVals(email, username, phoneNumber, password) {
    for (let i = 0; i < arguments.length; i++) {
        arguments[i].value = "";
    }
}
function resultPage(mainIcon, heading, successMsg, btnRoute, btnText) {
    event.preventDefault()
    let card = document.querySelector(".card");
    card.innerHTML = `<div class="success">
        <div class="success-icon">${mainIcon}</div>
        <div class="success-heading"><h2>${heading}</h2></div>
        <div class="success-msg"><p>${successMsg}</p></div>
        <div class="action_btn-sec">
            <button >
                <a href=${btnRoute}>${btnText}</a>
            </button>
        </div>
    </div>`
}

let flag = false;
function loginUser() {

    const login_email = document.getElementById("login_email_input");
    const login_pass = document.getElementById("login_pass_input");
    let users = JSON.parse(localStorage.getItem("users"));

    for (let i = 0; i < users.length; i++) {
        if (users[i].userEmail === login_email.value && users[i].password === login_pass.value) {
            flag = true;
            resultPage(`<i class="fa-solid fa-circle-check"></i>`, `Logged In`, `You are Logged In.`, `./index.html`, `Go to Home`)
        } else if (users[i].userEmail !== login_email.value && users[i].password === login_pass.value) {
            flag = true;
            let displayErrorEmail = document.querySelector(".email");
            displayErrorEmail.classList.remove("hidden")
            displayErrorEmail.textContent = `Your email is Incorrect.`
        } else if (users[i].userEmail === login_email.value && users[i].password !== login_pass.value) {
            flag = true;
            let displayErrorPass = document.querySelector(".password");
            displayErrorPass.classList.remove("hidden")
            displayErrorPass.textContent = `Your password is Incorrect.`
        }
        //  else {
        // let displayErrorPass = document.querySelector(".password");
        // displayErrorPass.classList.remove("hidden")
        // displayErrorPass.textContent = `Account not found.`
        // }
    }
    if (!flag) {
        let displayErrorPass = document.querySelector(".password");
        displayErrorPass.classList.remove("hidden")
        displayErrorPass.textContent = `Account not found.`
    }
}

