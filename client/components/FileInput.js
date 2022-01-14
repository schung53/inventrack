import React, { Component } from 'react'
import { uploadImage } from '../features/inventory/inventoryAPI';
import { resize } from '../util/image'

export default class FileInput extends Component {
    _readURL = (file) => {
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = (e) => { res(e.target.result) };
            reader.onerror = (e) => { rej(e) };
            reader.readAsDataURL(file);
        });
    }

    render() {
        var img = new Image();
        var canvas = document.createElement('canvas');

        const setImage = async (event) => {
            const file = event.target.files[0];
            const url = await this._readURL(file);

            img.addEventListener('load', () => {
                var newDimensions = resize(img.naturalWidth, img.naturalHeight)

                canvas.width = newDimensions.width;
                canvas.height = newDimensions.height;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, newDimensions.width, newDimensions.height);
            });

            img.src = url;
        }

        const handleSubmit = () => {
            canvas.toBlob((blob) => {
                const fileName = document.getElementById('imageUpload').files.item(0).name;
                let resizedFile = new File([blob], fileName, { type: "image/jpeg" });
                uploadImage(resizedFile);
            }, 'image/jpeg');
        }

        return (
            <div>
                <input type="file" id="imageUpload" name="file" onChange={setImage} />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        );
    }
}
