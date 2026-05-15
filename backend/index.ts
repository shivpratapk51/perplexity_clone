import express from "express";
import dotenv from "dotenv";
import { tavily } from "@tavily/core";
import { llm } from "./llm.ts";
import { PROMPT_TEMPLATE, SYSTEM_PROMPT } from "./prompt.ts";

dotenv.config();

const app = express();
const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY });
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/perp_ask", async (req, res) => {
  const query = req.body.query;

  const webSearchResponse = await tavilyClient.search(query, {
    searchDepth: "advanced",
    max_results: process.env.TAVILY_QUERY_LIMIT || 5,
  });
  const webSearchResults = webSearchResponse.results;

  const prompt = PROMPT_TEMPLATE.replace(
    "{{WEB_SEARCH_RESULTS}}",
    JSON.stringify(webSearchResults),
  ).replace("{{USER_QUERY}}", query);

  const llmResponse = await llm({
    query: prompt,
    systemPrompt: SYSTEM_PROMPT,
    stream: true,
    maxTokens: 1000,
    topP: 1,
    temperature: 0.2,
  });

  res.header("Cache-Control", "no-cache");
  res.header("Content-Type", "text/event-stream");

  for await (const chunk of llmResponse) {
    res.write(chunk);
  }

  res.write("\n<sources>\n");
  res.write(
    JSON.stringify(
      webSearchResults.map((result) => ({
        url: result.url,
        title: result.title,
      })),
    ),
  );
  res.write("\n</sources>\n");
  res.end();
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
