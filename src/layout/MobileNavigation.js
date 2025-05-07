import Link from "next/link";
import { Fragment, useState, useEffect, useContext, useRef } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { navigationToggle, walletToggle } from "../redux/actions/siteSettings";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRedirect } from "../components/wallet/RedirectProvider";
import Spinner from "./Spinner";
import { LoadingContext } from "../../pages/_app";
import { useLoading } from "./useLoading";

const MobileNavigation = ({ walletToggle, navigationToggle }) => {
	const [toggle, setToggle] = useState(false);
	const [buttonText, setButtonText] = useState("Connect Wallet");
	const { setVisible } = useWalletModal();
	const wallet = useWallet();
	const router = useRouter();
	const { redirected, setRedirected } = useRedirect();
	const { setLoading } = useContext(LoadingContext);

	const { loading: buttonLoading, startLoading, stopLoading } = useLoading();
	const [lastPressTime, setLastPressTime] = useState(0);
	const [cooldownActive, setCooldownActive] = useState(false);
	const delayedPress = useRef(null);

	const setSessionRedirected = (value) => {
		sessionStorage.setItem("redirected", value ? "true" : "false");
	};

	const getSessionRedirected = () => {
		return sessionStorage.getItem("redirected") === "true";
	};

	const triggerHandleConnect = () => {
		const currentTime = Date.now();
		if (currentTime - lastPressTime < 1100) {
			setCooldownActive(true);
			delayedPress.current = () => setVisible(true);
			setTimeout(() => {
				setCooldownActive(false);
				if (delayedPress.current) {
					delayedPress.current();
					delayedPress.current = null;
				}
			}, 1100 - (currentTime - lastPressTime));
			return;
		}
		setLastPressTime(currentTime);
		setVisible(true);
	};

	useEffect(() => {
		if (!wallet.publicKey) {
			const interval = setInterval(() => {
				setButtonText((prevText) =>
					prevText === "Connect Wallet" ? "💰 MINT" : "Connect Wallet"
				);
			}, 1476);

			return () => clearInterval(interval);
		}
	}, [wallet.publicKey]);

	useEffect(() => {
		const handleRedirect = () => {
			if (wallet.publicKey) {
				const sessionRedirected = getSessionRedirected();
				const isMobile = window.innerWidth <= 768; // Define mobile screen size

				if (
					isMobile &&
					!sessionRedirected &&
					!redirected &&
					!router.pathname.includes("/nft-mint") &&
					router.pathname !== "/collection"
				) {
					startLoading();
					router.push("/nft-mint");
					setRedirected(true);
					setSessionRedirected(true);
				} else if (
					router.pathname.includes("/nftmint") ||
					router.pathname === "/collection"
				) {
					setRedirected(true);
				}
			}
		};

		handleRedirect();

		window.addEventListener("resize", handleRedirect); // Reapply redirection on resize
		return () => {
			window.removeEventListener("resize", handleRedirect);
		};
	}, [wallet.publicKey, router, redirected, setRedirected, startLoading]);

	useEffect(() => {
		if (!wallet.publicKey) {
			setRedirected(false);
			setSessionRedirected(false);
		}
	}, [wallet.publicKey, setRedirected]);

	const handleLinkClick = (href, buttonType) => {
		if (buttonType === "mint") {
			startLoading();
			setLoading(true);
		}
		router.push(href);
	};

	return (
		<Fragment>
			<div className="metaportal_fn_mobnav -mt-12 mb-12">
				<div className="mob_top ">
					<div className="social_trigger  ">
						<div
							className="trigger sticky-top-l shadow-white-glow -ml-2 -mt-8"
							onClick={() => navigationToggle(true)}
						>
							<span></span>
						</div>
					</div>

					<div className="wallet sticky-top flex align-items-right align-right -mt-6 ">
						{router.pathname !== "/collection" && (
							<div
								className="metaportal_fn_buttonx2 wallet_opener walletbuttontop  w-full max-w-[5rem] md:max-w-[10rem] md:min-w-[5rem] mr-1 text-[1.1rem] leading-[2.3] flex items-center justify-center h-min  px-[1.5rem] opacity-95"
								onClick={() => handleLinkClick("/collection", "collection")}
							>
								<span>👀✨</span>
							</div>
						)}

						{!wallet.publicKey && (
							<div
								onClick={triggerHandleConnect}
								className="metaportal_fn_buttonx2 wallet_opener walletbuttontop w-[15rem] -mr-2 text-[1.1rem] leading-[2.3] flex items-center justify-center h-min px-"
							>
								<div>
									{cooldownActive ? <Spinner /> : <span>{buttonText}</span>}
								</div>
							</div>
						)}
						{wallet.publicKey && (
							<>
								{!router.pathname.includes("/nft-mint") && (
									<div
										className="metaportal_fn_buttonx2 wallet_opener walletbuttontop w-[7rem] ml-2 text-[1.1rem] leading-[2.3] flex items-center justify-center h-min px-[4rem]"
										onClick={() => handleLinkClick("/nft-mint", "mint")}
									>
										{buttonLoading ? <Spinner /> : <span>💰 MINT</span>}
									</div>
								)}
								<div>
									<span
										onClick={async () => {
											await wallet.disconnect();
											stopLoading();
										}}
										className="metaportal_fn_buttonx2 wallet_opener disconnect walletbuttontop w-min ml-2 text-[1.1rem] leading-[2.3] flex items-center justify-center h-min px-3 opacity-85"
									>
										X
									</span>
								</div>
							</>
						)}
					</div>
				</div>
				<div className="mob_mid">
					<div className="logo ">
						<Link href="/">
							<span>
								<img src="/img/logo.png" alt="midnight apes logo" />
							</span>
						</Link>
					</div>
					<div
						className={`trigger ${toggle ? "active" : ""}`}
						onClick={() => setToggle(!toggle)}
					>
						<span />
					</div>
				</div>
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	navigation: state.site.navigation,
});

export default connect(mapStateToProps, { walletToggle, navigationToggle })(
	MobileNavigation
);
