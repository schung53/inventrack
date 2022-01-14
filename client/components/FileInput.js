import React, { Component } from 'react'

const MAX_WIDTH = 400;
const MAX_HEIGHT = 400;

export default class FileInput extends Component {

    _readURL = (file) => {
        console.log(file); // !
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = (e) => { alert(e.target.result.width + " " + this.height); res(e.target.result) };
            reader.onerror = (e) => { rej(e) };
            reader.readAsDataURL(file);
        });
    }

    render() {
        var canvas = document.createElement('canvas');

        const setImage = async (event) => {
            const file = event.target.files[0];
            console.log(file); // !
            const url = await this._readURL(file);

            var img = document.createElement('img');
            img.src = url;
            console.log(img); // !
            document.body.appendChild(img)

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
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            console.log(canvas); // !
        }

        const handleSubmit = () => {
            canvas.toBlob((blob) => {
                let file = new File([blob], 'fileName.jpg', { type: "image/jpeg" });
                console.log(file);
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
