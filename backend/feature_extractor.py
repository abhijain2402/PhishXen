import re
from urllib.parse import urlparse, urljoin

import requests
from bs4 import BeautifulSoup


# ============================================================
# SOCIAL NETWORK DOMAINS
# ============================================================

SOCIAL_DOMAINS = [
    "facebook.com",
    "twitter.com",
    "x.com",
    "instagram.com",
    "linkedin.com",
    "youtube.com",
    "pinterest.com",
    "tiktok.com",
]


# ============================================================
# HTTP SETTINGS
# ============================================================

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 "
        "(KHTML, like Gecko) "
        "Chrome/131.0 Safari/537.36"
    )
}


# ============================================================
# URL NORMALIZATION
# ============================================================

def normalize_url(url: str) -> str:
    """
    Add https:// if the user does not provide a scheme.
    """

    url = url.strip()

    if not url:
        raise ValueError("URL cannot be empty.")

    if not url.startswith(("http://", "https://")):
        url = "https://" + url

    return url


# ============================================================
# DOMAIN CHECK
# ============================================================

def get_root_domain(domain: str) -> str:
    """
    Get the main/root domain.

    Example:
        www.wikipedia.org -> wikipedia.org
        en.wikipedia.org  -> wikipedia.org
        hi.wikipedia.org  -> wikipedia.org
    """

    domain = domain.lower().strip().split(":")[0]

    parts = domain.split(".")

    if len(parts) >= 2:
        return ".".join(parts[-2:])

    return domain


def is_external_domain(
    reference_domain: str,
    page_domain: str
) -> bool:
    """
    Check whether a reference belongs to a different
    root domain.

    Subdomains are treated as self references.
    """

    if not reference_domain:
        return False

    reference_root = get_root_domain(
        reference_domain
    )

    page_root = get_root_domain(
        page_domain
    )

    return reference_root != page_root



# ============================================================
# MAIN FEATURE EXTRACTOR
# ============================================================

def extract_features(url: str):
    """
    Extract the exact 18 features required by the
    PhishXen XGBoost V4 model.
    """

    # ========================================================
    # 1. NORMALIZE URL
    # ========================================================

    url = normalize_url(url)

    parsed = urlparse(url)

    page_domain = parsed.netloc.lower()
    page_domain_only = page_domain.split(":")[0]

    scheme = parsed.scheme.lower()

    if not page_domain_only:
        raise ValueError("Invalid URL or domain.")


    # ========================================================
    # 2. DOWNLOAD WEBPAGE
    # ========================================================

    try:

        response = requests.get(
            url,
            headers=HEADERS,
            timeout=15,
            allow_redirects=True,
            verify=True,
        )

        response.raise_for_status()

    except requests.RequestException as e:

        raise ValueError(
            f"Unable to access webpage: {str(e)}"
        )


    # ========================================================
    # 3. USE FINAL URL AFTER REDIRECTS
    # ========================================================

    final_url = response.url

    final_parsed = urlparse(final_url)

    final_domain = final_parsed.netloc.lower()
    final_domain_only = final_domain.split(":")[0]

    final_scheme = final_parsed.scheme.lower()

    if not final_domain_only:
        raise ValueError("Invalid final URL after redirect.")


    # ========================================================
    # 4. PARSE HTML
    # ========================================================

    html = response.text

    soup = BeautifulSoup(
        html,
        "lxml"
    )


    # ========================================================
    # 5. URL FEATURES
    # ========================================================

    # --------------------------------------------------------
    # DomainLength
    # --------------------------------------------------------

    domain_length = len(
        final_domain_only
    )


    # --------------------------------------------------------
    # NoOfDegitsInURL
    # --------------------------------------------------------

    no_of_digits = sum(
        character.isdigit()
        for character in final_url
    )


    # --------------------------------------------------------
    # DegitRatioInURL
    # --------------------------------------------------------

    digit_ratio = (
        no_of_digits / len(final_url)
        if len(final_url) > 0
        else 0.0
    )


    # --------------------------------------------------------
    # NoOfOtherSpecialCharsInURL
    #
    # Count non-alphanumeric characters.
    # --------------------------------------------------------

    special_char_pattern = r"[^a-zA-Z0-9]"

    no_of_special_chars = len(
        re.findall(
            special_char_pattern,
            final_url
        )
    )


    # --------------------------------------------------------
    # SpacialCharRatioInURL
    # --------------------------------------------------------

    special_char_ratio = (
        no_of_special_chars / len(final_url)
        if len(final_url) > 0
        else 0.0
    )


    # --------------------------------------------------------
    # IsHTTPS
    # --------------------------------------------------------

    is_https = int(
        final_scheme == "https"
    )


    # ========================================================
    # 6. HTML FEATURES
    # ========================================================

    # --------------------------------------------------------
    # LineOfCode
    # --------------------------------------------------------

    line_of_code = len(
        html.splitlines()
    )


    # --------------------------------------------------------
    # HasFavicon
    # --------------------------------------------------------

    favicon = soup.find(
        "link",
        attrs={
            "rel": lambda value:
                value
                and "icon" in str(value).lower()
        }
    )

    has_favicon = int(
        favicon is not None
    )


    # --------------------------------------------------------
    # IsResponsive
    # --------------------------------------------------------

    viewport = soup.find(
        "meta",
        attrs={
            "name": re.compile(
                r"^viewport$",
                re.IGNORECASE
            )
        }
    )

    is_responsive = int(
        viewport is not None
    )


    # --------------------------------------------------------
    # HasDescription
    # --------------------------------------------------------

    description = soup.find(
        "meta",
        attrs={
            "name": re.compile(
                r"^description$",
                re.IGNORECASE
            )
        }
    )

    has_description = int(
        description is not None
    )


    # ========================================================
    # 7. SOCIAL NETWORK
    # ========================================================

    has_social_net = 0

    for tag in soup.find_all(
        "a",
        href=True
    ):

        href = tag.get(
            "href",
            ""
        ).lower()

        for social_domain in SOCIAL_DOMAINS:

            if social_domain in href:

                has_social_net = 1

                break

        if has_social_net:
            break


    # ========================================================
    # 8. SUBMIT BUTTON
    # ========================================================

    has_submit_button = 0


    # --------------------------------------------------------
    # input type="submit"
    # --------------------------------------------------------

    submit_input = soup.find(
        "input",
        attrs={
            "type": re.compile(
                r"^submit$",
                re.IGNORECASE
            )
        }
    )


    # --------------------------------------------------------
    # button type="submit"
    # --------------------------------------------------------

    submit_button = soup.find(
        "button",
        attrs={
            "type": re.compile(
                r"^submit$",
                re.IGNORECASE
            )
        }
    )


    # --------------------------------------------------------
    # Login / Sign in / Verify style buttons
    # --------------------------------------------------------

    submit_text_button = None

    for button in soup.find_all("button"):

        button_text = button.get_text(
            " ",
            strip=True
        ).lower()

        if button_text in (
            "submit",
            "login",
            "log in",
            "sign in",
            "continue",
            "verify",
        ):

            submit_text_button = button

            break


    if (
        submit_input is not None
        or submit_button is not None
        or submit_text_button is not None
    ):

        has_submit_button = 1


    # ========================================================
    # 9. HIDDEN FIELDS
    # ========================================================

    hidden_inputs = soup.find_all(
        "input",
        attrs={
            "type": re.compile(
                r"^hidden$",
                re.IGNORECASE
            )
        }
    )

    has_hidden_fields = int(
        len(hidden_inputs) > 0
    )


    # ========================================================
    # 10. COPYRIGHT
    # ========================================================

    page_text = soup.get_text(
        " ",
        strip=True
    ).lower()

    has_copyright_info = int(
        "copyright" in page_text
        or "©" in html
    )


    # ========================================================
    # 11. CSS
    # ========================================================

    external_css = soup.find_all(
        "link",
        attrs={
            "rel": lambda value:
                value
                and "stylesheet"
                in str(value).lower()
        }
    )

    inline_css = soup.find_all(
        "style"
    )

    no_of_css = (
        len(external_css)
        + len(inline_css)
    )


    # ========================================================
    # 12. JAVASCRIPT
    # ========================================================

    no_of_js = len(
        soup.find_all("script")
    )


    # ========================================================
    # 13. SELF / EXTERNAL REFERENCES
    #
    # IMPORTANT:
    #
    # Only <a href=""> hyperlinks are counted here.
    #
    # CSS, JavaScript, images and forms are NOT counted as
    # self/external references.
    # ========================================================

    no_of_self_ref = 0
    no_of_external_ref = 0


    # Only hyperlinks
    reference_tags = soup.find_all(
        "a",
        href=True
    )


    for tag in reference_tags:

        reference = tag.get(
            "href",
            ""
        ).strip()


        # ----------------------------------------------------
        # Ignore empty references
        # ----------------------------------------------------

        if not reference:
            continue


        # ----------------------------------------------------
        # Ignore fragment-only links
        # ----------------------------------------------------

        if reference.startswith("#"):
            continue


        # ----------------------------------------------------
        # Ignore special protocols
        # ----------------------------------------------------

        if reference.lower().startswith(
            (
                "javascript:",
                "data:",
                "mailto:",
                "tel:",
            )
        ):

            continue


        # ----------------------------------------------------
        # Convert relative URL to absolute URL
        # ----------------------------------------------------

        absolute_url = urljoin(
            final_url,
            reference
        )


        ref_parsed = urlparse(
            absolute_url
        )


        ref_domain = (
            ref_parsed.netloc
            .lower()
            .split(":")[0]
        )


        # ----------------------------------------------------
        # Relative URL
        # ----------------------------------------------------

        if not ref_domain:

            no_of_self_ref += 1

            continue


        # ----------------------------------------------------
        # Same domain / subdomain
        # ----------------------------------------------------

        if not is_external_domain(
            ref_domain,
            final_domain_only
        ):

            no_of_self_ref += 1


        # ----------------------------------------------------
        # Different domain
        # ----------------------------------------------------

        else:

            no_of_external_ref += 1


    # ========================================================
    # 14. FINAL 18 V4 FEATURES
    # ========================================================

    features = {

        "DomainLength":
            domain_length,

        "NoOfDegitsInURL":
            no_of_digits,

        "DegitRatioInURL":
            digit_ratio,

        "NoOfOtherSpecialCharsInURL":
            no_of_special_chars,

        "SpacialCharRatioInURL":
            special_char_ratio,

        "IsHTTPS":
            is_https,

        "LineOfCode":
            line_of_code,

        "HasFavicon":
            has_favicon,

        "IsResponsive":
            is_responsive,

        "HasDescription":
            has_description,

        "HasSocialNet":
            has_social_net,

        "HasSubmitButton":
            has_submit_button,

        "HasHiddenFields":
            has_hidden_fields,

        "HasCopyrightInfo":
            has_copyright_info,

        "NoOfCSS":
            no_of_css,

        "NoOfJS":
            no_of_js,

        "NoOfSelfRef":
            no_of_self_ref,

        "NoOfExternalRef":
            no_of_external_ref,
    }


    # ========================================================
    # 15. SAFETY CHECK
    # ========================================================

    if len(features) != 18:

        raise ValueError(
            f"Expected 18 features, got {len(features)}"
        )


    return features


# ============================================================
# LOCAL TEST
# ============================================================

if __name__ == "__main__":

    test_url = "https://www.wikipedia.org"


    print()

    print("=" * 60)

    print(
        "PhishXen Feature Extractor Test"
    )

    print("=" * 60)


    print()

    print(
        "Analyzing:",
        test_url
    )

    print("-" * 60)


    try:

        extracted_features = extract_features(
            test_url
        )


        for name, value in extracted_features.items():

            print(
                f"{name:<35}: {value}"
            )


        print("-" * 60)


        print(
            "Total features:",
            len(extracted_features)
        )


        print("=" * 60)


    except Exception as e:

        print()

        print("ERROR:")

        print(e)

        print("=" * 60)