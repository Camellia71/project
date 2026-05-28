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
exports.getTemplatesHandler = exports.getSMSHistory = exports.sendSMS = void 0;
const db_1 = require("../db");
const TEST_USER_ID = 1;
const sendSMS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone, message } = req.body;
        if (!phone || !message) {
            res.status(400).json({ error: '手机号和短信内容不能为空' });
            return;
        }
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            res.status(400).json({ error: '手机号格式不正确' });
            return;
        }
        const smsId = yield (0, db_1.createSMSRecord)(TEST_USER_ID, phone, message);
        res.status(201).json({
            id: smsId,
            phone,
            message,
            status: 'sent',
            createdAt: new Date().toISOString(),
        });
    }
    catch (error) {
        console.error('发送短信错误:', error);
        res.status(500).json({ error: '服务器内部错误' });
    }
});
exports.sendSMS = sendSMS;
const getSMSHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield (0, db_1.getSMSHistoryByUserId)(TEST_USER_ID);
        res.json(history);
    }
    catch (error) {
        console.error('获取短信历史错误:', error);
        res.status(500).json({ error: '服务器内部错误' });
    }
});
exports.getSMSHistory = getSMSHistory;
const getTemplatesHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const templates = yield (0, db_1.getTemplates)();
        res.json(templates);
    }
    catch (error) {
        console.error('获取模板错误:', error);
        res.status(500).json({ error: '服务器内部错误' });
    }
});
exports.getTemplatesHandler = getTemplatesHandler;
