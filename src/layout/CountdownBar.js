"use client";

import React, { useEffect, useState } from "react";

export const CountdownBar = () => {
	const calculateTimeLeft = () => {
		const difference = +new Date("2024-06-23T12:00:00+02:00") - +new Date();
		let timeLeft = {};

		if (difference > 0) {
			timeLeft = {
				d: Math.floor(difference / (1000 * 60 * 60 * 24)),
				h: Math.floor((difference / (1000 * 60 * 60)) % 24),
				m: Math.floor((difference / 1000 / 60) % 60),
				s: Math.floor((difference / 1000) % 60),
			};
		} else {
			timeLeft = {
				d: 0,
				h: 0,
				m: 0,
				s: 0,
			};
		}

		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState({
		d: 0,
		h: 0,
		m: 0,
		s: 0,
	});

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const timerComponents = [];

	Object.keys(timeLeft).forEach((interval) => {
		timerComponents.push(
			<span key={interval}>
				{timeLeft[interval]} {interval}{" "}
			</span>
		);
	});

	return (
		<span className="countdownbar">
			{timerComponents.length ? timerComponents : <span>Mint OPENED!</span>}
		</span>
	);
};
