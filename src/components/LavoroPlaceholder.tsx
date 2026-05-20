const LavoroPlaceholder = function () {
  return (
    <div className="d-flex border-bottom py-1 align-items-start justify-content-between">
      <div className="d-flex align-items-start gap-2">
        <div className="skeleton rounded-circle" style={{ width: 50, height: 50, flexShrink: 0 }} />
        <div className="d-flex flex-column gap-2 pt-1" style={{ flex: 1 }}>
          <div className="skeleton" style={{ height: 16, width: "55%" }} />
          <div className="skeleton" style={{ height: 12, width: "90%" }} />
          <div className="skeleton" style={{ height: 12, width: "75%" }} />
          <div className="skeleton" style={{ height: 11, width: "40%" }} />
        </div>
      </div>
      <div className="d-flex gap-2 pt-1">
        <div className="skeleton" style={{ width: 18, height: 18 }} />
        <div className="skeleton" style={{ width: 18, height: 18 }} />
      </div>
    </div>
  );
};

export default LavoroPlaceholder;