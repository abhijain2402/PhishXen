from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
import joblib
import numpy as np
from pathlib import Path

from .feature_extractor import extract_features


# ============================================================
# PHISHXEN API
# ============================================================

app = FastAPI(
    title="PhishXen API",
    description="Phishing URL Detection API using XGBoost V4",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# MODEL PATH
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = BASE_DIR / "xgb_phishing_detector_v4.pkl"


# ============================================================
# LOAD MODEL
# ============================================================

try:
    model = joblib.load(MODEL_PATH)

except Exception as e:
    raise RuntimeError(
        f"Failed to load XGBoost model: {e}"
    )


# ============================================================
# V4 FEATURE ORDER
# ============================================================

FEATURE_NAMES = [
    "DomainLength",
    "NoOfDegitsInURL",
    "DegitRatioInURL",
    "NoOfOtherSpecialCharsInURL",
    "SpacialCharRatioInURL",
    "IsHTTPS",
    "LineOfCode",
    "HasFavicon",
    "IsResponsive",
    "HasDescription",
    "HasSocialNet",
    "HasSubmitButton",
    "HasHiddenFields",
    "HasCopyrightInfo",
    "NoOfCSS",
    "NoOfJS",
    "NoOfSelfRef",
    "NoOfExternalRef",
]


# ============================================================
# REQUEST MODEL
# ============================================================

class URLRequest(BaseModel):

    url: str


# ============================================================
# HOME ENDPOINT
# ============================================================

@app.get("/")
def home():

    return {
        "message": "PhishXen API is running!",
        "model": "XGBoost V4",
        "features": 18,
        "status": "online"
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "model_loaded": True,
        "model_file": MODEL_PATH.name
    }


# ============================================================
# PREDICTION ENDPOINT
# ============================================================

@app.post("/predict")
def predict(data: URLRequest):

    try:

        # ----------------------------------------------------
        # 1. Validate URL
        # ----------------------------------------------------

        url = data.url.strip()

        if not url:

            raise HTTPException(
                status_code=400,
                detail="URL cannot be empty."
            )


        # ----------------------------------------------------
        # 2. Extract features
        # ----------------------------------------------------

        features = extract_features(url)


        # ----------------------------------------------------
        # 3. Check all 18 features exist
        # ----------------------------------------------------

        missing_features = [
            feature
            for feature in FEATURE_NAMES
            if feature not in features
        ]

        if missing_features:

            raise ValueError(
                f"Missing features: {missing_features}"
            )


        # ----------------------------------------------------
        # 4. Create feature vector
        # ----------------------------------------------------

        feature_vector = np.array(
            [[
                features[feature]
                for feature in FEATURE_NAMES
            ]],
            dtype=float
        )


        # ----------------------------------------------------
        # 5. Check feature count
        # ----------------------------------------------------

        if feature_vector.shape[1] != 18:

            raise ValueError(
                f"Expected 18 features, "
                f"got {feature_vector.shape[1]}"
            )


        # ----------------------------------------------------
        # 6. Get model probabilities
        # ----------------------------------------------------

        probabilities = model.predict_proba(
            feature_vector
        )[0]


        # ----------------------------------------------------
        # IMPORTANT MODEL LABEL MAPPING
        #
        # V4 model:
        #
        # 0 = PHISHING
        # 1 = LEGITIMATE
        # ----------------------------------------------------

        phishing_probability = float(
            probabilities[0]
        )

        legitimate_probability = float(
            probabilities[1]
        )


        # ----------------------------------------------------
        # 7. Final prediction
        #
        # Same V4 threshold logic:
        #
        # phishing probability > 60%
        #       -> PHISHING
        #
        # otherwise
        #       -> LEGITIMATE
        # ----------------------------------------------------

        if phishing_probability > 0.60:

            prediction = "PHISHING"

            risk = "HIGH"

            confidence = (
                phishing_probability * 100
            )

        else:

            prediction = "LEGITIMATE"

            risk = "LOW"

            confidence = (
                legitimate_probability * 100
            )


        # ----------------------------------------------------
        # 8. Return result
        # ----------------------------------------------------

        return {

            "url": url,

            "prediction": prediction,

            "confidence": round(
                confidence,
                2
            ),

            "risk": risk,

            "probabilities": {

                "phishing": round(
                    phishing_probability * 100,
                    2
                ),

                "legitimate": round(
                    legitimate_probability * 100,
                    2
                )
            },

            "features": features
        }


    # --------------------------------------------------------
    # HTTP errors
    # --------------------------------------------------------

    except HTTPException:

        raise


    # --------------------------------------------------------
    # Other errors
    # --------------------------------------------------------

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )