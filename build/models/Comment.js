"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Entity_1 = __importDefault(require("./Entity"));
const Post_1 = __importDefault(require("./Post"));
const User_1 = __importDefault(require("./User"));
const makeId_1 = require("../helpers/makeId");
const Vote_1 = __importDefault(require("./Vote"));
const class_transformer_1 = require("class-transformer");
let Comment = class Comment extends Entity_1.default {
    constructor(comment) {
        super();
        Object.assign(this, comment);
    }
    get voteScore() {
        var _a;
        return (_a = this.votes) === null || _a === void 0 ? void 0 : _a.reduce((prev, curr) => prev + (curr.value || 0), 0);
    }
    setUserVote(user) {
        var _a;
        const index = (_a = this.votes) === null || _a === void 0 ? void 0 : _a.findIndex((v) => v.username === user.username);
        this.userVote = index > -1 ? this.votes[index].value : 0;
    }
    makeIdAndSlug() {
        this.identifier = makeId_1.makeId(8);
    }
};
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "identifier", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "body", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "username", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.default),
    typeorm_1.JoinColumn({ name: 'username', referencedColumnName: 'username' }),
    __metadata("design:type", User_1.default)
], Comment.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Post_1.default, (post) => post.comments, { nullable: false }),
    __metadata("design:type", Post_1.default)
], Comment.prototype, "post", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.OneToMany(() => Vote_1.default, (vote) => vote.comment),
    __metadata("design:type", Array)
], Comment.prototype, "votes", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Comment.prototype, "voteScore", null);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Comment.prototype, "makeIdAndSlug", null);
Comment = __decorate([
    typeorm_1.Entity('comments'),
    __metadata("design:paramtypes", [Object])
], Comment);
exports.default = Comment;
//# sourceMappingURL=Comment.js.map