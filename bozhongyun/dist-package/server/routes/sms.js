"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const smsController_1 = require("../controllers/smsController");
const router = express_1.default.Router();
router.post('/send', smsController_1.sendSMS);
router.get('/history', smsController_1.getSMSHistory);
router.get('/templates', smsController_1.getTemplatesHandler);
exports.default = router;
