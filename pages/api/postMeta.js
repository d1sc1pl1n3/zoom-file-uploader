export default async function handler(req, res) {
  const url = "https://mockapi.com";
  const meta = JSON.parse(req.body);
  const results = await fetch(url);
  res.status(200).json(results);
}

// TODO: what should we do here?
// Do we want to post something to a Mock API?
// And log that mock response?
// Should we just log the payload we will send to the mock API?
