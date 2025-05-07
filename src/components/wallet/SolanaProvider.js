import React, {
	createContext,
	useContext,
	useMemo,
	useState,
	useCallback,
	useRef,
	useEffect,
} from "react";
import {
	ConnectionProvider,
	WalletProvider,
	useWallet,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
	PhantomWalletAdapter,
	SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
	WalletModalProvider,
	useWalletModal,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

// Remove type annotations
export const NetworkContext = createContext({
	network: WalletAdapterNetwork.Devnet,
	setNetwork: (network) => {
		throw new Error();
	},
});

export const DasUrlContext = createContext("");

export function useDasUrl() {
	return useContext(DasUrlContext);
}

export function useNetwork() {
	return useContext(NetworkContext);
}

// Create a new context for walletModalButtonRef
export const WalletModalButtonContext = createContext(null);

// Helper function to clear storage
const clearStorage = () => {
	sessionStorage.clear();
	for (const key in localStorage) {
		if (key !== "redirected") {
			localStorage.removeItem(key);
		}
	}
};

const WalletButtonHandler = ({ walletModalButtonRef }) => {
	const { visible } = useWalletModal();
	const { publicKey } = useWallet();
	const wasVisible = useRef(visible); // Track previous visibility state
	const timeoutRef = useRef(null); // Track the timeout ID

	useEffect(() => {
		if (!visible && wasVisible.current && !publicKey) {
			// Wallet modal just turned from visible to not visible and no public key
			if (walletModalButtonRef.current) {
				timeoutRef.current = setTimeout(() => {
					if (!publicKey) {
						walletModalButtonRef.current.click();
					}
				}, 950); // Delay the click
			}
		}
		wasVisible.current = visible; // Update the previous visibility state

		return () => {
			// Clear the timeout if the component is unmounted or if the effect is cleaned up
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [visible, publicKey, walletModalButtonRef]);

	useEffect(() => {
		if (publicKey) {
			// Clear the timeout if publicKey is obtained
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		}
	}, [publicKey]);

	return null; // renders nothing
};

export const SolanaProvider = ({ children }) => {
	const [network, setNetwork] = useState(() => {
		if (typeof window === "undefined") {
			return WalletAdapterNetwork.Devnet;
		}

		let storedNetwork = WalletAdapterNetwork.Devnet;

		if (process.env.NEXT_PUBLIC_NETWORK === "m") {
			storedNetwork = WalletAdapterNetwork.Mainnet;
		}

		return storedNetwork;
	});

	const [key, setKey] = useState(0); // State to trigger reinitialization

	const endpoint = useMemo(
		() =>
			network === WalletAdapterNetwork.Devnet
				? process.env.NEXT_PUBLIC_DEFAULT_RPC_DEVNET
				: process.env.NEXT_PUBLIC_DEFAULT_RPC_MAINNET,
		[network]
	);

	const dasEndpoint = useMemo(
		() =>
			network === WalletAdapterNetwork.Devnet
				? process.env.NEXT_PUBLIC_DEFAULT_DAS_DEVNET
				: process.env.NEXT_PUBLIC_DEFAULT_DAS_MAINNET,
		[network]
	);

	const wallets = useMemo(
		() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
		[network]
	);

	const handleConnect = useCallback(() => {
		clearStorage();
		setKey((prevKey) => prevKey + 1);
	}, []);

	// Ref to the WalletModalButton
	const walletModalButtonRef = useRef(null);

	return (
		<DasUrlContext.Provider value={dasEndpoint}>
			<ConnectionProvider key={key} endpoint={endpoint}>
				<WalletProvider wallets={wallets} autoConnect>
					<NetworkContext.Provider
						value={{
							setNetwork: (newNetwork) => {
								setNetwork(newNetwork);
							},
							network,
						}}
					>
						<WalletModalButtonContext.Provider value={walletModalButtonRef}>
							<WalletModalProvider>
								<WalletButtonHandler
									walletModalButtonRef={walletModalButtonRef}
								/>
								<button
									className="hiddenbutton"
									ref={walletModalButtonRef}
									onClick={handleConnect}
								>
									TEST123
								</button>
								{children}
							</WalletModalProvider>
						</WalletModalButtonContext.Provider>
					</NetworkContext.Provider>
				</WalletProvider>
			</ConnectionProvider>
		</DasUrlContext.Provider>
	);
};
