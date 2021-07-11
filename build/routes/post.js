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
exports.post = void 0;
const express_1 = __importDefault(require("express"));
const Post_1 = __importDefault(require("../models/Post"));
const Sub_1 = __importDefault(require("../models/Sub"));
const authentication_1 = __importDefault(require("../services/authentication"));
const Comment_1 = __importDefault(require("../models/Comment"));
const loggedIn_1 = __importDefault(require("../services/loggedIn"));
const cloudinary_1 = require("../services/cloudinary");
const router = express_1.default.Router();
exports.post = router;
router.get('/', loggedIn_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentPage = (req.query.page || 0);
    const postsPerPage = (req.query.count || 10);
    try {
        const posts = yield Post_1.default.find({
            order: { createdAt: 'DESC' },
            relations: ['comments', 'votes', 'sub'],
            skip: currentPage * postsPerPage,
            take: postsPerPage,
        });
        if (res.locals.user) {
            posts.forEach((p) => p.setUserVote(res.locals.user));
        }
        return res.json(posts);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}));
router.get('/:identifier/:slug', loggedIn_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier, slug } = req.params;
    try {
        const post = yield Post_1.default.findOneOrFail({ identifier, slug }, { relations: ['sub', 'votes', 'comments'] });
        if (res.locals.user) {
            post.setUserVote(res.locals.user);
        }
        return res.json(post);
    }
    catch (err) {
        console.log(err);
        return res.status(404).json({ error: 'Post not found' });
    }
}));
router.post('/', authentication_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body, sub, mediaLink } = req.body;
    const user = res.locals.user;
    if (title.trim() === '') {
        return res.status(400).json({ title: 'Title must not be empty' });
    }
    try {
        // find sub
        const subRecord = yield Sub_1.default.findOneOrFail({ name: sub });
        const post = new Post_1.default({ title, body, user, sub: subRecord, mediaLink });
        yield post.save();
        return res.json(post);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}));
router.post('/:identifier/:slug/comments', authentication_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier, slug } = req.params;
    const body = req.body.body;
    try {
        const post = yield Post_1.default.findOneOrFail({ identifier, slug });
        const comment = new Comment_1.default({
            body,
            user: res.locals.user,
            post,
        });
        yield comment.save();
        return res.json(comment);
    }
    catch (err) {
        console.log(err);
        return res.status(404).json({ error: 'Post not found' });
    }
}));
router.post('/upload', cloudinary_1.uploadCloud.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(req.file);
}));
router.get('/:identifier/:slug/comments', loggedIn_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier, slug } = req.params;
    try {
        const post = yield Post_1.default.findOneOrFail({ identifier, slug });
        const comments = yield Comment_1.default.find({
            where: { post },
            order: { createdAt: 'DESC' },
            relations: ['votes'],
        });
        if (res.locals.user) {
            comments.forEach((c) => c.setUserVote(res.locals.user));
        }
        return res.json(comments);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}));
//# sourceMappingURL=post.js.map