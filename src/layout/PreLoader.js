const PreLoader = () => {
  return (
    <div className="metaportal_fn_preloader">
      <div className="loading-container">
        <div className="loading">
          <div className="l1">
            <div />
          </div>
          <div className="l2">
            <div />
          </div>
          <div className="l3">
            <div />
          </div>
          <div className="l4">
            <div />
          </div>
        </div>
      </div>
      <style jsx>{`
        .metaportal_fn_preloader {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .loading {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .l1 div,
        .l2 div,
        .l3 div,
        .l4 div {
          width: 10px;
          height: 10px;
          margin: 3px;
          background: #000;
          border-radius: 50%;
          animation: loading 1.2s linear infinite;
        }
        @keyframes loading {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default PreLoader;
