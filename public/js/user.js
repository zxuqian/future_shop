$(document).ready(() => {

    // Add user event
    $("#save-user-btn").click((event) => {
        event.preventDefault()
        let formData = new FormData($("#save-user-form")[0])
        console.log(formData.get("profile"))
        let method = "put"
        let url = "/user/profile"
        jQuery.ajax(url, {
            data: formData,
            processData: false,
            contentType: false,
            method,
            success(data) {
                console.log(data)
                //toastr.success('Update successfully', null, {timeOut: 2000, positionClass: "toast-bottom-right",})
                window.location.reload(true)
            },
            complete(j, e) {
                console.log(e + " in saing user profile")
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

        // let formData = new FormData()
        // formData.append("image", file)

        // $("#save-user-btn").attr("disabled", true)
        // jQuery.ajax("/admin/upload", {
        //     data: formData,
        //     contentType: false, // Imperative! https://stackoverflow.com/questions/5392344/sending-multipart-formdata-with-jquery-ajax
        //     method: "post",
        //     processData: false, // Necessary, for jQuery will automatially convert form data to query strings
        //     success(data) {
        //         profileImage = data.path
        //     },
        //     complete() {
        //         $("#save-user-btn").attr("disabled", false)
        //     }
        // })
    })

})

