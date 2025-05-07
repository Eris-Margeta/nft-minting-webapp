import Link from "next/link";
import { useEffect, useState, useContext, useRef } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { navigationToggle } from "../redux/actions/siteSettings";
import { stickyNav } from "../utilits";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import Spinner from "./Spinner";
import { LoadingContext } from "../../pages/_app";
import { useLoading } from "./useLoading";

const Header = ({ navigationToggle }) => {
	const router = useRouter();
	const { setVisible } = useWalletModal();
	const wallet = useWallet();
	const { setLoading } = useContext(LoadingContext);

	const [buttonLoading, setButtonLoading] = useState({
		collection: false,
		mint: false,
		community: false,
		stories: false,
	});

	const { startLoading, stopLoading } = useLoading();
	const [lastPressTime, setLastPressTime] = useState(0);
	const [cooldownActive, setCooldownActive] = useState(false);
	const delayedPress = useRef(null);

	useEffect(() => {
		stickyNav();
		const handleScroll = () => {
			const walletButton = document.querySelector(".wallet");
			if (window.scrollY > 50) {
				walletButton.classList.add("sticky-wallet");
			} else {
				walletButton.classList.remove("sticky-wallet");
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		stickyNav();
		const handleScroll = () => {
			const walletButton = document.querySelector(".wallet2");
			if (window.scrollY > 50) {
				walletButton.classList.add("sticky-wallet2");
			} else {
				walletButton.classList.remove("sticky-wallet2");
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleLinkClick = (key, url) => {
		if (key === "mint") {
			startLoading();
			setLoading(true);
			setButtonLoading((prevState) => ({ ...prevState, [key]: true }));
		}
		if (url) {
			window.open(url, "_blank", "noopener,noreferrer");
		}
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

	return (
		<header id="header">
			<div className="header">
				<div className="header_in">
					<div className="trigger_logo wallet2">
						<div
							className="trigger"
							onClick={() => navigationToggle(true)}
							style={{ cursor: "pointer" }}
						>
							<span />
						</div>
						<div className="logo white">
							<Link href="/">
								<span className="no-wrap" style={{ cursor: "pointer" }}>
									🌑midnight.
								</span>
							</Link>
						</div>
					</div>
					<div className="nav" style={{ opacity: 1 }}>
						<ul>
							<li>
								<Link href="/">
									<span
										className="customLink2 no-wrap"
										style={{ cursor: "pointer" }}
									>
										<b>🏠 🌑🦧</b>
									</span>
								</Link>
							</li>
							<li>
								<div
									className="customLink2 no-wrap"
									onClick={() =>
										handleLinkClick("stories", "https://www.midnight.blog/")
									}
									style={{ cursor: "pointer" }}
								>
									<b>👀 STORIES 📖</b>
								</div>
							</li>
							<li>
								<div
									className="customLink2 no-wrap"
									onClick={() =>
										handleLinkClick(
											"community",
											"https://links.midnightapes.com/"
										)
									}
									style={{ cursor: "pointer" }}
								>
									<b>🦎 COMMUNITY 🦧</b>
								</div>
							</li>
						</ul>
					</div>
					<div className="wallet">
						{!wallet.publicKey && (
							<div
								onClick={triggerHandleConnect}
								className="metaportal_fn_button wallet_opener walletbuttontop"
								style={{ cursor: "pointer" }}
							>
								{cooldownActive ? (
									<Spinner />
								) : (
									<span className="no-wrap">Connect Wallet</span>
								)}
							</div>
						)}
						{wallet.publicKey && (
							<div className="wallet_buttons">
								{router.pathname !== "/collection" && (
									<Link href="/collection">
										<div
											onClick={() =>
												setButtonLoading((prevState) => ({
													...prevState,
													collection: true,
												}))
											}
											className="metaportal_fn_button wallet_opener walletbuttontop"
											style={{ cursor: "pointer" }}
										>
											{buttonLoading.collection ? (
												<Spinner />
											) : (
												<span className="no-wrap">👀 MY COLLECTION</span>
											)}
										</div>
									</Link>
								)}
								{router.pathname !== "/nft-mint" && (
									<Link href="/nft-mint">
										<div
											onClick={() => handleLinkClick("mint")}
											className="metaportal_fn_button wallet_opener walletbuttontop"
											style={{ cursor: "pointer" }}
										>
											{buttonLoading.mint ? (
												<Spinner />
											) : (
												<span className="no-wrap">💰 MINT</span>
											)}
										</div>
									</Link>
								)}
								<div>
									<span
										onClick={async () => {
											await wallet.disconnect();
											stopLoading();
										}}
										className="metaportal_fn_buttonx wallet_opener disconnect walletbuttontop"
										style={{ cursor: "pointer" }}
									>
										x
									</span>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { navigationToggle })(Header);
