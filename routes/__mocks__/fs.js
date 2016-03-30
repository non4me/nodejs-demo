'use strict';

const path = require('path');

let mockFiles = Object.create(null);

function __setMockFiles(newMockFiles) {

    for (const file in newMockFiles) {
        const dir = path.dirname(file);

        if (!mockFiles[dir]) {
            mockFiles[dir] = [];
        }
        mockFiles[dir].push(path.basename(file));
    }
}

function readdirSync(directoryPath) {
    return mockFiles[directoryPath] || [];
}

exports.__setMockFiles = __setMockFiles;
exports.createWriteStream = createWriteStream;