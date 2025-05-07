"use client";
import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Counter = ({ end = 100, decimals = 0 }) => {
	const [hasMounted, setHasMounted] = useState(false);
	const { ref, inView } = useInView({
		triggerOnce: true,
		delay: 100,
	});

	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) {
		return <span className="fn_cs_counter">Loading...</span>;
	}

	return (
		<span ref={ref} className="fn_cs_counter" data-from="0" data-to={end}>
			<CountUp start={0} end={end} duration={3} decimals={decimals} />
		</span>
	);
};

export default Counter;
