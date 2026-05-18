import { SlOptions } from "react-icons/sl";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { PiPlanetBold } from "react-icons/pi";
import { Button } from "react-bootstrap";
import type { Post } from "../interfaces/interfaces";

// Definiamo le Props del componente
interface SingleArticleProps {
  post: Post;
}

const SingleArticle = ({ post }: SingleArticleProps) => {
  const postDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : "Qualche giorno fa";

  return (
    <div className="bg-white rounded-3 p-3 my-3 border border-light shadow-sm">
      {/* Intestazione del post di LinkedIn */}
      <div className="d-flex justify-content-between align-items-center py-2 border-bottom mb-3">
        <div className="d-flex align-items-center">
          <img
            src={post.user?.image || "https://placecats.com/35/35"}
            alt="img-profile-friend"
            className="rounded-circle"
            style={{ width: "35px", height: "35px", objectFit: "cover" }}
          />
          <p className="m-0 ms-2 small">
            <span className="fw-bold">
              {post.user?.name} {post.user?.surname}
            </span>{" "}
            ha diffuso questo post
          </p>
        </div>
        <div className="text-black d-flex gap-2 fs-5">
          <a href="#options" className="text-black">
            <SlOptions />
          </a>
          <a href="#close" className="text-black">
            <IoCloseSharp />
          </a>
        </div>
      </div>

      {/* Info Autore dell'articolo */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2 border-0">
          <img
            src={post.user?.image || "https://placecats.com/60/60"}
            alt="avatar autore"
            className="rounded-circle"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          <div className="d-flex flex-column">
            <span className="fw-bold">
              {post.user?.name} {post.user?.surname}
            </span>
            <span className="text-secondary small">
              {post.user?.title || "Professionista su LinkedIn"}
            </span>
            <span className="text-secondary small d-flex align-items-center gap-1">
              <span>{postDate}</span>
              <span className="text-black d-flex align-items-center">
                · <PiPlanetBold className="ms-1" />
              </span>
            </span>
          </div>
        </div>
        <div>
          <Button
            variant="outline-primary"
            className="rounded-5 btn-sm fw-bold"
          >
            <IoMdAdd className="me-1" /> Segui
          </Button>
        </div>
      </div>

      {/* Contenuto del Post (Il Testo) */}
      <div className="post-content">
        <p
          className="text-dark"
          style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          {post.text}
        </p>

        {post.image && (
          <img
            src={post.image}
            alt="Post media attachment"
            className="w-100 rounded-3 mt-2"
          />
        )}
      </div>
    </div>
  );
};

export default SingleArticle;
