"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplates = exports.getSMSHistoryByUserId = exports.createSMSRecord = exports.verifyPassword = exports.findUserById = exports.findUserByEmail = exports.createUser = exports.initDatabase = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const path_1 = __importDefault(require("path"));
const dbPath = path_1.default.join(__dirname, "..", "database.sqlite");
const db = new sqlite3_1.default.Database(dbPath, (err) => {
    if (err) {
        console.error("数据库连接失败:", err);
    }
    else {
        console.log("数据库连接成功");
    }
});
const initDatabase = () => {
    db.serialize(() => {
        // 创建用户表
        db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
        // 创建短信历史记录表
        db.run(`
      CREATE TABLE IF NOT EXISTS sms_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        phone TEXT NOT NULL,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'sent',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
        // 创建短信模板表
        db.run(`
      CREATE TABLE IF NOT EXISTS sms_templates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        name TEXT NOT NULL,
        content TEXT NOT NULL,
        category TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
        // 插入默认模板
        const defaultTemplates = [
            {
                name: "验证码",
                content: "您的验证码是：{code}，请在5分钟内使用。",
                category: "验证码",
            },
            { name: "营销", content: "尊敬的客户，感谢您的支持！", category: "营销" },
            {
                name: "通知",
                content: "您好，您的订单已发货，请注意查收。",
                category: "通知",
            },
        ];
        const stmt = db.prepare(`
      INSERT OR IGNORE INTO sms_templates (name, content, category)
      VALUES (?, ?, ?)
    `);
        defaultTemplates.forEach((t) => {
            stmt.run(t.name, t.content, t.category);
        });
        stmt.finalize();
    });
};
exports.initDatabase = initDatabase;
// 用户相关操作
const createUser = (email, password, name) => {
    return new Promise((resolve, reject) => {
        const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
        db.run("INSERT INTO users (email, password, name) VALUES (?, ?, ?)", [email, hashedPassword, name || null], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.lastID);
        });
    });
};
exports.createUser = createUser;
const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
            if (err)
                reject(err);
            else
                resolve(row);
        });
    });
};
exports.findUserByEmail = findUserByEmail;
const findUserById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT id, email, name, created_at FROM users WHERE id = ?", [id], (err, row) => {
            if (err)
                reject(err);
            else
                resolve(row);
        });
    });
};
exports.findUserById = findUserById;
const verifyPassword = (password, hashedPassword) => {
    return bcryptjs_1.default.compareSync(password, hashedPassword);
};
exports.verifyPassword = verifyPassword;
// 短信相关操作
const createSMSRecord = (userId, phone, message) => {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO sms_history (user_id, phone, message) VALUES (?, ?, ?)", [userId, phone, message], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.lastID);
        });
    });
};
exports.createSMSRecord = createSMSRecord;
const getSMSHistoryByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM sms_history WHERE user_id = ? ORDER BY created_at DESC", [userId], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
};
exports.getSMSHistoryByUserId = getSMSHistoryByUserId;
const getTemplates = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM sms_templates ORDER BY created_at DESC", (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
};
exports.getTemplates = getTemplates;
exports.default = db;
