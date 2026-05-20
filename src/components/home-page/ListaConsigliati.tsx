import { FaArrowRightLong } from "react-icons/fa6";
import SingleConsigliato from "./SingleConsigliato";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import type { Profile } from "../../interfaces/interfaces";

const ListaConsigliati = function () {
  const { allProfiles = [] } = useSelector(
    (state: RootState) => state.profile || {},
  );

  const randomProfiles = useMemo(() => {
    if (!allProfiles || allProfiles.length === 0) return [];
    // eslint-disable-next-line react-hooks/purity
    return [...allProfiles].sort(() => Math.random() - 0.5).slice(0, 3);
  }, [allProfiles]);

  return (
    <div className="bg-white mt-3 rounded-2 pt-2 px-2 border-card-linkedin">
      <div className="py-2">
        <span className="fw-bold">Consigliati per te</span>
      </div>

      {randomProfiles.map((profilo: Profile) => {
        return (
          <div
            key={profilo._id}
            className="user-select-none custom-hover-effect"
            style={{ cursor: "pointer" }}
          >
            <SingleConsigliato profilo={profilo} />
          </div>
        );
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
