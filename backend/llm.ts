import axios from "axios";
import { readFile } from "node:fs/promises";

const invokeUrl = process.env.NVIDIA_INVOKE_URL;
const stream = true;

const headers = {
  Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
  Accept: stream ? "text/event-stream" : "application/json",
};

const payload = {
  model: process.env.NVIDIA_MODEL_NAME,
  messages: [{ role: "user", content: "" }],
  max_tokens: 512,
  temperature: 0.2,
  top_p: 0.7,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
  stream: stream,
};
const response = await axios.post(invokeUrl, payload, {
  headers: headers,
  responseType: stream ? "stream" : "json",
});

// Promise.resolve(
//   axios.post(invokeUrl, payload, {
//     headers: headers,
//   }),
// )

//   .then((response) => {
//     if (stream) {
//       response.data.on("data", (chunk) => {
//         console.log(chunk.toString());
//       });
//     } else {
//       console.log(JSON.stringify(response.data));
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// export const llm = () => {};
