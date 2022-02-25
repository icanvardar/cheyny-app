import React, { createContext, useState } from "react";

export const TransferTokenContext = createContext();

const TransferTokenProvider = ({ children }) => {
  const [selectedTokenId, setSelectedTokenId] = useState(null);
  const [receiverAddress, setReceiverAddress] = useState(null);

  return (
    <TransferTokenContext.Provider
      value={{
        selectedTokenId,
        setSelectedTokenId,
        setReceiverAddress,
        receiverAddress,
      }}
    >
      {children}
    </TransferTokenContext.Provider>
  );
};

export default TransferTokenProvider;
