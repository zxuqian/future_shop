$(document).ready(() => {
    // Add user event
    $("#save-user-btn").click((event) => {
        // Basic info
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
        //console.log(user)
        jQuery.ajax("/admin/user/", {
            data: user,
            dataType: "html",
            method: "post",
            success(data) {
                $("#userTable").html(data)
            },
            complete() {
                $("#addUserModal").modal('hide')
            }
        })
        
    })

    // Add listener to Modal
    // $("#addUserModal").on('hidden.bs.modal', () => {
    //     $(this).data('bs.modal', null)
    // })
})