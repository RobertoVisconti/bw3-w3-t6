import { Col, Container, Image, Row } from "react-bootstrap"
import ProfileRightSidebar from "../components/ProfileRightSidebar"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { useEffect } from "react"
import { getExperience } from "../redux/actions/experienceActions"
import MainExperience from "../components/MainExperience"

const Esperienze = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { myProfile } = useSelector((state: RootState) => state.profile)

  useEffect(() => {
    if (myProfile?._id) {
      dispatch(getExperience(myProfile?._id))
    }
  }, [dispatch, myProfile])

  return (
    <Container fluid>
      <Row className="bg-light px-5">
        <Col className="d-flex align-items-center">
          <Image
            src={myProfile?.image}
            roundedCircle
            className="linkedin-avatar  me-3 my-2"
            alt="foto-profilo"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
            }}
          />
          <div>
            <p className="fw-bold p-0 m-0">
              {myProfile?.name} {myProfile?.surname}
            </p>
            <p className="fw-light p-0 m-0" style={{ fontSize: "13px" }}>
              {myProfile?.title}
            </p>
          </div>
        </Col>
      </Row>
      <Row className=" px-5">
        {/* colonna principale */}
        <Col md={9} className="mt-2">
          <MainExperience />
        </Col>

        {/* sidebar destra */}
        <Col md={3} className="mt-2">
          <ProfileRightSidebar />
        </Col>
      </Row>
    </Container>
  )
}
export default Esperienze
