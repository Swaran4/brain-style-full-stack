from flask import Flask, request, jsonify
import sqlite3
from datetime import datetime
from flask_cors import CORS
import logging

# ========== APP CONFIGURATION ==========
app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:8000", "http://localhost:8000"], supports_credentials=True)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Database configuration
DATABASE_PATH = "database.db"

# ========== DATABASE MANAGEMENT ==========
def get_db_connection():
    """Create and return a database connection."""
    try:
        conn = sqlite3.connect(DATABASE_PATH)
        return conn
    except sqlite3.Error as e:
        logger.error(f"Database connection error: {e}")
        raise

def init_db():
    """Initialize the database with required tables."""
    try:
        conn = get_db_connection()
        c = conn.cursor()
        
        # Create results table if it doesn't exist
        c.execute('''CREATE TABLE IF NOT EXISTS results (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        result TEXT NOT NULL,
                        timestamp TEXT NOT NULL
                    )''')
        
        conn.commit()
        logger.info("Database initialized successfully")
        
    except sqlite3.Error as e:
        logger.error(f"Database initialization error: {e}")
        raise
    finally:
        if conn:
            conn.close()

def save_result_to_db(result):
    """Save a quiz result to the database."""
    try:
        conn = get_db_connection()
        c = conn.cursor()
        
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        c.execute("INSERT INTO results (result, timestamp) VALUES (?, ?)", (result, timestamp))
        
        conn.commit()
        logger.info(f"Result saved: {result}")
        
    except sqlite3.Error as e:
        logger.error(f"Error saving result: {e}")
        raise
    finally:
        if conn:
            conn.close()

def get_total_users():
    """Get the total number of users who took the quiz."""
    try:
        conn = get_db_connection()
        c = conn.cursor()
        
        c.execute("SELECT COUNT(*) FROM results")
        total_users = c.fetchone()[0]
        
        return total_users
        
    except sqlite3.Error as e:
        logger.error(f"Error fetching stats: {e}")
        raise
    finally:
        if conn:
            conn.close()

# ========== ROUTE HANDLERS ==========
@app.route("/")
def home():
    """Health check endpoint."""
    return jsonify({"message": "Quiz Backend is Running!", "status": "healthy"})

@app.route("/submit", methods=["POST"])
def submit():
    """Submit a quiz result."""
    try:
        # Validate request
        if not request.is_json:
            return jsonify({"error": "Content-Type must be application/json"}), 400
        
        data = request.get_json()
        result = data.get("result")

        # Validate input
        if not result:
            return jsonify({"error": "No result provided"}), 400
        
        if not isinstance(result, str):
            return jsonify({"error": "Result must be a string"}), 400

        # Save to database
        save_result_to_db(result)
        
        return jsonify({"message": "Result saved successfully"})

    except sqlite3.Error as e:
        logger.error(f"Database error in submit: {e}")
        return jsonify({"error": "Database error"}), 500
    except Exception as e:
        logger.error(f"Unexpected error in submit: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route("/stats", methods=["GET"])
def stats():
    """Get quiz statistics."""
    try:
        total_users = get_total_users()
        
        return jsonify({
            "total_users": total_users,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })

    except sqlite3.Error as e:
        logger.error(f"Database error in stats: {e}")
        return jsonify({"error": "Database error"}), 500
    except Exception as e:
        logger.error(f"Unexpected error in stats: {e}")
        return jsonify({"error": "Internal server error"}), 500

# ========== ERROR HANDLERS ==========
@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors."""
    return jsonify({"error": "Internal server error"}), 500

# ========== APPLICATION STARTUP ==========
if __name__ == "__main__":
    try:
        init_db()
        logger.info("Starting Flask application...")
        app.run(debug=True, host="127.0.0.1", port=5000)
    except Exception as e:
        logger.error(f"Failed to start application: {e}")
