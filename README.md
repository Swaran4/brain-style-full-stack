# Brain Style Quiz - Full Stack Application

A modern, interactive quiz application that helps users discover their brain dominance style (left-brained, right-brained, or whole-brain thinker).

## 🚀 Features

- **Interactive Quiz**: 10 carefully crafted questions to assess thinking preferences
- **Real-time Progress**: Visual progress bar showing quiz completion
- **Brain Style Analysis**: Determines if you're left-brain, right-brain, or whole-brain dominant
- **Statistics Tracking**: Backend stores results and shows total users
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations

## 🛠 Technology Stack

### Frontend
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with Flexbox and responsive design
- **JavaScript (ES6+)**: Modular, well-structured code

### Backend
- **Python Flask**: RESTful API server
- **SQLite**: Lightweight database for storing results
- **Flask-CORS**: Cross-origin resource sharing support

## 📁 Project Structure

```
brain-style-full-stack/
├── app.py              # Flask backend server
├── script.js           # Frontend JavaScript logic
├── styles.css          # CSS styling
├── index.html          # Main HTML page
├── database.db         # SQLite database (auto-generated)
└── README.md          # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Python 3.7+
- pip (Python package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd brain-style-full-stack
   ```

2. **Install Python dependencies**
   ```bash
   pip install flask flask-cors
   ```

3. **Start the backend server**
   ```bash
   python app.py
   ```

4. **Open the frontend**
   - Open `index.html` in your web browser
   - Or serve it using a local server (recommended):
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`

## 🔧 API Endpoints

### GET `/`
Health check endpoint
- **Response**: `{"message": "Quiz Backend is Running!", "status": "healthy"}`

### POST `/submit`
Submit quiz results
- **Body**: `{"result": "Left Brain Dominant"}`
- **Response**: `{"message": "Result saved successfully"}`

### GET `/stats`
Get quiz statistics
- **Response**: `{"total_users": 42, "timestamp": "2024-01-15 10:30:00"}`

## 🧠 Quiz Types

The quiz categorizes users into four types:

1. **Left Brain Dominant**: Logical, analytical, organized
2. **Right Brain Dominant**: Creative, intuitive, artistic
3. **Whole Brain Thinker**: Balanced use of both logic and creativity
4. **Balanced/Mixed Thinker**: Flexible thinking style

## 🎨 Customization

### Adding Questions
Edit the `questions` array in `script.js`:

```javascript
{
    question: "Your question here?",
    answers: [
        { text: "Left-brain answer", type: "left" },
        { text: "Right-brain answer", type: "right" },
        { text: "Whole-brain answer", type: "whole" }
    ]
}
```

### Styling
Modify `styles.css` to change colors, fonts, or layout. The CSS is organized into clear sections for easy customization.

## 🔒 Security & Error Handling

- Input validation on both frontend and backend
- Proper error handling with user-friendly messages
- CORS protection configured
- SQL injection prevention with parameterized queries

## 📱 Browser Compatibility

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## ⚠️ Disclaimer

This quiz is for entertainment and educational purposes only. The results are based on common thinking preferences and should not be considered a scientific assessment. Everyone uses both sides of their brain for different tasks.
