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
const class_transformer_1 = require("class-transformer");
const Entity_1 = __importDefault(require("./Entity"));
const User_1 = __importDefault(require("./User"));
const makeId_1 = require("../helpers/makeId");
const slugify_1 = require("../helpers/slugify");
const Sub_1 = __importDefault(require("./Sub"));
const Comment_1 = __importDefault(require("./Comment"));
const Vote_1 = __importDefault(require("./Vote"));
let Post = class Post extends Entity_1.default {
    constructor(post) {
        super();
        Object.assign(this, post);
    }
    get url() {
        return `/topic/${this.subName}/${this.identifier}/${this.slug}`;
    }
    get commentCount() {
        var _a;
        return (_a = this.comments) === null || _a === void 0 ? void 0 : _a.length;
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
        this.identifier = makeId_1.makeId(7);
        this.slug = slugify_1.slugify(this.title);
    }
};
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Post.prototype, "identifier", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Post.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Post.prototype, "body", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Post.prototype, "subName", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.default, (user) => user.posts),
    typeorm_1.JoinColumn({ name: 'username', referencedColumnName: 'username' }),
    __metadata("design:type", User_1.default)
], Post.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Sub_1.default, (sub) => sub.posts),
    typeorm_1.JoinColumn({ name: 'subName', referencedColumnName: 'name' }),
    __metadata("design:type", Sub_1.default)
], Post.prototype, "sub", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.OneToMany(() => Comment_1.default, (comment) => comment.post),
    __metadata("design:type", Array)
], Post.prototype, "comments", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.OneToMany(() => Vote_1.default, (vote) => vote.post),
    __metadata("design:type", Array)
], Post.prototype, "votes", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], Post.prototype, "url", null);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Post.prototype, "commentCount", null);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Post.prototype, "voteScore", null);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Post.prototype, "makeIdAndSlug", null);
Post = __decorate([
    typeorm_1.Entity('posts'),
    __metadata("design:paramtypes", [Object])
], Post);
exports.default = Post;
//# sourceMappingURL=Post.js.map