const BigCardPlaceholder = function () {
  return (
    <div className="big-skeleton-card">
      <div className="sk" style={{ height: "220px", borderRadius: 0 }} />
      <div className="big-skeleton-body">
        <div style={{ display: "flex", gap: 8 }}>
          <div
            className="sk"
            style={{ height: 22, width: 80, borderRadius: 100 }}
          />
          <div
            className="sk"
            style={{ height: 22, width: 60, borderRadius: 100 }}
          />
        </div>
        <div className="sk" style={{ height: 24, width: "85%" }} />
        <div className="sk" style={{ height: 24, width: "60%" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div className="sk" style={{ height: 14, width: "100%" }} />
          <div className="sk" style={{ height: 14, width: "100%" }} />
          <div className="sk" style={{ height: 14, width: "75%" }} />
        </div>
        <hr className="sk-divider" />
        <div className="sk-footer">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              className="sk"
              style={{ width: 34, height: 34, borderRadius: "50%" }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div className="sk" style={{ height: 13, width: 100 }} />
              <div className="sk" style={{ height: 11, width: 70 }} />
            </div>
          </div>
          <div
            className="sk"
            style={{ height: 34, width: 140, borderRadius: 8 }}
          />
        </div>
      </div>
    </div>
  );
};

export default BigCardPlaceholder;
