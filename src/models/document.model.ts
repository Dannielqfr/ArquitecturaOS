import connection from "../../utils/connection";
import { TypeDocumentType } from "../../utils/types";

export async function getDocuments(): Promise<TypeDocumentType[]> {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM documenttypes";
    connection.query(query, (err, results) => {
      if (err) reject(err);
      else resolve(results as Array<TypeDocumentType>);
    });
  });
}
