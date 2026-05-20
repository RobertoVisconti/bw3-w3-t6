import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
interface ButtonLinkedinProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  to: string
}

const ButtonLinkedin: React.FC<ButtonLinkedinProps> = ({
  text,
  className,
  style,
  to,
  ...props
}: ButtonLinkedinProps) => {
  return (
    <Link to={to} className="">
      <Button
        className={` btn  rounded-pill w-100 mt-2 mb-2 fw-bold border-2 ${className} `}
        style={{ ...style }}
        {...props}
      >
        {text}
      </Button>
    </Link>
  )
}
export default ButtonLinkedin
