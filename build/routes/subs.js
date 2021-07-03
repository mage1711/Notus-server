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
exports.subs = void 0;
const express_1 = require("express");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Sub_1 = __importDefault(require("../models/Sub"));
const authentication_1 = __importDefault(require("../services/authentication"));
const loggedIn_1 = __importDefault(require("../services/loggedIn"));
const Post_1 = __importDefault(require("../models/Post"));
const router = express_1.Router();
exports.subs = router;
router.post('/', authentication_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, title, description } = req.body;
    const user = res.locals.user;
    try {
        let errors = {};
        if (class_validator_1.isEmpty(name))
            errors.name = 'Name must not be empty';
        if (class_validator_1.isEmpty(title))
            errors.title = 'Title must not be empty';
        const sub = yield typeorm_1.getRepository(Sub_1.default)
            .createQueryBuilder('sub')
            .where('lower(sub.name) = :name', { name: name.toLowerCase() })
            .getOne();
        if (sub)
            errors.name = 'Sub exists already';
        if (Object.keys(errors).length > 0) {
            throw errors;
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
    try {
        const sub = new Sub_1.default({ name, description, title, user });
        yield sub.save();
        return res.json(sub);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}));
router.get('/:name', loggedIn_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.params.name;
    try {
        const sub = yield Sub_1.default.findOneOrFail({ name });
        const posts = yield Post_1.default.find({
            where: { sub },
            order: { createdAt: 'DESC' },
            relations: ['comments', 'votes'],
        });
        sub.posts = posts;
        if (res.locals.user) {
            sub.posts.forEach((p) => p.setUserVote(res.locals.user));
        }
        return res.json(sub);
    }
    catch (err) {
        console.log(err);
        return res.status(404).json({ sub: 'Sub not found' });
    }
}));
router.get('/search/:name', loggedIn_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name;
        if (class_validator_1.isEmpty(name)) {
            return res.status(400).json({ error: 'Name must not be empty' });
        }
        // reactJS , reactjs
        const subs = yield typeorm_1.getRepository(Sub_1.default)
            .createQueryBuilder()
            // react => rea
            .where('LOWER(name) LIKE :name', {
            name: `${name.toLowerCase().trim()}%`,
        })
            .getMany();
        return res.json(subs);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}));
//# sourceMappingURL=subs.js.map