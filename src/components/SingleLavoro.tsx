import { SlOptions } from "react-icons/sl";
import { IoCloseSharp } from "react-icons/io5";
import type { Job } from "../interfaces/interfaces";

interface SingleLavoroProps {
  job: Job;
}
const SingleLavoro = function ({ job }: SingleLavoroProps) {
  const description = job.description.replace(/<[^>]+>/g, "");
  const descriptionCorta = description.slice(0, 150) + "...";

  return (
    <div className="d-flex border-bottom py-1 ">
      <div className="d-flex align-items-start">
        <img src={job.company_logo_url} alt="" className="rounded-circle" style={{width:"50px"}} />
        <div className="ms-2">
          <h5 className="text-primary">{job.title}</h5>
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
          <SlOptions className="text-black" />
        </a>
        <a href="#">
          <IoCloseSharp className="text-black" />
        </a>
      </div>
    </div>
  );
};

export default SingleLavoro;
