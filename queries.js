export default {
  queryAll: (category) => {
    const query = `
    PREFIX ex: <http://example.org/>
    PREFIX vgo: <http://purl.org/net/VideoGameOntology/>
    SELECT ?subject ?object WHERE {
        ?subject rdf:type ex:${category} ;
            rdfs:comment ?object ;
            ex:hasName ?name .
      } ORDER BY ?name`;

    return query;
  },

  selectName: (name, category) => {
    const query = `
    PREFIX ex: <http://example.org/>
    PREFIX vgo: <http://purl.org/net/VideoGameOntology/>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    SELECT ?subject ?object ?dbpedia WHERE {
        ?subject rdf:type ex:${category} ;
            rdfs:comment ?object ;
            owl:sameAs ?dbpedia ;
            ex:hasName ?name .
    FILTER (?name="${name}"^^xsd:string)
    } ORDER BY ?name`;

    return query;
  },

  selectGenre: (name, category) => {
    const query = `
    PREFIX ex: <http://example.org/>
    PREFIX vgo: <http://purl.org/net/VideoGameOntology/>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    SELECT ?subject ?object WHERE {
        ?subject rdf:type ex:${category} ;
            rdfs:comment ?object ;
            ex:hasName ?name .
    FILTER (?name="${name}"^^xsd:string)
    } ORDER BY ?name`;

    return query;
  },

  selectAllDataGame: (name, category) => {
    const query = `
      PREFIX ex: <http://example.org/>
      PREFIX vgo: <http://purl.org/net/VideoGameOntology/>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      SELECT ?subject ?comment ?date ?platform ?creator ?dbpedia WHERE {
          ?subject rdf:type ex:${category} ;
              rdfs:comment ?comment ;
              ex:hasPlatform ?platform ;
              ex:released ?date ;
              ex:creator ?creator ;
              owl:sameAs ?dbpedia ;
              ex:hasName ?name .
      FILTER (?name="${name}"^^xsd:string)
      } ORDER BY ?name`;

    return query;
  },
};
