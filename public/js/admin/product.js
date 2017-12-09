$(document).ready(() => {

    /**
     * Catetory management
     */
    $("#category_management").on('click', '#sumitCategory', (e) => {
        e.preventDefault()
        let formData = new FormData($("#categoryForm")[0])
        let category = {
            name: formData.get("categoryName")
        }
        let url = "/admin/category/"
        let method = "post"

        if (formData.get("parentCategory") != 0) {
            url += formData.get("parentCategory")
        }
        jQuery.ajax(url, {
            method,
            data: category,
            success(data) {
                $("#category_management").html(data)
                $("#selectParentCategory").html($("#parentCategory").html())
                //console.log($("#selectParentCategory option:first-child"))
                $("#selectParentCategory option:first-child").remove()

            },
            complete(j, e) {
                console.log(e)
            }
        })
    })

    // remove parent categories
    $("#category_management").on('click', '.removeCategoryLink', (e) => {
        e.preventDefault()
        let url = e.currentTarget.href;
        let method = "delete"
        jQuery.ajax(url, {
            method,
            success(data) {
                //console.log(data)
                $("#category_management").html(data)
                $("#selectParentCategory").html($("#parentCategory").html())
                $("#selectParentCategory option:first-child").remove()
            },
            complete(j, e) {
                console.log(e)
            }
        })
    })

    // remove sub-categories
    $("#category_management").on('click', '.removeSubCategoryLink', (e) => {
        e.preventDefault()
        let url = e.currentTarget.href;
        let method = "delete"
        jQuery.ajax(url, {
            method,
            success(data) {
                //console.log(data)
                $("#category_management").html(data)
            },
            complete(j, e) {
                console.log(e)
            }
        })
    })

    function getJsonFromForm(formData) {
        let obj = {}
        for (let pair of formData) {
            obj[pair[0]] = pair[1]
        }

        return obj
    }

    /**
     * Product management
     */

    // When dialog show, load sub category of the first select
    $("#addProductModal").on('show.bs.modal', () => {
        let cateId = $("#selectParentCategory option")[0].value
        changeSubCategorySelection(cateId)
    })

    // add product image
    $("#productImage").on('change', (event) => {
        let files = event.currentTarget.files
        //alert(file.name)
        if(!files[0]) return
        let file = files[0]
        $(".custom-file-control").text(file.name)
    })

    // add product
    $("#save-product-btn").click((e) => {
        let formData = $("#save-product-form").serializeArray()
        let obj = {}
        obj.sizes = new Array()
        formData.forEach((val) => {
            let key = val.name
            let value = val.value         
            switch(key) {
                case "size_s": obj.sizes.push({name: "S", quantity: value})
                break;
                case "size_m": obj.sizes.push({name: "M", quantity: value})
                break;
                case "size_l": obj.sizes.push({name: "L", quantity: value})
                break;
                case "size_xl": obj.sizes.push({name: "XL", quantity: value})
                break;
                default:
                obj[key] = value
            }
        })

        let url = "/admin/product"
        let method = "post"

        let save = function() {
            jQuery.ajax(url, {
                method,
                data: obj,
                success(data) {
                    $("#addProductModal").modal('hide')
                    $("#product_management").html(data)
                },
                complete(j, e) {
                    console.log(e + " from save function")
                }
            })
        }

        let imageFile = $("#productImage")[0].files[0]
        if(imageFile) {
            imageData = new FormData()
            imageData.append("image", imageFile)

            jQuery.ajax("/admin/upload", {
                method: "post",
                processData: false,
                contentType: false,
                data: imageData,
                success(data) {
                    obj.featuredImage = data.path
                    save()
                },
                complete(j, e) {
                    console.log(e + " from upload function")
                }
            })
        } else {
            save()
        }

    })

    /**
     * Add listener to category selection
     */
    $("#selectParentCategory").change((e) => {
        let parentId = $("#selectParentCategory").val()
        $("#selectSubCategory").html("<option value='0'>None</option>")
        if(!parentId) return
        changeSubCategorySelection(parentId)
    })

    function changeSubCategorySelection(cateId) {
        jQuery.ajax("/admin/category/" + cateId + "/subcategories", {
            method: "get",
            success(data) {
                //console.log(data)
                if(!data) return
                for(let subCategory of data) {
                    $("#selectSubCategory").append(`<option value=${subCategory._id}>${subCategory.name}</option>`)
                }
            },
            complete(j, e) {
                console.log(e + " from get subcategories function")
            }
        })
    }

    /**
     * Delete product
     */
    $("#product_management").on("click", ".removeProductLink", (e) => {
        e.preventDefault()
        let url = e.currentTarget.href;
        let method = "delete"
        jQuery.ajax(url, {
            method,
            success(data) {
                $("#product_management").html(data)
            },
            complete(j, e) {
                console.log(e + " from delete function")
            }
        })
    })

    $("#addProductModal").on('hidden.bs.modal', () => {
        $("#save-product-form")[0].reset()
    })


})