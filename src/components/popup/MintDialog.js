import { Loader2 } from "lucide-react";
import React, { Fragment } from "react";
import useClickOutside from "../../useClickOutside";

const MintStatusDialog = ({ status, onClose }) => {
  let domNode = useClickOutside(() => onClose());

  return (
    <div className="dialog-overlay">
      <div className="dialog-content" ref={domNode}>
        <div className="dialog-header">
          <h2>Minting</h2>
          <button className="dialog-close" onClick={onClose}>×</button>
        </div>
        <div className="dialog-body">
          <p>{status.items} for {status.price} {status.symbol}</p>
          {status.error ? (
            <p className="text-red-500">Error: {status.error}</p>
          ) : status.done ? (
            <p className="text-green-500">Success</p>
          ) : (
            <Loader2 className="loader" />
          )}
        </div>
        {(status.error || status.done) && (
          <div className="dialog-footer">
            <button onClick={onClose} className="close-button">Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MintStatusDialog;
