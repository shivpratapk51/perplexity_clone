import express from 'express'
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.post("/perp_ask", async (req, res) => {
  // get query

  // make sure user has enough credits to hit endpoint

  // check if we have a cached response for the query, if so return it

  // websearch the sources for the query and get the top 3-5 results

  // some context engineerign on the prompt + web search results

  // hit the llm and stream back the response to the user

  // also stream back the sources and follow up questions to the user (which we can get from the another parraph in the llm call)
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});