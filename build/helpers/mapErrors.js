"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapErrors = void 0;
const mapErrors = (errors) => {
    return errors.reduce((prev, err) => {
        prev[err.property] = Object.entries(err.constraints)[0][1];
        return prev;
    }, {});
};
exports.mapErrors = mapErrors;
//# sourceMappingURL=mapErrors.js.map