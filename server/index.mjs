async function changeColor(deviceId, color, credentials) {
  const path = `/v1.0/devices/${deviceId}/commands`;
  // const hue = Math.floor(Math.random() * 1000) % 360;
  // : { h: hue, s: 1000, v: 1000 };
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
    path: encodeURIComponent(path),
  }).forEach(([key, value]) => searchParams.set(key, value));

  const url = new URL(
    {
      pathname: "/request",
      searchParams,
    },
    "https://tuya-connector.jsfn.run"
  );

  const payload = {
    mode: "cors",
    method: "POST",
    body: JSON.stringify(lampPayload),
  };

  console.log(url, payload);
  const response = await fetch(url, payload);

  return response.ok;
}

export default async function (req, res, next) {
  if (req.url.startsWith("/tap/")) {
    const [deviceId, colorString] = req.url.replace("/tap/", "");
    const [h, s, v] = colorString.split(",");
    const color = { h, s, v };

    try {
      const { clientId, clientSecret } = req.headers;
      res.end(await changeColor(deviceId, color, { clientId, clientSecret }));
    } catch (error) {
      console.log(error);
      res.writeHead(500).end();
    }
  }

  next();
}
