/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect } from "react";
import Balancer from "react-wrap-balancer";

const Collection = () => {
	useEffect(() => {
		const collection = document.querySelector(".fn_cs_collection");
		var items = collection.querySelectorAll(".item");
		var itemsLength = items.length;
		setInterval(function () {
			var numberOne = Math.floor(Math.random() * itemsLength);
			var numberTwo = Math.floor(Math.random() * itemsLength);

			while (numberTwo === numberOne) {
				numberTwo = Math.floor(Math.random() * itemsLength);
			}
			var firstDiv = items[numberOne];
			var secondDiv = items[numberTwo];
			var firstImage = firstDiv.querySelector("input").value;
			var secondImage = secondDiv.querySelector("input").value;
			firstDiv.classList.add("ready");
			secondDiv.classList.add("ready");
			// console.log(firstDiv.querySelector("input").value == firstDiv);
			setTimeout(function () {
				// console.log(secondDiv.querySelector("input").value == firstDiv);
				// firstDiv.querySelector("input").value == secondImage;
				// firstDiv.querySelector(".abs_img").style.backgroundImage =
				//   "url(" + secondImage + ")";
				// // secondDiv.querySelector("input").val(firstImage);
				// secondDiv.querySelector("input").value == firstDiv;
				// console.log(secondDiv.querySelector("input").value);
				// secondDiv.querySelector(".abs_img").style.backgroundImage =
				//   "url(" + firstImage + ")";

				firstDiv.classList.remove("ready");
				secondDiv.classList.remove("ready");
			}, 500);
		}, 2000);
	}, []);

	return (
		<section id="collection">
			<div className="container">
				<h3
					className="fn__maintitle big"
					data-text="Our Collection"
					data-align="center"
				>
					Our Collection
				</h3>
				<div className="fn_cs_collection">
					<div className="collection_top">
						<div className="item">
							<div className="item_in">
								<div className="img">
									<div
										className="abs_img"
										data-bg-img="/img/collection/1.jpg"
									/>
									<img src="/img/collection/1.jpg" alt="" />
								</div>
							</div>
							<input type="hidden" defaultValue="img/collection/1.jpg" />
						</div>
						<div className="item">
							<div className="item_in">
								<div className="img">
									<div
										className="abs_img"
										data-bg-img="/img/collection/2.jpg"
									/>
									<img src="/img/collection/2.jpg" alt="" />
								</div>
							</div>
							<input type="hidden" defaultValue="img/collection/2.jpg" />
						</div>
						<div className="item">
							<div className="item_in">
								<div className="img">
									<div
										className="abs_img"
										data-bg-img="/img/collection/3.jpg"
									/>
									<img src="/img/collection/3.jpg" alt="" />
								</div>
							</div>
							<input type="hidden" defaultValue="img/collection/3.jpg" />
						</div>
						<div className="item">
							<div className="item_in">
								<div className="img">
									<div
										className="abs_img"
										data-bg-img="/img/collection/4.jpg"
									/>
									<img src="/img/collection/4.jpg" alt="" />
								</div>
							</div>
							<input type="hidden" defaultValue="img/collection/4.jpg" />
						</div>
					</div>
					<div className="collection_bottom">
						<div className="item">
							<div className="item_in">
								<div className="img">
									<div
										className="abs_img"
										data-bg-img="/img/collection/5.jpg"
									/>
									<img src="/img/collection/5.jpg" alt="" />
								</div>
							</div>
							<input type="hidden" defaultValue="img/collection/5.jpg" />
						</div>
						<div className="item">
							<div className="item_in">
								<div className="img">
									<div
										className="abs_img"
										data-bg-img="/img/collection/6.jpg"
									/>
									<img src="/img/collection/6.jpg" alt="" />
								</div>
							</div>
							<input type="hidden" defaultValue="img/collection/6.jpg" />
						</div>
						<div className="item">
							<div className="item_in">
								<div className="img">
									<div
										className="abs_img"
										data-bg-img="/img/collection/7.jpg"
									/>
									<img src="/img/collection/7.jpg" alt="" />
								</div>
							</div>
							<input type="hidden" defaultValue="img/collection/7.jpg" />
						</div>
						<div className="item">
							<div className="item_in">
								<div className="img">
									<div
										className="abs_img"
										data-bg-img="/img/collection/8.jpg"
									/>
									<img src="/img/collection/8.jpg" alt="" />
								</div>
							</div>
							<input type="hidden" defaultValue="img/collection/8.jpg" />
						</div>
					</div>
				</div>
				<div className="fn_cs_desc">
					<p>
						<Balancer>
							Midnight Apes is a collection of 14 745 artworks, an art-centric
							ecosystem.
						</Balancer>
					</p>
					<p>
						<Balancer>
							It showcases screen dwelling apes, some on the screen, some doing
							other activities in their free time, like being in bars, enjoying
							nature, playing sports, hugging friends, meditating, and more.
						</Balancer>
					</p>
					<p>
						<Balancer>
							They live in a realm called Myr, where nature and technology exist
							in harmony, and where wellbeing is at the heart of life. The lore
							poems tell more about the realm and the life of midnight apes
							🌑🦧.
						</Balancer>
					</p>
					
				</div>
			</div>
		</section>
	);
};
export default Collection;
