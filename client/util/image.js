const MAX_WIDTH = 400;
const MAX_HEIGHT = 400;

export const resize = (width, height) => {
    var newDimensions = {
        width: width,
        height: height
    }

    if (width > height) {
        if (width > MAX_WIDTH) {
            newDimensions.height *= MAX_WIDTH / width;
            newDimensions.width = MAX_WIDTH;
        }
    } else {
        if (height > MAX_HEIGHT) {
            newDimensions.width *= MAX_HEIGHT / height;
            newDimensions.height = MAX_HEIGHT;
        }
    }

    return newDimensions;
}
