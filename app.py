from flask import Flask, request, jsonify
import sqlite3
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:8000", "http://localhost:8000"], supports_credentials=True)

# ---------- DATABASE SETUP ----------
def init_db():
    conn = sqlite3.connect("database.db")
    c = conn.cursor()
    # Create results table if it doesn’t exist
    c.execute('''CREATE TABLE IF NOT EXISTS results (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    result TEXT NOT NULL,
                    timestamp TEXT NOT NULL
                )''')
    conn.commit()
    conn.close()

init_db()

# ---------- ROUTES ----------

@app.route("/")
def home():
    return "Quiz Backend is Running!"

# Save quiz result
@app.route("/submit", methods=["POST"])
def submit():
    data = request.get_json()
    result = data.get("result")

    if not result:
        return jsonify({"error": "No result provided"}), 400

    conn = sqlite3.connect("database.db")
    c = conn.cursor()
    c.execute("INSERT INTO results (result, timestamp) VALUES (?, ?)", 
              (result, datetime.now().strftime("%Y-%m-%d %H:%M:%S")))
    conn.commit()
    conn.close()

    return jsonify({"message": "Result saved!"})

# Get stats (total users)
@app.route("/stats", methods=["GET"])
def stats():
    conn = sqlite3.connect("database.db")
    c = conn.cursor()
    c.execute("SELECT COUNT(*) FROM results")
    total_users = c.fetchone()[0]
    conn.close()

    return jsonify({"total_users": total_users})

# Run Flask
if __name__ == "__main__":
    app.run(debug=True)
