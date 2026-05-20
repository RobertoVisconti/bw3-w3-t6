import { SET_FOOTER_LINKS } from "../actions/footerActions";

export interface FooterLinkProps {
  label: string;
  url: string;
  isDropdown?: boolean;
  isDropdownDue?: boolean;
}

export interface DropDownProps {
  label: string;
  url: string;
}

export interface AziendeDropdownProps extends DropDownProps {
  desc?: string;
  hasIcon?: boolean;
}

interface FooterAction {
  type: string;
  payload?: FooterLinkProps[];
}

interface FooterState {
  links: FooterLinkProps[];
  dropDownPrivacy: DropDownProps[];
  aziendeDropdown: AziendeDropdownProps[];
}

const initialState: FooterState = {
  links: [
    { label: "Informazioni", url: "#" },
    { label: "Accessibilità", url: "#" },
    { label: "Centro assistenza", url: "#" },
    { label: "Privacy e condizioni", url: "#", isDropdown: true },
    { label: "Opzioni per gli annunci pubblicitari", url: "#" },
    { label: "Pubblicità", url: "#" },
    { label: "Servizi alle aziende", url: "#", isDropdownDue: true },
    { label: "Scarica l'app Linkedin", url: "#" },
    { label: "Altro", url: "#" },
  ],
  dropDownPrivacy: [
    { label: "Informativa sulla privacy", url: "#" },
    { label: "Contratto di licenza", url: "#" },
    { label: "Termini e condizioni delle pagine", url: "#" },
    { label: "Informativa sui cookie", url: "#" },
    { label: "Informativa sul copyright", url: "#" },
  ],
  aziendeDropdown: [
    { label: "Assumi su Linkedin", url: "#", desc: "Trova, attrai e assumi" },
    {
      label: "Vendi con Linkedin",
      url: "#",
      desc: "Sblocca nuove opportunità di vendita",
    },
    {
      label: "Inizia con il premium",
      url: "#",
      desc: "Amplia e sfrutta la tua rete",
    },
    {
      label: "Impara con Linkedin",
      url: "#",
      desc: "Corsi per formare i tuoi dipendenti",
    },
    {
      label: "Admin Center",
      url: "#",
      desc: "Gestisci i dettagli di fatturazione e account",
    },
    { label: "Crea una pagina aziendale", url: "#", desc: "", hasIcon: true },
  ],
};

export const footerReducer = (
  state = initialState,
  action: FooterAction,
): FooterState => {
  switch (action.type) {
    case SET_FOOTER_LINKS:
      return {
        ...state,
        links: action.payload || [],
      };
    default:
      return state;
  }
};
