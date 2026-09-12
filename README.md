# PhishXen — AI-Assisted Phishing URL Detection System

PhishXen is a modern, minimal phishing detection platform powered by an **XGBoost V4** classification model and live webpage DOM signal analysis. It inspects **18 lexical and structural features** to assess whether a given URL is legitimate or a potential phishing threat.

---

## Key Features

- **XGBoost V4 Machine Learning Engine**: Calibrated binary classifier trained on URL and DOM characteristics.
- **18 Extracted Security Signals**:
  - **URL Lexical (6)**: Domain Length, Digits Count, Digit Ratio, Special Characters, Special Character Ratio, HTTPS.
  - **HTML Structure (8)**: Lines of Code, Favicon, Responsive Viewport, Meta Description, Social Network Links, Submit Button, Hidden Fields, Copyright Notice.
  - **Resources & References (4)**: CSS Stylesheets, JavaScript Scripts, Internal References, External References.
- **Strict 60% Decision Boundary**:
  - Probability(Phishing) > 60% $\rightarrow$ `PHISHING` (High Risk)
  - Otherwise $\rightarrow$ `LEGITIMATE` (Low Risk)
- **FastAPI Backend**: Real-time feature extraction and low-latency prediction endpoint (`POST /predict`).
- **Minimal Premium React Frontend**: Clean, off-white, typography-driven SaaS design built with Vite and vanilla CSS.

---

## Project Architecture

```text
PhishXen/
├── backend/
│   ├── __init__.py
│   ├── main.py                  # FastAPI application with CORS and /predict endpoint
│   ├── feature_extractor.py     # Live URL & DOM 18-feature extraction
│   └── test_model.py            # Standalone CLI validation test script
├── frontend/
│   ├── src/
│   │   ├── components/          # Minimal UI components (Scanner, Verdict, Signals, Timeline)
│   │   ├── services/api.js      # API integration client
│   │   ├── App.jsx              # Main dashboard layout
│   │   └── index.css            # Off-white design system
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── feature_names_v4.pkl         # 18 model feature names in exact order
├── xgb_phishing_detector_v4.pkl # Trained XGBoost V4 classifier
├── PhiUSIIL_Phishing_URL_Dataset.csv
├── model.ipynb                  # Training & feature selection notebook
└── LICENSE                      # MIT License
```

---

## Getting Started

### 1. Prerequisites
- **Python 3.10+**
- **Node.js 18+ & npm**

### 2. Backend Setup
```bash
# Clone the repository
git clone https://github.com/abhijain2402/PhishXen.git
cd PhishXen

# Create & activate virtual environment
python -m venv phishxen_env
# On Windows:
.\phishxen_env\Scripts\activate
# On Linux/macOS:
source phishxen_env/bin/activate

# Install required dependencies
pip install fastapi uvicorn xgboost scikit-learn requests beautifulsoup4 lxml joblib numpy pydantic

# Start FastAPI server
uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```
Backend will be live at `http://127.0.0.1:8000`.

### 3. Frontend Setup
```bash
# In a new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
Frontend will be live at `http://localhost:5173`.

---

## API Reference

### `POST /predict`
Analyzes a URL and returns the classification verdict, confidence, risk level, probabilities, and extracted features.

**Request:**
```json
{
  "url": "https://www.wikipedia.org"
}
```

**Response:**
```json
{
  "url": "https://www.wikipedia.org",
  "prediction": "LEGITIMATE",
  "confidence": 88.49,
  "risk": "LOW",
  "probabilities": {
    "phishing": 11.51,
    "legitimate": 88.49
  },
  "features": {
    "DomainLength": 17,
    "NoOfDegitsInURL": 0,
    "DegitRatioInURL": 0.0,
    "NoOfOtherSpecialCharsInURL": 6,
    "SpacialCharRatioInURL": 0.23,
    "IsHTTPS": 1,
    "LineOfCode": 1012,
    "HasFavicon": 1,
    "IsResponsive": 1,
    "HasDescription": 1,
    "HasSocialNet": 0,
    "HasSubmitButton": 1,
    "HasHiddenFields": 1,
    "HasCopyrightInfo": 1,
    "NoOfCSS": 3,
    "NoOfJS": 4,
    "NoOfSelfRef": 358,
    "NoOfExternalRef": 21
  }
}
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
