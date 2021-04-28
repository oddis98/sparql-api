import ParsingClient from "sparql-http-client/ParsingClient.js";
import queries from "./queries.js";

export default {
  select: async (req, res) => {
    try {
      const text = req.body.searchText;
      const cat = req.body.category;
      const searchText = text.charAt(0).toUpperCase() + text.slice(1);
      const category = cat.charAt(0).toUpperCase() + cat.slice(1);

      const results = [];
      const endpointUrl = "http://localhost:9999/blazegraph/sparql";

      const client = new ParsingClient({ endpointUrl });

      // Individual game search
      if (category === "Game" && searchText !== "") {
        const stream = await client.query.select(
          queries.selectAllDataGame(searchText, category)
        );
        stream.forEach((row) => {
          const obj = {};
          obj[row.subject.value] = [
            row.platform.value,
            row.comment.value,
            row.date.value,
            row.creator.value,
            row.dbpedia.value,
          ];
          results.push(obj);
        });
      }
      // Individual company search
      else if (category === "Company" && searchText !== "") {
        const stream = await client.query.select(
          queries.selectName(searchText, category)
        );
        stream.forEach((row) => {
          const obj = {};
          obj[row.subject.value] = [row.object.value, row.dbpedia.value];
          results.push(obj);
        });
      }
      // Individual genre search
      else if (category === "Genre" && searchText !== "") {
        const stream = await client.query.select(
          queries.selectGenre(searchText, category)
        );
        stream.forEach((row) => {
          const obj = {};
          obj[row.subject.value] = row.object.value;
          results.push(obj);
        });
      }
      // Select all
      else {
        const stream = await client.query.select(queries.queryAll(category));
        stream.forEach((row) => {
          const obj = {};
          obj[row.subject.value] = row.object.value;
          results.push(obj);
        });
      }

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
