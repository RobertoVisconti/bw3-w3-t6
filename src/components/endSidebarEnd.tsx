import { Container } from "react-bootstrap"
import { HiDotsHorizontal } from "react-icons/hi"
import ButtonLinkedin from "./ButtonLinkedin"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { useEffect } from "react"
import { getMyProfileAsync } from "../redux/actions/profileActions"

const EndSidebarEnd = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { myProfile } = useSelector((state: RootState) => state.profile)

  useEffect(() => {
    dispatch(getMyProfileAsync())
  }, [dispatch])

  return (
    <div>
      <Container
        fluid
        className="bg-white rounded-3 border border-secondary shadow-sm p-2 pb-0 text-start m-0 my-2"
      >
        <div className="d-flex align-items-center justify-content-end me-1">
          <p className="m-0 p-0 me-1">Annuncio</p>
          <HiDotsHorizontal />
        </div>
        <p className="text-center fw-light">
          {myProfile?.name} unlock your full potential with LinkedIn Premium
        </p>
        <div className="d-flex align-items-center justify-content-center ">
          <img
            src={myProfile?.image}
            alt="foto-profilo"
            className="rounded-circle"
            style={{ width: "20%" }}
          />
          <p className="p-0 m-0 ms-3">
            <b>Premium</b>
          </p>
        </div>
        <p className="text-center fw-light">
          See Who's viewed your profilr in the last 365 days
        </p>
        <div className="d-flex justify-content-center">
          <div className="w-50">
            <ButtonLinkedin text="Try for Free" />
          </div>
        </div>
      </Container>
    </div>
  )
}
export default EndSidebarEnd
