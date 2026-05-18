import Dropdown from "react-bootstrap/Dropdown"
import DropDownTu from "./DropdownTu"
import { DropdownButton } from "react-bootstrap"

function LinkedinDropdown() {
  return (
    <DropdownButton
      as="div"
      align="end"
      title="Tu"
      id="drop-down-basic-button"
      className=" text-decoration-none fw-light text-secondary m-0 p-0 border-0"
    >
      <Dropdown.Item eventKey="1">
        <DropDownTu />
      </Dropdown.Item>
    </DropdownButton>
  )
}

export default LinkedinDropdown
