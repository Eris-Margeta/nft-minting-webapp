import { useContext, useCallback } from 'react';
import { WalletModalButtonContext } from './SolanaProvider';

const useResetBug = () => {
    const walletModalButtonRef = useContext(WalletModalButtonContext);

    return useCallback(() => {
        if (walletModalButtonRef.current) {
            walletModalButtonRef.current.click();
        }
    }, [walletModalButtonRef]);
};

export default useResetBug;
