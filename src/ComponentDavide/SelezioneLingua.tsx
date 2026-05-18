import { useState } from "react";
import { Dropdown } from "react-bootstrap";

type LinguaCode = "IT" | "EN" | "FR" | "DE";

interface Lingua {
  code: LinguaCode;
  label: string;
}

export const SelezioneLingua = () => {
  const lingue: Lingua[] = [
    { code: "IT", label: "Italiano" },
    { code: "EN", label: "English" },
    { code: "FR", label: "Français" },
    { code: "DE", label: "Deutsch" },
  ];

  const [ling, setLing] = useState<Lingua>(lingue[0]);

  return (
    <Dropdown
      onSelect={(e) => {
        const scelto = lingue.find((lingua) => lingua.code === e);
        if (scelto) setLing(scelto);
      }}
      className="d-flex align-items-center gap-2 border-0 "
    >
      <Dropdown.Toggle
        id="dropdown-language"
        className="dropdown-allungato text-black d-flex align-items-center gap-2 bg-transparent w-100 border-black"
      >
        <span>{ling.label}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {lingue.map((lingue) => (
          <Dropdown.Item
            key={lingue.code}
            eventKey={lingue.code}
            active={ling.code === lingue.code}
            className="d-flex align-items-center gap-2"
          >
            <span>{lingue.label}</span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
