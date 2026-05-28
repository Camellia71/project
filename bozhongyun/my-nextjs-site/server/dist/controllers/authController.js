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
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const db_1 = require("../db");
const auth_1 = require("../middleware/auth");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: '邮箱和密码不能为空' });
            return;
        }
        const user = yield (0, db_1.findUserByEmail)(email);
        if (!user) {
            res.status(401).json({ error: '邮箱或密码错误' });
            return;
        }
        const isValidPassword = (0, db_1.verifyPassword)(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({ error: '邮箱或密码错误' });
            return;
        }
        const token = (0, auth_1.generateToken)(user.id);
        res.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            token,
        });
    }
    catch (error) {
        console.error('登录错误:', error);
        res.status(500).json({ error: '服务器内部错误' });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: '邮箱和密码不能为空' });
            return;
        }
        if (password.length < 6) {
            res.status(400).json({ error: '密码长度至少为6位' });
            return;
        }
        const existingUser = yield (0, db_1.findUserByEmail)(email);
        if (existingUser) {
            res.status(409).json({ error: '该邮箱已被注册' });
            return;
        }
        const userId = yield (0, db_1.createUser)(email, password, name);
        const token = (0, auth_1.generateToken)(userId);
        res.status(201).json({
            user: {
                id: userId,
                email,
                name: name || null,
            },
            token,
        });
    }
    catch (error) {
        console.error('注册错误:', error);
        res.status(500).json({ error: '服务器内部错误' });
    }
});
exports.register = register;
