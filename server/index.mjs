async function changeColor(deviceId, color, credentials) {
  const path = `/v1.0/devices/${deviceId}/commands`;
  const value = { h: color.h, s: color.s * 10, v: color.v * 10 };
  const lampPayload = {
    commands: [
      { code: "switch_led", value: true },
      { code: "colour_data_v2", value: value },
    ],
  };

  const searchParams = new URLSearchParams();
  Object.entries({
    ...credentials,
    method: "POST",
    path: path,
  }).forEach(([key, value]) => searchParams.set(key, value));

  const url =
    "https://tuya-connector.jsfn.run/request?" + searchParams.toString();

  const payload = {
    mode: "cors",
    method: "POST",
    body: JSON.stringify(lampPayload),
  };

  console.log(url, payload);
  const response = await fetch(url, payload);

  if (response.ok) {
    console.log(await response.text());
  }

  return response.ok;
}

export default async function (req, res, next) {
  if (req.url.startsWith("/tap/")) {
    const [deviceId, colorString] = req.url.replace("/tap/", "").split("/");
    const [h, s, v] = colorString.split(",");
    const color = { h, s, v };

    try {
      const { clientid, clientsecret } = req.headers;
      const credentials = {
        clientId: clientid,
        clientSecret: clientsecret,
      };

      res.end(String(await changeColor(deviceId, color, credentials)));
    } catch (error) {
      console.log(error);
      res.writeHead(500).end();
    }
  }

  next();
}
