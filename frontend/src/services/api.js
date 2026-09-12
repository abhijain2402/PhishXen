const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

/**
 * Check backend health status quietly
 */
export async function checkBackendHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(`${API_BASE_URL}/health`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return { status: 'offline' };
    }
    return await response.json();
  } catch {
    return { status: 'offline' };
  }
}

/**
 * Basic client-side URL validation
 */
function isValidUrl(string) {
  try {
    const trimmed = string.trim();
    // Allow inputs with or without protocol
    const urlToTest = trimmed.startsWith('http://') || trimmed.startsWith('https://')
      ? trimmed
      : `https://${trimmed}`;
    const parsed = new URL(urlToTest);
    return parsed.hostname.includes('.');
  } catch {
    return false;
  }
}

/**
 * Send URL to FastAPI /predict
 * @param {string} rawUrl - Target URL to analyze
 */
export async function predictUrl(rawUrl) {
  const trimmedUrl = (rawUrl || '').trim();

  // 1. Empty Check
  if (!trimmedUrl) {
    throw new Error('Please enter a URL.');
  }

  // 2. Format / Validity Check
  if (!isValidUrl(trimmedUrl)) {
    throw new Error('Please enter a valid website URL.');
  }

  const controller = new AbortController();
  // 35-second timeout allowing for live webpage HTTP fetch & redirects
  const timeoutId = setTimeout(() => controller.abort(), 35000);

  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: trimmedUrl }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      // Backend returned 4xx or 500
      const detail = typeof data?.detail === 'string' ? data.detail.toLowerCase() : '';

      if (detail.includes('empty')) {
        throw new Error('Please enter a URL.');
      }
      if (detail.includes('invalid') || detail.includes('domain')) {
        throw new Error('Please enter a valid website URL.');
      }
      if (
        detail.includes('unable to access') ||
        detail.includes('timed out') ||
        detail.includes('connection') ||
        detail.includes('ssl') ||
        response.status === 500
      ) {
        throw new Error(
          'Unable to analyze this website. The URL may be unreachable or blocking automated requests.'
        );
      }
      throw new Error('Unable to analyze this website.');
    }

    return data;
  } catch (err) {
    clearTimeout(timeoutId);

    // If already our clean user-facing error message, pass through
    if (
      err.message === 'Please enter a URL.' ||
      err.message === 'Please enter a valid website URL.' ||
      err.message ===
        'Unable to analyze this website. The URL may be unreachable or blocking automated requests.' ||
      err.message === 'Unable to analyze this website.'
    ) {
      throw err;
    }

    if (err.name === 'AbortError') {
      throw new Error(
        'Unable to analyze this website. The URL may be unreachable or blocking automated requests.'
      );
    }

    // Network / backend offline
    if (
      err.message.includes('Failed to fetch') ||
      err.message.includes('NetworkError') ||
      err.message.includes('ECONNREFUSED')
    ) {
      throw new Error('Unable to connect to the PhishXen backend.');
    }

    // Default clean error - never expose raw Python traces
    throw new Error('Unable to analyze this website.');
  }
}
