async function changeColor(deviceId) {
  const path = `/v1.0/devices/${deviceId}/commands`;
  const hue = Math.floor(Math.random() * 1000) % 360;
  const lampPayload = {
    commands: [
      { code: "switch_led", value: true },
      { code: "colour_data_v2", value: { h: hue, s: 1000, v: 1000 } },
    ],
  };
  const url =
    "https://tuya-connector.jsfn.run/request?method=POST&path=" +
    encodeURIComponent(path);

  const payload = {
    mode: "cors",
    body: JSON.stringify(lampPayload),
  };

  console.log(url, payload);
  const response = await fetch(url, payload);

  return response.ok;
}

export default async function (req, res, next) {
  if (req.url.startsWith("/tap/")) {
    const deviceId = req.url.replace("/tap/", "");
    try {
      await changeColor(deviceId);
      res.end("");
    } catch (error) {
      console.log(error);
      res.writeHead(500).end();
    }
  }

  next();
}
