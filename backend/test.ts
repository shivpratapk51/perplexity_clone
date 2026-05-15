import { llm } from "./llm.ts"; // Adjust path as needed

async function run() {
  // ==========================================
  // EXAMPLE 1: STREAMING (stream: true)
  // ==========================================
//   console.log("--- Streaming Example ---");

//   const streamResponse = await llm({
//     query: "Tell me a short joke.",
//     systemPrompt: "You are a helpful assistant.",
//     stream: true, // or omit this, as true is the default
//   });

//   // TypeScript knows `streamResponse` is an AsyncGenerator
//   for await (const chunk of streamResponse) {
//     process.stdout.write(chunk); // Print chunks as they arrive without newlines
//   }
//   console.log("\n"); // Add a final newline when done
// }

  // ==========================================
  // EXAMPLE 2: NON-STREAMING (stream: false)
  // ==========================================
  console.log("--- Non-Streaming Example ---");

  const jsonResponse = await llm({
    query: "What is 2 + 2?",
    systemPrompt: "You are a helpful assistant.",
    stream: false,
  });

  // TypeScript knows `jsonResponse` is a NonStreamingResponse object
  console.log("Full Response:", jsonResponse.choices[0].message.content);
}

run();
