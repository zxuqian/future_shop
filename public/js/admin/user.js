$(document).ready(() => {

    // Basic info
    let email = $("#inputEmail")
    let password = $("#inputPassword")
    let username = $("#inputUsername")
    let mobilePhone = $("#inputPhone")
    let addressLine1 = $("#inputAddress")
    let addressLine2 = $("#inputAddress2")
    let city = $("#inputCity")
    let state = $("#inputState")
    let zipCode = $("#inputZip")
    let country = $("#inputCountry")

    // Profile
    let firstName = $("#inputFirstName")
    let lastName = $("#inputLastName")
    let dateOfBirth = $("#inputBirthday")
    let age = $("#inputAge")

    function reset() {
        // Basic info
        let email = $("#inputEmail").val("")
        let password = $("#inputPassword").val("")
        let username = $("#inputUsername").val("")
        let mobilePhone = $("#inputPhone").val("")
        let addressLine1 = $("#inputAddress").val("")
        let addressLine2 = $("#inputAddress2").val("")
        let city = $("#inputCity").val("")
        let state = $("#inputState").val("")
        let zipCode = $("#inputZip").val("")
        let country = $("#inputCountry").val("")

        // Profile
        let firstName = $("#inputFirstName").val("")
        let lastName = $("#inputLastName").val("")
        let dateOfBirth = $("#inputBirthday").val("")
        let age = $("#inputAge").val("")
    }

    function getUserObject() {
        let email = $("#inputEmail").val()
        let password = $("#inputPassword").val()
        let username = $("#inputUsername").val()
        let mobilePhone = $("#inputPhone").val()
        let addressLine1 = $("#inputAddress").val()
        let addressLine2 = $("#inputAddress2").val()
        let city = $("#inputCity").val()
        let state = $("#inputState").val()
        let zipCode = $("#inputZip").val()
        let country = $("#inputCountry").val()
    
        // Profile
        let firstName = $("#inputFirstName").val()
        let lastName = $("#inputLastName").val()
        let dateOfBirth = $("#inputBirthday").val()
        let age = $("#inputAge").val()

        let user = {
            email,
            password,
            username,
            mobilePhone,
            accountCreationDate: new Date(),
            homeAddress: {
                addressLine1,
                addressLine2,
                city,
                state,
                zipCode,
                country,
                phoneNumber: mobilePhone
            },
            profile: {
                firstName,
                lastName,
                dateOfBirth,
                age
            }
        }
        return user
    }

    function setValueToForm(user) {
        // Basic info
        let email = $("#inputEmail").val(user.email)
        let password = $("#inputPassword").val(user.password)
        let username = $("#inputUsername").val(user.username)
        let mobilePhone = $("#inputPhone").val(user.mobilePhone)
        let addressLine1 = $("#inputAddress").val(user.addressLine1)
        let addressLine2 = $("#inputAddress2").val(user.addressLine2)
        let city = $("#inputCity").val(user.city)
        let state = $("#inputState").val(user.state)
        let zipCode = $("#inputZip").val(user.zipCode)
        let country = $("#inputCountry").val(user.country)

        // Profile
        let firstName = $("#inputFirstName").val(user.firstName)
        let lastName = $("#inputLastName").val(user.lastName)
        let dateOfBirth = $("#inputBirthday").val(user.dateOfBirth)
        let age = $("#inputAge").val(user.age)
    }

    // Add user event
    $("#save-user-btn").click((event) => {
        let user = getUserObject()
        let method = "post"
        let url = "/admin/user/"
        //console.log(user)
        if(isUpdate) {
            url += userId
            method = "put"
        }
        jQuery.ajax(url, {
            data: user,
            dataType: "html",
            method,
            success(data) {
                $("#userTable").html(data)
            },
            complete() {
                $("#addUserModal").modal('hide')
                isUpdate = false
                userId = ""
            }
        })
        
    })

    let isUpdate = false;
    let userId;
    $("#userTable").on("click", ".updateUserLink", (event) => {
        event.preventDefault()
        let url = event.currentTarget.href
        jQuery.ajax(url, {
            dataType: "json",
            method: "get",
            success(data) {
                $("#addUserModal").modal('show')
                setValueToForm(data)
                userId = data._id
                isUpdate = true;
            }
        })
    })

    $("#userTable").on("click", ".removeUserLink", (event) => {
        event.preventDefault()
        let url = event.currentTarget.href
        jQuery.ajax(url, {
            method: "delete",
            success(data) {
                $("#userTable").html(data)
            }
        })
    })

    $("#userTable").on("click", ".checkDetails", (event) => {
        event.preventDefault()
        let url = event.currentTarget.href
        jQuery.ajax(url, {
            method: "get",
            dataType: "json",
            success(data) {
                setValueToForm(data)
                $("#save-user-form input, #save-user-btn").attr("disabled", true)
                $("#addUserModal").modal('show')
            }
        })
    })



    // Add listener to Modal
    $("#addUserModal").on('hidden.bs.modal', () => {
        $("#save-user-form input, #save-user-btn").attr("disabled", false)
        reset()
    })
})



