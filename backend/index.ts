import express from "express";
import dotenv from "dotenv";
import { tavily } from "@tavily/core";

dotenv.config();

const app = express();
const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY });
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/perp_ask", async (req, res) => {
  // Step-1 - get query
  const query = req.body.query;

  // Step-2 - make sure user has enough credits to hit endpoint

  // Step-3 - check if we have a cached response for the query, if so return it

  // Step-4 - websearch the sources for the query and get the top 3-5 results

  const webSearchResponse = await tavilyClient.search(query, {
    searchDepth: "advanced",
    max_results: process.env.TAVILY_QUERY_LIMIT || 5,
  });
  const webSearchResults = webSearchResponse.results;

  // Step-5 -  some context engineerign on the prompt + web search results

  // Step-6 - hit the llm and stream back the response to the user

  // Step-7 - also stream back the sources and follow up questions to the user (which we can get from the another parraph in the llm call)
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
