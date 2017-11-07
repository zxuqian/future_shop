$(document).ready(() => {

    // Register
    $("#registerButton").click(e => {
        e.preventDefault()
        let registrationForm = $("#registrationForm")[0]
        let formData = new FormData(registrationForm)

        let userObj = {}
        for(entry of formData) {
            userObj[entry[0]] = entry[1]
        }
        jQuery.ajax("/register", {
            method: "post",
            data: userObj,
            success(data) {
                //console.log(data)
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
            },
            compelete(j, e) {
                console.log(e)
            }
        })  
    })

})