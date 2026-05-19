import { SlOptions } from "react-icons/sl";
import { IoCloseSharp } from "react-icons/io5";
import type { Job } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface SingleLavoroProps {
  job: Job;
}
const SingleLavoro = function ({ job }: SingleLavoroProps) {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const description = job.description.replace(/<[^>]+>/g, "");
  const descriptionCorta = description.slice(0, 150) + "...";

  return (
    <div className="d-flex border-bottom py-1 " id="list-item-lavoro">
      <div className="d-flex align-items-start">
        <img
          src={job.company_logo_url}
          alt=""
          className="rounded-circle"
          style={{ width: "50px" }}
        />
        <div className="ms-2">
          <h5
            className={hover ? "text-black" : "text-primary"}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => {
              navigate(`/dettaglio-lavoro/${job._id}`);
            }}
          >
            {job.title}
          </h5>
          <p style={{ lineHeight: "1.2" }} className="m-0">
            {descriptionCorta}
          </p>
          <span className="small ">
            <span className="text-secondary">Promosso · </span>
            <span className="text-success">
              {job.candidate_required_location}
            </span>
          </span>
        </div>
      </div>
      <div className="text-black d-flex gap-2 fs-5">
        <a href="#">
          <SlOptions className=" text-black hovered" />
        </a>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            document.getElementById("list-item-lavoro").remove();
          }}
        >
          <IoCloseSharp  className="hovered"/>
        </span>
      </div>
    </div>
  );
};

export default SingleLavoro;
