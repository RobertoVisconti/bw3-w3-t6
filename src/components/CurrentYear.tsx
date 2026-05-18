export const CurrentYear = () => {
  const currentYear: number = new Date().getFullYear();
  return <span>Linkedin Corporation &copy; {currentYear}</span>;
};
