const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default formatDate;
