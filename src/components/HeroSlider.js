/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import Balancer from "react-wrap-balancer";

const HeroSlider = () => {
	useEffect(() => {
		const fn_cs_slider = document.querySelectorAll(".fn_cs_slider");
		fn_cs_slider.forEach((element) => {
			let sliderTop = element.getElementsByClassName("slider_top")[0],
				sliderBottom = element.getElementsByClassName("slider_content"),
				activeIndex = 2,
				speed = 6000;

			let myInterval = setInterval(function () {
				activeIndex++;
				activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
			}, speed);
			const prev = document.querySelector(".slider_nav .prev"),
				next = document.querySelector(".slider_nav .next"),
				li = element.getElementsByTagName("li");
			prev.addEventListener("click", function (e) {
				e.preventDefault();
				clearInterval(myInterval);
				activeIndex--;
				activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
				myInterval = setInterval(function () {
					activeIndex++;
					activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
				}, speed);
				return false;
			});
			next.addEventListener("click", (e) => {
				e.preventDefault();
				clearInterval(myInterval);
				activeIndex++;
				activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
				myInterval = setInterval(function () {
					activeIndex--;
					activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
				}, speed);
				return false;
			});
			for (let i = 0; i < li.length; i++) {
				const liElement = li[i];
				const getClass = liElement.getAttribute("class");
				if (getClass === "next") {
					activeIndex++;
				} else if (getClass === "prev") {
					activeIndex--;
				} else {
					return false;
				}
				clearInterval(myInterval);
				activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
				myInterval = setInterval(function () {
					activeIndex++;
					activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
				}, speed);
				return false;
			}
		});
	}, []);

	const sliderDo = (sliderTop, sliderBottom, activeIndex) => {
		var topLength = sliderTop.getElementsByTagName("li").length;
		if (activeIndex > topLength) {
			activeIndex -= topLength;
		}
		var indexPrev = activeIndex - 1;
		var indexPrev2 = activeIndex - 2;
		var indexNext = activeIndex + 1;
		var indexNext2 = activeIndex + 2;
		if (indexPrev > topLength) {
			indexPrev -= topLength;
		}
		if (indexPrev2 > topLength) {
			indexPrev2 -= topLength;
		}
		if (indexNext > topLength) {
			indexNext -= topLength;
		}
		if (indexNext2 > topLength) {
			indexNext2 -= topLength;
		}
		if (indexPrev < 1) {
			indexPrev += topLength;
		}
		if (indexPrev2 < 1) {
			indexPrev2 += topLength;
		}
		if (activeIndex < 1) {
			activeIndex += topLength;
		}
		if (indexNext < 1) {
			indexNext += topLength;
		}
		if (indexNext2 < 1) {
			indexNext2 += topLength;
		}
		let li = sliderTop.getElementsByTagName("li");
		for (let i = 0; i < li.length; i++) {
			const element = li[i];
			element.classList.remove("prev", "prev2", "active", "next", "next2");
			// element.setAttribute(`data-index${indexNext}`);
		}
		sliderTop
			.querySelector('li[data-index="' + indexPrev2 + '"]')
			.classList.add("prev2");
		sliderTop
			.querySelector('li[data-index="' + indexPrev + '"]')
			.classList.add("prev");
		sliderTop
			.querySelector('li[data-index="' + activeIndex + '"]')
			.classList.add("active");
		sliderTop
			.querySelector('li[data-index="' + indexNext + '"]')
			.classList.add("next");
		sliderTop
			.querySelector('li[data-index="' + indexNext2 + '"]')
			.classList.add("next2");
		return activeIndex;
	};

	return (
		<section id="home">
			<div className="container px-4 -mt-16 lg:-mt-32">
		
				<h1 className="fn__maintitle biga padb dblock  "  data-text="🌑🦧" data-align="center">
				<span className="transparent-gradient">
				
					🌑🦧
					</span>
				</h1>
			
				<h1
					className="fn__maintitle  text-[3rem] padb padt1 "
					data-text="Midnight Apes"
					data-align="center"
				><span className="text-[3rem] ">
					Midnight Apes
					</span>
				</h1>
				
				<h1
					className="fn__maintitle padb padt1 text-[1.5rem]"
					data-text="Liquid Art NFT Collection"
					data-align="center"
				>
					Liquid Art NFT Collection
					
				</h1>
				<h6 className="item h6small padt">
				
					Launching on Solana and SPL404 contract
				
				</h6>
				
				{/* Slider */}
				<div className="fn_cs_slider p-6 overflow-visible" data-responsive="on">
					<div className="slider_top">
						<img src="/img/11.jpg" alt="" />
						<ul>
							<li className="prev" data-index={1}>
								<div className="item">
									<img src="/img/11.jpg" alt="" />
									<div className="item_in">
										<div className="img" data-bg-img="/img/11.jpg" />
									</div>
								</div>
							</li>
							<li className="active" data-index={2}>
								<div className="item">
									<img src="/img/12.jpg" alt="" />
									<div className="item_in">
										<div className="img" data-bg-img="/img/12.jpg" />
									</div>
								</div>
							</li>
							<li className="next" data-index={3}>
								<div className="item has_video">
									<img src="/img/video1.jpg" alt="" />
									<a
										className="popup-youtube metaportal_fn_videobutton"
										href="https://www.youtube.com/embed/O69X4P-1sQ8?si=gXuNCBP0dXfbUmmi"
									>
										<img src="/svg/play.svg" alt="" className="fn__svg" />
									</a>
									<div className="item_in">
										<div className="img" data-bg-img="/img/video1.jpg" />
									</div>
								</div>
							</li>
							<li className="next2" data-index={4}>
								<div className="item">
									<img src="/img/13.jpg" alt="" />
									<div className="item_in">
										<div className="img" data-bg-img="/img/13.jpg" />
									</div>
								</div>
							</li>
							<li data-index={5}>
								<div className="item">
									<img src="/img/14.jpg" alt="" />
									<div className="item_in">
										<div className="img" data-bg-img="/img/14.jpg" />
									</div>
								</div>
							</li>
							<li data-index={6}>
								<div className="item">
									<img src="/img/15.jpg" alt="" />
									<div className="item_in">
										<div className="img" data-bg-img="/img/15.jpg" />
									</div>
								</div>
							</li>
							<li data-index={7}>
								<div className="item">
									<img src="/img/16.jpg" alt="" />
									<div className="item_in">
										<div className="img" data-bg-img="/img/16.jpg" />
									</div>
								</div>
							</li>
							<li className="prev2" data-index={8}>
								<div className="item">
									<img src="/img/17.jpg" alt="" />
									<div className="item_in">
										<div className="img" data-bg-img="/img/17.jpg" />
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div className="slider_nav ">
						<a href="#" className="prev">
							<span className="circle" />
							<span className="icon ">
								<img src="/svg/down.svg" alt="" className="fn__svg " />
							</span>
							<span className="circle" />
						</a>
						<a href="#" className="next">
							<span className="circle" />
							<span className="icon">
								<img src="/svg/down.svg" alt="" className="fn__svg" />
							</span>
							<span className="circle" />
						</a>
					</div>
				</div>
				{/* !Slider */}
				{/* Description */}
				<div className="fn_cs_desc pt-16 -mb-12">
					<p>
						<Balancer>
							Midnight apes 🌑🦧 is a collection of 14745 artworks created as an
							homage to{" "}
							<span>
								<u>screen dwellers.</u>
							</span>{" "}
							The collection is released on a <b>SPL404</b> contract on SOLANA
							and the artworks are categorized by rarity.
						</Balancer>
					</p>
				
				</div>
				
			</div>
		</section>
	);
};
export default HeroSlider;
