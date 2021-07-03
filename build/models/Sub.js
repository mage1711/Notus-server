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
const User_1 = __importDefault(require("./User"));
const Post_1 = __importDefault(require("./Post"));
let Sub = class Sub extends Entity_1.default {
    constructor(sub) {
        super();
        Object.assign(this, sub);
    }
};
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Sub.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Sub.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Sub.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Sub.prototype, "imageUrn", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Sub.prototype, "bannerUrn", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.default),
    typeorm_1.JoinColumn({ name: 'username', referencedColumnName: 'username' }),
    __metadata("design:type", User_1.default)
], Sub.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => Post_1.default, (post) => post.sub),
    __metadata("design:type", Array)
], Sub.prototype, "posts", void 0);
Sub = __decorate([
    typeorm_1.Entity('subs'),
    __metadata("design:paramtypes", [Object])
], Sub);
exports.default = Sub;
//# sourceMappingURL=Sub.js.map