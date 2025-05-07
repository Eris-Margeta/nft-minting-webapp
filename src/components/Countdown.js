"use client";

import React, { useEffect, useState } from "react";

const Countdown = () => {
	const calculateTimeLeft = () => {
		const difference = +new Date("2024-06-13T12:00:00+02:00") - +new Date();
		let timeLeft = {};

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			};
		} else {
			timeLeft = {
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0,
			};
		}

		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

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
		<span className="countdown">
			{timerComponents.length ? timerComponents : <span>Mint OPENED!</span>}
		</span>
	);
};

export default Countdown;
