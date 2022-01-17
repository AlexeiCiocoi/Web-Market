"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require('uuid');
const path = require('path');
class FileHelper {
    storeImgToStatic(img) {
        const fileName = uuid.v4() + '.jpg';
        img.mv(path.resolve(__dirname, '..', 'static', fileName));
        return fileName;
    }
}
exports.default = new FileHelper();
//# sourceMappingURL=fileHelper.js.map