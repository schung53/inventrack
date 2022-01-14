import { uploadImage } from '../features/inventory/inventoryAPI'

// Modified from source: https://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
// Creates a new canvas element, resizes given image, and returns as Blob
export const generateThumbnail = async (file) => {
    var fr = new FileReader();

    fr.addEventListener('load', () => {
        var img = new Image();
        var canvas = document.createElement("canvas");
        img.src = fr.result;
        console.log(img);

        var MAX_WIDTH = 400;
        var MAX_HEIGHT = 400;
        var width = img.width;
        var height = img.height;
        console.log('Dimensions: ', width, height)

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
        console.log(canvas);

        canvas.toBlob((blob) => {
            let file = new File([blob], "fileName.jpg", { type: "image/jpeg" });
            console.log(JSON.stringify(file));
        }, 'image/jpeg');
    }, false);

    fr.readAsDataURL(file);
}

const preview = async (event) => {
    const file = event.target.file //CHANGE
    const url = await readURL(file);
    img.src = url;
}

const readURL = (file) => {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = (e) => { res(e.target.result) };
        reader.onerror = (e) => { rej(e) };
        reader.readAsDataURL(file);
    });
}

const fileInput = document.createElement('input');
fileInput.type = 'file';
const img = document.createElement('img');
img.attributeStyleMap.set('max-width', '320px');

fileInput.addEventListener('change', preview)