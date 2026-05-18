interface FooterLink {
  label: string;
  url: string;
}

export const FooterLinkProfile = () => {
  const links: FooterLink[] = [
    { label: "Informazioni", url: "#" },
    { label: "Accessibilità", url: "#" },
    { label: "Talent Solution", url: "#" },
    { label: "Linee guida della comunità", url: "#" },
    { label: "Carriera", url: "#" },
    { label: "Soluzioni di marketing", url: "#" },
    { label: "Opzioni per gli annunci pubblicitari", url: "#" },
    { label: "Pubblicità", url: "#" },
    { label: "Sales Solution", url: "#" },
    { label: "Mobile", url: "#" },
    { label: "Piccole imprese", url: "#" },
    { label: "Centro sicurezza", url: "#" },
  ];
  return (
    <div>
      {links.map((link, i) => (
        <a key={i} href={link.url}>
          {link.label}
        </a>
      ))}
    </div>
  );
};
