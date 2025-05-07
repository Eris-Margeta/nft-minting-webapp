"use client";

import React, { useEffect, useState } from "react";
import { CountdownBar } from "./CountdownBar";

const NoticeBar = () => {
	const [shrink, setShrink] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setShrink(true);
			} else {
				setShrink(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className={`announcementBar ${shrink ? "shrink" : ""}`}>
			<span className="announcementText">
			Whitelist-only access until:
				<CountdownBar />
			</span>
		</div>
	);
};

export default NoticeBar;
