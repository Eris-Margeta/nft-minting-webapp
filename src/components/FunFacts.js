import dynamic from "next/dynamic";

const Counter = dynamic(() => import("./Counter"), {
	ssr: false,
});

const FunFacts = () => {
	return (
		<section id="fun_facts">
			<div className="container mx-auto px-4 -mr-6 md:-mr-0 pb-24 -mt-12 -mb-20">
				<div className="fn_cs_counter_list flex flex-col lg:flex-row lg:flex-wrap items-center">
					<ul className="w-full flex flex-col lg:flex-row lg:flex-wrap items-center lg:items-start">
						<li className="w-full md:w-1/3 p-4 whitespace-nowrap flex justify-center lg:justify-start">
							<div className="item flex flex-col items-center">
								<h3 className="gradient-text text-5xl font-bold">
									<Counter end={14745} />
								</h3>
								<p className="text-lg">Total Items</p>
							</div>
						</li>

						<li className="w-full md:w-1/3 p-4 whitespace-nowrap flex justify-center lg:justify-start ">
							<div className="item flex flex-col items-center">
								<h3 className="gradient-text text-4xl font-bold whitespace-nowrap min-w-full">
									<span>
										<Counter end={0.6} decimals={1} />
										&nbsp;SOL
									</span>
								</h3>
								<p className="text-lg">Fair Launch Price</p>
							</div>
						</li>

						<li className="w-full md:w-1/3 p-4 whitespace-nowrap flex justify-center lg:justify-start">
							<div className="item flex flex-col items-center">
								<h3 className="gradient-text text-5xl md:text-6xl font-bold">
									<span>&nbsp;UNLIMITED</span>
								</h3>
								<p className="text-lg">Hidden gems</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
};

export default FunFacts;
