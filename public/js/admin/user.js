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

    let profileImageInput = $("#profileImage")
    let profileImage = undefined

    function reset() {
        // Basic info
        $("#inputEmail").val("")
        $("#inputPassword").val("")
        $("#inputUsername").val("")
        $("#inputPhone").val("")
        $("#inputAddress").val("")
        $("#inputAddress2").val("")
        $("#inputCity").val("")
        $("#inputState").val("")
        $("#inputZip").val("")
        $("#inputCountry").val("")

        // Profile
        $("#inputFirstName").val("")
        $("#inputLastName").val("")
        $("#inputBirthday").val("")
        $("#inputAge").val("")
        $(".custom-file-control").text("Choose file...")
        profileImageInput[0] = null
        profileImage = undefined
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

        if(profileImage) {
            user.profile.profileImage = "/" + profileImage
        }
        return user
    }

    function setValueToForm(user) {
        try {
            // Basic info
            $("#inputEmail").val(user.email)
            $("#inputPassword").val(user.password)
            $("#inputUsername").val(user.username)
            $("#inputPhone").val(user.mobilePhone)
            $("#inputAddress").val(user.homeAddress.addressLine1)
            $("#inputAddress2").val(user.homeAddress.addressLine2)
            $("#inputCity").val(user.homeAddress.city)
            $("#inputState").val(user.homeAddress.state)
            $("#inputZip").val(user.homeAddress.zipCode)
            $("#inputCountry").val(user.homeAddress.country)

            // Profile
            $("#inputFirstName").val(user.profile.firstName)
            $("#inputLastName").val(user.profile.lastName)
            $("#inputBirthday").val(user.profile.dateOfBirth)
            $("#inputAge").val(user.profile.age)

            $(".custom-file-control").text(user.profile.profileImage)
        } catch (e) {
            // No need to do anything
        }
        
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

    //When user upload an image
    $("#profileImage").on('change', (event) => {
        let files = event.currentTarget.files
        //alert(file.name)
        if(!files[0]) return
        let file = files[0]
    
        $(".custom-file-control").text(file.name)

        let formData = new FormData()
        formData.append("image", file)

        $("#save-user-btn").attr("disabled", true)
        jQuery.ajax("/admin/upload", {
            data: formData,
            contentType: false, // Imperative! https://stackoverflow.com/questions/5392344/sending-multipart-formdata-with-jquery-ajax
            method: "post",
            processData: false, // Necessary, for jQuery will automatially convert form data to query strings
            success(data) {
                profileImage = data.path
            },
            complete() {
                $("#save-user-btn").attr("disabled", false)
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

