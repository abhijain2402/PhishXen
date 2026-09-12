import joblib
import numpy as np
from pathlib import Path


# ============================================================
# MODEL PATH
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = BASE_DIR / "xgb_phishing_detector_v4.pkl"


# ============================================================
# LOAD MODEL
# ============================================================

model = joblib.load(MODEL_PATH)


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
# KNOWN V4 TEST DATA
# ============================================================

TEST_CASES = {

    "Wikipedia": {

        "DomainLength": 17,
        "NoOfDegitsInURL": 0,
        "DegitRatioInURL": 0,
        "NoOfOtherSpecialCharsInURL": 6,
        "SpacialCharRatioInURL": 0.230,
        "IsHTTPS": 1,
        "LineOfCode": 968,
        "HasFavicon": 1,
        "IsResponsive": 1,
        "HasDescription": 1,
        "HasSocialNet": 0,
        "HasSubmitButton": 1,
        "HasHiddenFields": 1,
        "HasCopyrightInfo": 0,
        "NoOfCSS": 3,
        "NoOfJS": 4,
        "NoOfSelfRef": 366,
        "NoOfExternalRef": 8,
    },


    "GitHub": {

        "DomainLength": 10,
        "NoOfDegitsInURL": 0,
        "DegitRatioInURL": 0,
        "NoOfOtherSpecialCharsInURL": 5,
        "SpacialCharRatioInURL": 0.263,
        "IsHTTPS": 1,
        "LineOfCode": 4262,
        "HasFavicon": 1,
        "IsResponsive": 1,
        "HasDescription": 1,
        "HasSocialNet": 0,
        "HasSubmitButton": 1,
        "HasHiddenFields": 1,
        "HasCopyrightInfo": 1,
        "NoOfCSS": 58,
        "NoOfJS": 10,
        "NoOfSelfRef": 71,
        "NoOfExternalRef": 9,
    },


    "StackOverflow": {

        "DomainLength": 17,
        "NoOfDegitsInURL": 0,
        "DegitRatioInURL": 0,
        "NoOfOtherSpecialCharsInURL": 5,
        "SpacialCharRatioInURL": 0.142,
        "IsHTTPS": 1,
        "LineOfCode": 3002,
        "HasFavicon": 1,
        "IsResponsive": 1,
        "HasDescription": 1,
        "HasSocialNet": 1,
        "HasSubmitButton": 1,
        "HasHiddenFields": 1,
        "HasCopyrightInfo": 1,
        "NoOfCSS": 14,
        "NoOfJS": 70,
        "NoOfSelfRef": 152,
        "NoOfExternalRef": 71,
    },
}


# ============================================================
# TEST MODEL
# ============================================================

print()
print("=" * 65)
print("PhishXen - XGBoost V4 Model Validation")
print("=" * 65)


for site_name, feature_data in TEST_CASES.items():

    print()
    print("-" * 65)
    print(f"Testing: {site_name}")
    print("-" * 65)


    # --------------------------------------------------------
    # Create feature vector
    # --------------------------------------------------------

    feature_vector = np.array(
        [[
            feature_data[name]
            for name in FEATURE_NAMES
        ]],
        dtype=float
    )


    # --------------------------------------------------------
    # Verify feature count
    # --------------------------------------------------------

    print(
        "Feature count:",
        feature_vector.shape[1]
    )


    # --------------------------------------------------------
    # Model prediction
    # --------------------------------------------------------

    prediction = int(
        model.predict(feature_vector)[0]
    )


    # --------------------------------------------------------
    # Probabilities
    # --------------------------------------------------------

    probabilities = model.predict_proba(
        feature_vector
    )[0]


    phishing_probability = float(
        probabilities[0]
    )

    legitimate_probability = float(
        probabilities[1]
    )


    # --------------------------------------------------------
    # Label mapping
    #
    # 0 = PHISHING
    # 1 = LEGITIMATE
    # --------------------------------------------------------

    if phishing_probability > 0.60:

        result = "PHISHING"

        confidence = (
            phishing_probability * 100
        )

    else:

        result = "LEGITIMATE"

        confidence = (
            legitimate_probability * 100
        )


    # --------------------------------------------------------
    # Print result
    # --------------------------------------------------------

    print(
        "Raw model prediction:",
        prediction
    )

    print(
        f"Phishing probability: "
        f"{phishing_probability * 100:.2f}%"
    )

    print(
        f"Legitimate probability: "
        f"{legitimate_probability * 100:.2f}%"
    )

    print(
        "Final prediction:",
        result
    )

    print(
        f"Confidence: {confidence:.2f}%"
    )


print()
print("=" * 65)
print("Validation completed.")
print("=" * 65)