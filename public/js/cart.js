$(document).ready(() => {

    // change quantity
    $(".updateQuantity").change((e) => {
        let input = e.currentTarget
        let quantity = $(input).val()
        let productId = $(input).attr("data-id")
        if(quantity == 0) {

        } else if(quantity < 0) {

        } else {
            jQuery.ajax("/cart", {
                method: "put",
                data: {
                    productId,
                    quantity
                },
                beforeSend() {
                    $(input).attr("disabled", true)
                },
                success(data) {
    
                },
                complete() {
                    $(input).attr("disabled", false)
                }
            })
        }
    })

    // Check if logged in
    $("#checkoutButton").click(e => {
        e.preventDefault()
        jQuery.ajax("/isLoggedIn", {
            method: "get",
            success(data) {
                if(data) {
                    window.location.href = $("#checkoutButton").attr("href")
                } else {
                    if(!$("#errorMsg").length) {
                        $("#checkoutButton").before("<p id='errorMsg'>You must login to proceed</p>")
                    }
                }
            }
        })
    }) 

    /////// Checkout page
    //save recipents?
    $("#addNewAddress").click(e => {
        $("#newAddressForm").toggleClass("d-none")
    })
})