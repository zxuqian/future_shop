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
                $("#accountName").text(`Hello, ${data.firstName}`)
            },
            error(jxr) {
                // User name or password not correct
            },
            complete(jxr, e) {
                //console.log(e)
            }
        })

    })
})