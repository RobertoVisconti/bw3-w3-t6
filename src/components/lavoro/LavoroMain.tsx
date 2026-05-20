import { Button, Col, Container, Row } from "react-bootstrap";
import SingleLavoro from "./SingleLavoro";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import type { Job } from "../../interfaces/interfaces";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import LavoroPlaceholder from "../placeholders/LavoroPlaceholder";

const LavoroMain = function () {
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const jobsRandom = useMemo(() => {
    return [...jobs].sort(() => Math.random() - 0.5);
  });

  const isLoading = useSelector((state: RootState) => state.jobs.isLoading);

  const [visualizzati, setVisualizzati] = useState(5);
  const [visualizzatiRandom, setVisualizzatiRandom] = useState(5);

  return (
    <Container className="mt-2 mb-5 d-flex flex-column gap-3">
      {/* LAVORI PENSATI PER TE */}
      <Row className="bg-white rounded-3 border">
        <Col xs={12} className="pt-3">
          <h3>Le principali offerte di lavoro</h3>
          <p className=" text-secondary" style={{ lineHeight: "1" }}>
            In base al tuo profilo , alle tue preferenze e ad attivitá come
            candidature , ricerche e salvataggi
          </p>
        </Col>
        <Col>
          <Container className="d-flex justify-content-between">
            <Row className="d-flex">
              <Col>
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <LavoroPlaceholder key={i} />
                    ))
                  : jobs
                      .filter((job: Job) => job.company_logo_url)
                      .slice(0, visualizzati)
                      .map((job: Job) => {
                        return <SingleLavoro job={job} key={job._id} />;
                      })}
              </Col>
            </Row>
          </Container>
          <div className="d-flex justify-content-between">
            <Button
              variant="outline"
              onClick={() => setVisualizzati(visualizzati + 5)}
            >
              Vedi altri
              <IoMdArrowDropdown />
            </Button>
            {visualizzati >= 10 && (
              <Button
                variant="outline"
                onClick={() => {
                  if (visualizzati === 5) return;
                  setVisualizzati(visualizzati - 5);
                }}
              >
                Vedi meno
                <IoMdArrowDropup />
              </Button>
            )}
          </div>
        </Col>

        {/* ALTRI LAVORI RANDOM */}
      </Row>
      <Row className="bg-white rounded-3 border">
        <Col xs={12} className="pt-3">
          <h3>Altre offerte di lavoro</h3>
          <p className=" text-secondary" style={{ lineHeight: "1" }}>
            In base al tuo profilo , alle tue preferenze e ad attivitá come
            candidature , ricerche e salvataggi
          </p>
        </Col>
        <Col>
          <Container className="d-flex justify-content-between">
            <Row className="d-flex">
              <Col>
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <LavoroPlaceholder key={i} />
                    ))
                  : jobsRandom
                      .filter((job) => job.company_logo_url)
                      .slice(0, visualizzatiRandom)
                      .map((job: job) => {
                        return <SingleLavoro job={job} key={job._id} />;
                      })}
              </Col>
            </Row>
          </Container>
          <div className="d-flex justify-content-between">
            <Button
              variant="outline"
              onClick={() => setVisualizzatiRandom(visualizzatiRandom + 5)}
            >
              Vedi altri
              <IoMdArrowDropdown />
            </Button>
            {visualizzatiRandom >= 10 && (
              <Button
                variant="outline"
                onClick={() => {
                  if (visualizzatiRandom === 5) return;
                  setVisualizzatiRandom(visualizzatiRandom - 5);
                }}
              >
                Vedi meno
                <IoMdArrowDropup />
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LavoroMain;
