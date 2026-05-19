import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const ButtonLinkedin = ({ text }: { text: string }) => {
  return (
    <Link to={"/profilo"} className="w-100">
      <Button className="text-primary bg-transparent rounded-pill w-100 mt-2 mb-4 fw-bold border-2">
        {text}
      </Button>
    </Link>
  );
};
export default ButtonLinkedin;
