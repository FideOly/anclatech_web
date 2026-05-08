// Netlify Function: submit-contact
// Verifica reCAPTCHA v3 con Google y reenvía el mensaje a Formspree

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET || 'YOUR_RECAPTCHA_SECRET_KEY';
const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/YOUR_FORM_ID';

exports.handler = async function(event, context) {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: ''
    };
  }

  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const token = body['g-recaptcha-response'];

    if (!token) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ ok: false, message: 'reCAPTCHA token missing' })
      };
    }

    // Verificar token con Google
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    const params = new URLSearchParams();
    params.append('secret', RECAPTCHA_SECRET);
    params.append('response', token);

    const verifyRes = await fetch(verifyUrl, { method: 'POST', body: params });
    const verifyJson = await verifyRes.json();

    if (!verifyJson.success) {
      return {
        statusCode: 403,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ ok: false, message: 'reCAPTCHA verification failed' })
      };
    }

    // Opcional: comprobar score si es reCAPTCHA v3
    if (typeof verifyJson.score !== 'undefined' && verifyJson.score < 0.4) {
      return {
        statusCode: 403,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ ok: false, message: 'Low reCAPTCHA score' })
      };
    }

    // Preparar payload para Formspree
    const payload = {
      nombre: body.nombre || '',
      email: body.email || '',
      empresa: body.empresa || '',
      asunto: body.asunto || '',
      mensaje: body.mensaje || ''
    };

    // Enviar a Formspree (server-to-server)
    const formspreeRes = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!formspreeRes.ok) {
      const text = await formspreeRes.text();
      return {
        statusCode: 502,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ ok: false, message: 'Formspree error', detail: text })
      };
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ok: true })
    };

  } catch (err) {
    console.error('submit-contact error:', err);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ok: false, message: 'Server error' })
    };
  }
};
