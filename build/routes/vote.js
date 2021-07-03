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
const express_1 = require("express");
const Comment_1 = __importDefault(require("../models/Comment"));
const Post_1 = __importDefault(require("../models/Post"));
const Vote_1 = __importDefault(require("../models/Vote"));
const authentication_1 = __importDefault(require("../services/authentication"));
const vote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier, slug, commentIdentifier, value } = req.body;
    // Validate vote value
    if (![-1, 0, 1].includes(value)) {
        return res.status(400).json({ value: 'Value must be -1, 0 or 1' });
    }
    try {
        const user = res.locals.user;
        let post = yield Post_1.default.findOneOrFail({ identifier, slug });
        let vote;
        let comment;
        if (commentIdentifier) {
            // IF there is a comment identifier find vote by comment
            comment = yield Comment_1.default.findOneOrFail({ identifier: commentIdentifier });
            vote = yield Vote_1.default.findOne({ user, comment });
        }
        else {
            // Else find vote by post
            vote = yield Vote_1.default.findOne({ user, post });
        }
        if (!vote && value === 0) {
            // if no vote and value = 0 return error
            return res.status(404).json({ error: 'Vote not found' });
        }
        else if (!vote) {
            // If no vote create it
            vote = new Vote_1.default({ user, value });
            if (comment)
                vote.comment = comment;
            else
                vote.post = post;
            yield vote.save();
        }
        else if (value === 0) {
            // If vote exists and value = 0 remove vote from DB
            yield vote.remove();
        }
        else if (vote.value !== value) {
            // If vote and value has changed, update vote
            vote.value = value;
            yield vote.save();
        }
        post = yield Post_1.default.findOneOrFail({ identifier, slug }, { relations: ['comments', 'comments.votes', 'sub', 'votes'] });
        post.setUserVote(user);
        post.comments.forEach((c) => c.setUserVote(user));
        return res.json(post);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});
const router = express_1.Router();
router.post('/', authentication_1.default, vote);
exports.default = router;
//# sourceMappingURL=vote.js.map