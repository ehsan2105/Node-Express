const imagePickerElement = document.getElementById('image')
const imagePreviewElement = document.getElementById('image-show')


function updateImagePreview(){
    const filse = imagePickerElement.files
    if (!filse||filse.length === 0 ){
        imagePreviewElement.style.display = 'none'
        return
    }
    const pickedfile = filse[0]
    imagePreviewElement.src =  URL.createObjectURL(pickedfile)
    imagePreviewElement.style.display = 'block'
}


imagePickerElement.addEventListener('change',updateImagePreview)
