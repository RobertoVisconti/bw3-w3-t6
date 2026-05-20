import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { Job } from "../interfaces/interfaces";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import type { RootState } from "../redux/store";
import BigCardPlaceholder from "./BigCardPlaceholder";

const DetailsJob = function () {
  const params = useParams();
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const [readMore, setReadMore] = useState(450);

  const detailJob = jobs.find((job: Job) => job._id === params.id);
  if (!detailJob) return <BigCardPlaceholder />;
  const description = detailJob.description
    .replace(/<[^>]+>/g, "")
    .slice(0, readMore);
  const formatDate = (data: string) => {
    return new Date(data).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={10}>
          <div className="job-card">
            <div className="job-card-header">
              <div>
                <h2 className="job-card-title">{detailJob.title}</h2>
                <p className="job-card-company">{detailJob.category}</p>
                <p className="job-card-company">{detailJob.company_name}</p>
                <p>
                  {description}
                  {description.length === 450 ? "..." : ""}
                </p>
                <div>
                  {description.length === 450 && (
                    <Button
                      style={{ fontSize: "0.7em" }}
                      variant="outline-primary"
                      onClick={() => setReadMore(detailJob.description.length)}
                    >
                      Continua a leggere ...
                      <IoMdArrowDropdown className="fs-5 ms-1" />
                    </Button>
                  )}

                  {description.length > 450 && (
                    <Button
                      style={{ fontSize: "0.7em" }}
                      variant="outline-primary"
                      onClick={() => setReadMore(450)}
                    >
                      Nascondi
                      <IoMdArrowDropup className="fs-5 ms-1" />
                    </Button>
                  )}
                </div>
              </div>
              <span className="job-card-badge">{detailJob.job_type}</span>
            </div>

            <hr className="job-card-divider" />

            <div className="job-card-meta">
              <span>📍 {detailJob.candidate_required_location}</span>
              <span>💶 {detailJob.salary}</span>
              <span>💼 {detailJob.experience}</span>
            </div>

            {/* <p className="job-card-description">{detailJob.description}</p> */}

            <div className="job-card-footer">
              <span className="job-card-date">
                {formatDate(detailJob.publication_date)}
              </span>
              <button className="job-card-btn">Candidati</button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailsJob;
