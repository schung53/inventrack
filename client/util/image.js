import { uploadImage } from '../features/inventory/inventoryAPI'

// Modified from source: https://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
// Creates a new canvas element, resizes given image, and returns as Blob
export const generateThumbnail = async (file) => {
    var canvas = document.createElement("canvas");
    var fr = new FileReader();

    fr.addEventListener('load', () => {
        var img = new Image();
        img.src = fr.result;
        
        var MAX_WIDTH = 400;
        var MAX_HEIGHT = 400;
        var width = img.width;
        var height = img.height;

        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }

        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
            let file = new File([blob], "fileName.jpg", { type: "image/jpeg" });
            uploadImage(file);
        }, 'image/jpeg');
    }, false);

    fr.readAsDataURL(file);
}
