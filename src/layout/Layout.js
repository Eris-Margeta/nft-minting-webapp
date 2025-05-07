import Head from "next/head";
import { Fragment, useEffect } from "react";
import ImageView from "../components/popup/ImageView";
import VideoPopup from "../components/popup/VideoPopup";
import { dataBgImg, imgToSVG } from "../utilits";
import Footer from "./Footer";
import Header from "./Header";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import PreLoader from "./PreLoader";
import ScrollTop from "./ScrollTop";

import Social from "./Social";
import WalletPopUp from "./WalletPopUp";

const Layout = ({ children, pageTitle }) => {
	useEffect(() => {
		imgToSVG();
		dataBgImg();
	}, []);

	return (
		<Fragment>
			<ImageView />
			<VideoPopup />
			<PreLoader />

			<Navigation />

			<WalletPopUp />

			<div className="metaportal_fn_main">
				<Header />
				<MobileNavigation />

				<div className="metaportal_fn_content ">
					{children}

					<Footer />
				</div>

				<Social />

				<ScrollTop />
			</div>
		</Fragment>
	);
};
export default Layout;
