

const uuid = require('uuid')
const path = require('path');


class FileHelper {

    storeImgToStatic(img): string{
        const fileName: string = uuid.v4() + '.jpg';
        img.mv(path.resolve(__dirname, '..', 'static', fileName));
        return fileName
    }
    
}

export default  new FileHelper()