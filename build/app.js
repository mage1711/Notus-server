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
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("./services/config"));
const morgan_1 = __importDefault(require("morgan"));
const trim_1 = __importDefault(require("./services/trim"));
const user_1 = require("./routes/user");
const post_1 = require("./routes/post");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const subs_1 = require("./routes/subs");
const cors_1 = __importDefault(require("cors"));
const vote_1 = __importDefault(require("./routes/vote"));
const app = express_1.default();
var port = (config_1.default.PORT || "7000");
app.set("port", port);
app.use(express_1.default.json());
app.use(morgan_1.default('dev'));
app.use(trim_1.default);
app.use(cookie_parser_1.default());
app.use(cors_1.default({
    credentials: true,
    origin: true,
    optionsSuccessStatus: 200,
}));
app.get('/', (_, res) => res.send('Hello World'));
app.use('/api/user', user_1.user);
app.use('/api/post', post_1.post);
app.use('/api/subs', subs_1.subs);
app.use('/api/vote', vote_1.default);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server running at http://localhost:${port}`);
    try {
        yield typeorm_1.createConnection();
        console.log('Database connected!');
    }
    catch (err) {
        console.log(err);
    }
}));
//# sourceMappingURL=app.js.map