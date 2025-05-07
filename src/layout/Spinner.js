const Spinner = () => {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <style jsx>{`
          .spinner-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            max-width: 100%;
            max-height: 100%;
          }
          .spinner {
            border: 4px solid rgba(255, 255, 0, 1);
            border-left-color: #000;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
            position: relative;
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  };
  
  export default Spinner;
  