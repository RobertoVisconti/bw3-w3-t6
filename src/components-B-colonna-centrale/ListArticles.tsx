import { Col } from "react-bootstrap";
import SingleArticle from "./SingleArticle";

const Articoli = ["uno", "due", "tre"];

const ListArticle = function () {
  return (
    <Col className="my-3 rounded-2 p-0">
      <div>
        {Articoli.map((articolo) => {
          return <SingleArticle />;
        })}
      </div>
    </Col>
  );
};

export default ListArticle;
