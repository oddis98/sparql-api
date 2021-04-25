import ParsingClient from "sparql-http-client/ParsingClient.js";

export default {
  select: async (req, res) => {
    try {
      const text = req.body.searchText;
      const searchText = text.charAt(0).toUpperCase() + text.slice(1);
      const results = [];
      const endpointUrl = "http://localhost:9999/blazegraph/sparql";
      const query = `
          PREFIX ex: <http://example.org/>
          PREFIX vgo: <http://purl.org/net/VideoGameOntology/>
          SELECT ?subject ?object WHERE {
              ?subject rdf:type ex:${searchText} ;
                  rdfs:comment ?object .
      }`;

      const client = new ParsingClient({ endpointUrl });
      const stream = await client.query.select(query);

      stream.forEach((row) => {
        const obj = {};
        obj[row.subject.value] = row.object.value;
        results.push(obj);
      });

      return res.status(200).json({
        success: true,
        result: results,
      });
    } catch {
      return res.status(500).json({
        success: false,
        message: "Something went wrong :(",
      });
    }
  },
};
