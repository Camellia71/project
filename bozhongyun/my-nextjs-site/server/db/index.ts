import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs";
import path from "path";

interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
  created_at: string;
}

interface SMSHistoryItem {
  id: number;
  user_id: number;
  phone: string;
  message: string;
  status: string;
  created_at: string;
}

interface SMSTemplate {
  id: number;
  user_id?: number;
  name: string;
  content: string;
  category?: string;
  created_at: string;
}

const dbPath = path.join(__dirname, "..", "database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("数据库连接失败:", err);
  } else {
    console.log("数据库连接成功");
  }
});

export const initDatabase = () => {
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

// 用户相关操作
export const createUser = (
  email: string,
  password: string,
  name?: string,
): Promise<number> => {
  return new Promise((resolve, reject) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.run(
      "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
      [email, hashedPassword, name || null],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      },
    );
  });
};

export const findUserByEmail = (email: string): Promise<User | undefined> => {
  return new Promise((resolve, reject) => {
    db.get<User>("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const findUserById = (
  id: number,
): Promise<Omit<User, "password"> | undefined> => {
  return new Promise((resolve, reject) => {
    db.get<Omit<User, "password">>(
      "SELECT id, email, name, created_at FROM users WHERE id = ?",
      [id],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      },
    );
  });
};

export const verifyPassword = (
  password: string,
  hashedPassword: string,
): boolean => {
  return bcrypt.compareSync(password, hashedPassword);
};

// 短信相关操作
export const createSMSRecord = (
  userId: number,
  phone: string,
  message: string,
): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO sms_history (user_id, phone, message) VALUES (?, ?, ?)",
      [userId, phone, message],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      },
    );
  });
};

export const getSMSHistoryByUserId = (
  userId: number,
): Promise<SMSHistoryItem[]> => {
  return new Promise((resolve, reject) => {
    db.all<SMSHistoryItem>(
      "SELECT * FROM sms_history WHERE user_id = ? ORDER BY created_at DESC",
      [userId],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      },
    );
  });
};

export const getTemplates = (): Promise<SMSTemplate[]> => {
  return new Promise((resolve, reject) => {
    db.all<SMSTemplate>(
      "SELECT * FROM sms_templates ORDER BY created_at DESC",
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      },
    );
  });
};

export default db;
