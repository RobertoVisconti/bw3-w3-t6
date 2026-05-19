interface LinkFormat {
  icon: React.ReactNode;
  label: string;
  url: string;
}
export const ReteSidebar = () => {
  const links: LinkFormat[] = [
    {
      icon: <i className="fas fa-user-friends"></i>,
      label: "Collegamenti",
      url: "#",
    },
    {
      icon: <i className="fas fa-user-plus"></i>,
      label: "Persone che segui e follower",
      url: "#",
    },
    {
      icon: <i className="fas fa-users"></i>,
      label: "Gruppi",
      url: "#",
    },
    {
      icon: <i className="fas fa-calendar-alt"></i>,
      label: "Eventi",
      url: "#",
    },
    {
      icon: <i className="fas fa-building"></i>,
      label: "Pagine",
      url: "#",
    },
    {
      icon: <i className="fas fa-newspaper"></i>,
      label: "Newsletter",
      url: "#",
    },
  ];

  return (
    <section>
      <article>
        <h6>Gestsci la tua rete</h6>
        <hr />
        <div className="d-flex flex-column gap-3 ">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              className="text-decoration-none text-secondary"
            >
              <span>{link.icon}</span> <span>{link.label}</span>
            </a>
          ))}
        </div>
      </article>
      <article></article>
    </section>
  );
};
