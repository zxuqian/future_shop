$(document).ready(() => {
    // Login
    $("#loginButton").click(e => {
        e.preventDefault()
        let loginForm = $("#loginForm")[0]
        let formData = new FormData(loginForm)
        let userObj = {
            username: formData.get("username"),
            password: formData.get("password")
        }

        jQuery.ajax("/login", {
            method: "post",
            data: userObj,
            success(data) {
                console.log(data)
                $("#accountName").text(`Hello, ${data.profile.firstName}`)
                $("#accountName").attr("href", "/user")
                $("#loginForm").addClass("d-none")
                $("#logout").removeClass("d-none")
            },
            error(jxr) {
                // User name or password not correct
            },
            complete(jxr, e) {
                //console.log(e)
            }
        })

    })

    // Show register modal
    $("#registerModalButton").click(e => {
        e.preventDefault();
        $("#registrationModel").modal('show')
    })

    // Register
    $("#registerButton").click(e => {
        //e.preventDefault()
        let registrationForm = $("#registrationForm")[0]
        if (registrationForm.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()   
            registrationForm.classList.add('was-validated')     
            return
        }

        registrationForm.classList.add('was-validated')

        let formData = new FormData(registrationForm)

        let userObj = {}
        userObj.profile = {}
        for(entry of formData) {
            if(entry[0] === "firstName" || entry[0] === "lastName") {
                userObj.profile[entry[0]] = entry[1]
            } else {
                userObj[entry[0]] = entry[1]
            }
            
        }
        jQuery.ajax("/register", {
            method: "post",
            data: userObj,
            success(data) {
                //console.log(data)
                $("#registrationModel").modal('hide')
                registrationForm.reset()
                registrationForm.classList.remove('was-validated')
                toastr.success('Register successfully', null, {timeOut: 2000, positionClass: "toast-top-right",})
            },
            complete(j, e) {
                console.log(e)
            }
        })
    })

    // add to cart
    $(".addToCart").click((e) => {
        e.preventDefault()
        let productId = $(e.currentTarget).attr("data-id")
        //console.log(productId)
        let quantity = 1;
        let cartItem = {
            productId,
            quantity
        }

        jQuery.ajax("/cart", {
            method: "post",
            data: cartItem,
            success(data) {
                //console.log(data)
                $("#shoppingNumber").text(`(${data})`)
                toastr.success('Add to cart successfully', null, {timeOut: 2000, positionClass: "toast-bottom-right",})
            },
            compelete(j, e) {
                console.log(e)
            }
        })  
    })
})