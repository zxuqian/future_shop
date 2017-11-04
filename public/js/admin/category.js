$(document).ready(() => {
    $("#sumitCategory").click((e) => {
        e.preventDefault()
        let formData = new FormData($("#categoryForm")[0])
        let category = {
            name: formData.get("categoryName")
        }
        let url = "/admin/category/"
        let method = "post"

        if(formData.get("parentCategory") != 0) {
            url += formData.get("parentCategory")
        }
        jQuery.ajax(url, {
            method,
            data: category,
            success(data) {
                console.log(data)
            },
            complete(j, e) {
                console.log(e)
            }
        })
    })

    function getJsonFromForm(formData) {
        let obj = {}
        for(let pair of formData.entries()) {
            obj[pair[0]] = pair[1]
        }

        return obj
    }
})