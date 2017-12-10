$(document).ready(() => {

    // change quantity
    $(".updateQuantity").change((e) => {
        let input = e.currentTarget
        let quantity = $(input).val()
        let productId = $(input).attr("data-id")
        if(quantity == 0) {

        } else if(quantity < 0) {

        } else {
            let unitPrice = $("[data-id='" + productId + "']").filter(".unitPrice").text()
            let quantity = $("[data-id='" + productId + "']").filter(".updateQuantity").val()
            let subTotal = $("[data-id='" + productId + "']").filter(".subTotal")
            subTotal.text((unitPrice * quantity).toFixed(2))

            let sum = 0;
            $(".subTotal").each((i, val) => {
                sum += Number.parseFloat($(val).text())
            })
            let totalPrice = $("#totalPrice").text(sum.toFixed(2))


            jQuery.ajax("/cart", {
                method: "put",
                data: {
                    productId,
                    quantity
                },
                beforeSend() {
                    $(input).attr("disabled", true)
                    $("#checkoutButton").attr("disabled", true)
                },
                success(data) {
    
                },
                complete() {
                    $(input).attr("disabled", false)
                    $("#checkoutButton").attr("disabled", false)
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
                        $("#cartTable").after("<div class='alert alert-danger' role='alert' id='errorMsg'>You must login to proceed</div>")
                    }
                }
            }
        })
    }) 

    /////// Checkout page
    //save recipents?
    $("#useNewAddress").change(e => {
        let val = $("#useNewAddress").prop("checked")
        if(val) {
            $("#newAddressForm").removeClass("d-none")
        } else {
            $("#newAddressForm").addClass("d-none")
        }
    })
})