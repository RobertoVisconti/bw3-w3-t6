import { FaArrowRightLong } from "react-icons/fa6";
import SingleConsigliato from "./SingleConsigliato";

const esempio = ["uno", "due", "tre"];

const ListaConsigliati = function () {
  return (
    <div className="bg-white mt-3 border border-black rounded-2 pt-2 px-2">
      <div className="py-2">
        <span className="fw-bold">Consigliati per te</span>
      </div>
      {/* SINGOLA CARD */}
      {esempio.map((consigliato) => {
        return <SingleConsigliato />;
      })}
      <div className="py-2 text-center">
        <a href="#" className="text-decoration-none text-dark">
          <span>Visualizza altro</span>
          <FaArrowRightLong className="ms-2 fs-5" />
        </a>
      </div>
    </div>
  );
};

export default ListaConsigliati;
