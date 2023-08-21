const cors = { mode: "cors", method: "POST" };

async function changeColor(deviceId, color, credentials) {
  const { clientId, clientSecret } = credentials;
  const value = {
    h: Number(color.h),
    s: Number(color.s * 10),
    v: Number(color.v * 10),
  };

  const commands = [
    { code: "switch_led", value: true },
    { code: "colour_data_v2", value },
  ];

  const url = `https://tuya-connector.jsfn.run/commands?deviceId=${deviceId}&clientId=${clientId}&clientSecret=${clientSecret}`;
  const payload = { ...cors, body: JSON.stringify(commands) };

  console.log(url, payload);
  const response = await fetch(url, payload);

  return response.ok;
}

async function resetColor(deviceId, credentials) {
  const { clientId, clientSecret } = credentials;
  const url = `https://tuya-connector.jsfn.run/workMode?deviceId=${deviceId}&clientId=${clientId}&clientSecret=${clientSecret}&value=white`;
  const payload = { ...cors };

  console.log(url, payload);
  const response = await fetch(url, payload);

  return response.ok;
}

function getCredentials(req) {
  const { clientid, clientsecret } = req.headers;
  const credentials = {
    clientId: clientid,
    clientSecret: clientsecret,
  };

  return credentials;
}

function onTap(req, credentials) {
  const [deviceId, colorString] = req.url.replace("/tap/", "").split("/");
  const [h, s, v] = colorString.split(",");
  const color = { h, s, v };

  return changeColor(deviceId, color, credentials);
}

function onReset(req, credentials) {
  const deviceId = req.url.replace("/reset/", "");
  return resetColor(deviceId, credentials);
}

async function handle(req, res, fn) {
  try {
    const credentials = getCredentials(req);
    const result = await fn(req, credentials);
    res.end(String(result));
  } catch (error) {
    console.log(error);
    res.writeHead(500).end();
  }
}

export default async function (req, res, next) {
  if (req.url.startsWith("/tap/")) {
    return handle(req, res, onTap);
  }

  if (req.url.startsWith("/reset/")) {
    return handle(req, res, onReset);
  }

  next();
}
