"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const class_validator_1 = require("class-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../services/config"));
const authentication_1 = __importDefault(require("../services/authentication"));
const mapErrors_1 = require("../helpers/mapErrors");
const router = express_1.default.Router();
exports.user = router;
router.get('/', (_, res) => {
    res.send("user");
});
router.post('/register', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    try {
        // Validate data
        let errors = {};
        const emailUser = yield User_1.default.findOne({ email });
        const usernameUser = yield User_1.default.findOne({ username });
        if (emailUser)
            errors.email = 'Email is already taken';
        if (usernameUser)
            errors.username = 'Username is already taken';
        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors);
        }
        // Create the user
        const user = new User_1.default({ email, username, password });
        errors = yield class_validator_1.validate(user);
        if (errors.length > 0)
            return res.status(400).json(mapErrors_1.mapErrors(errors));
        yield user.save();
        // Return the user
        return res.json(user);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}));
router.post('/login', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let errors = {};
        if (class_validator_1.isEmpty(email))
            errors.email = 'Email should not be empty';
        if (class_validator_1.isEmpty(password))
            errors.password = 'Password should not be empty';
        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors);
        }
        const user = yield User_1.default.findOne({ email });
        // const user = await User.findOne({ username })
        if (!user)
            return res.status(404).json({ error: 'This user does not exist' });
        const passwordMatches = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatches)
            return res.status(401).json({ error: 'incorrect credentials ' });
        const token = jsonwebtoken_1.default.sign({ email }, config_1.default.JWT_SECRET_KEY);
        res.cookie('token', token, { httpOnly: true, secure: config_1.default.NODE_ENV === 'production', sameSite: 'strict', maxAge: 40000000, path: "/" });
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json({ error: "something went wrong" });
    }
}));
router.get('/profile', authentication_1.default, (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json(res.locals.user);
}));
router.get('/logout', authentication_1.default, (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    return res.json({ success: "logged out" });
}));
//# sourceMappingURL=user.js.map