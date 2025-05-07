/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";

import Countdown from "./Countdown";

const About = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	return (
		<section id="about ">
			{/* About Shortcode */}
			<div className="fn_cs_about news px-2">
				<div className="left_part">
					<div className="img">
						<div className="img_in" data-bg-img="/img/image_1671.jpeg">
							<img src="/img/image_1671.jpeg" alt="" />
						</div>
						<div className="img_in" data-bg-img="/img/image_9067.jpeg">
							<img src="/img/image_9067.jpeg" alt="" />
						</div>
					</div>

					<div className="bg_overlay">
						<div className="bg_color" />
						<div className="bg_image" data-bg-img="/img/Cristochimp.png" />
					</div>
				</div>
				<div className="right_part">
					<div className="right_in pt-[13rem] md:pt-[6rem] lg:pt-[4rem]">
						<h3 className="fn__maintitle" data-text="🌑midnight. on SPL404...">
							🌑midnight. on SPL404
						</h3>

						<div className="fn_cs_divider">
							<div className="divider">
								<span />
								<span />
							</div>
						</div>
						<div className="desc">
							<p>
								<Balancer>
									Midnight apes 🌑🦧 is a collection of 14745 artworks created
									by a single artist, NFTalk who has been in the space for a
									decade.
								</Balancer>
							</p>
							<h5>The most unique collection</h5>
							<p>
								<Balancer>
									The development of the project has been going on for&nbsp;
									<u>a year</u>. There is complex metadata behind every NFT, and
									each comes with a special lore poem, animations, videos,
									easter eggs and more... Each NFT will serve as a base for a
									unique lore-driven metaverse.
								</Balancer>
							</p>

							<div className="ptdropdown">
								<h5
									onClick={toggleDropdown}
									style={{
										cursor: "pointer",
										display: "flex",
										alignItems: "center",
									}}
								>
									<u
										style={{
											position: "relative",
											display: "inline-block",
											textDecoration: "none",
										}}
									>
										What is SPL404?
										<span
											style={{
												position: "absolute",
												left: 0,
												bottom: -2,
												width: "100%",
												height: "1px",
												backgroundColor: "rgba(255, 255, 255, 0.5)",
											}}
										/>
									</u>
									<span
										style={{
											marginLeft: "10px",
											fontSize: "24px",
											transition: "transform 0.3s",
											transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
										}}
									>
										⬇👀
									</span>
								</h5>
								<div
									style={{
										maxHeight: isOpen ? "1000px" : "0",
										overflow: "hidden",
										transition: "max-height 0.3s ease",
										paddingBottom: isOpen ? "30px" : "0",
									}}
								>
									<p>
										<Balancer>
											The collection launches on (cutting edge) Libreplex Solana
											SPL404 contract as a series of NFTs where each has
											different value and that can be <u>broken down</u> into
											tokens and traded on exchanges. This means the value of
											each NFT type is unique and will continue to fluctuate in
											value depending on the market. For those that
											couldn&apos;t buy the entire NFT on launch, they can earn
											it by trading tokens and earning enough to swap for an
											NFT.
										</Balancer>
									</p>
								</div>
							</div>

							<div className="ptdropdown1">
								<h5
									onClick={toggleDropdown}
									style={{
										cursor: "pointer",
										display: "flex",
										alignItems: "center",
									}}
								>
									<u
										style={{
											position: "relative",
											display: "inline-block",
											textDecoration: "none",
										}}
									>
										WHO we made it for
										<span
											style={{
												position: "absolute",
												left: 0,
												bottom: -2,
												width: "100%",
												height: "1px",
												backgroundColor: "rgba(255, 255, 255, 0.5)",
											}}
										/>
									</u>
									<span
										style={{
											marginLeft: "10px",
											fontSize: "24px",
											transition: "transform 0.3s",
											transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
										}}
									>
										⬇👀
									</span>
								</h5>
								<div
									style={{
										maxHeight: isOpen ? "1000px" : "0",
										overflow: "hidden",
										transition: "max-height 0.3s ease",
										paddingBottom: isOpen ? "30px" : "0",
									}}
								>
									<p>
										<Balancer>
											The collection was created to pay homage to screen
											dwellers, internet breadgetters. It has the message of
											wellbeing at its core. It asks (and answers) the question
											of how we can have harmony between the natural and the
											digital. By holding this NFT you will get access to the
											most unique, most intimate and true community on the
											internet
										</Balancer>
									</p>
								</div>
							</div>

							<div className="ptdropdown1">
								<h5
									onClick={toggleDropdown}
									style={{
										cursor: "pointer",
										display: "flex",
										alignItems: "center",
									}}
								>
									<u
										style={{
											position: "relative",
											display: "inline-block",
											textDecoration: "none",
										}}
									>
										Lore-driven AI-Ecosystem
										<span
											style={{
												position: "absolute",
												left: 0,
												bottom: -2,
												width: "100%",
												height: "1px",
												backgroundColor: "rgba(255, 255, 255, 0.5)",
											}}
										/>
									</u>
									<span
										style={{
											marginLeft: "10px",
											fontSize: "24px",
											transition: "transform 0.3s",
											transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
										}}
									>
										⬇👀
									</span>
								</h5>
								<div
									style={{
										maxHeight: isOpen ? "1000px" : "0",
										overflow: "hidden",
										transition: "max-height 0.3s ease",
										paddingBottom: isOpen ? "30px" : "0",
									}}
								>
									<p>
										<Balancer>
											There is *<b>deep</b>* lore behind the artworks, mainly
											talking about apes as saviors of humanity, helping them
											improve their wellbeing, combat old systems of bureaucracy
											and use screen dwelling for good.
										</Balancer>
									</p>
									<p>
										<Balancer>
											Apes help humans with new technologies - and bringing that
											to real life, the midnight apes 🌑🦧project itself has
											continuously experimented with a variety of latest
											technology throughout development.
										</Balancer>
									</p>
									<p>
										<Balancer>
											The entire collection has been founded on deep lore as
											well - This Midnight Apes metaverse was created by
											omnipotent all-present beings called The Karma Chameleons
											and they&apos;re a separate collection we made in the
											past. Alongside our celestial guardian Fukiyu, all of our
											past, present and future projects will interconnect to
											bring incredible value and experiences to long term
											holders.
										</Balancer>
									</p>
								</div>
							</div>

							<h6 className="ptdropdown">
								<span className="fn__maintitle notsobig white  ">
									<a
										href="https://www.karm4ch4meleons.lol"
										target="_blank"
										rel="noreferrer"
										className="customLink"
									>
										&rarr; Meet The Karma Chameleons
									</a>
								</span>
							</h6>

							<p className="ptdropdown1">
								<Balancer>
									After the mint, further developments are in plan. Including
									establishing a ReFi foundation which gives back to artist,
									releasing other already prepared collections tied to the same
									lore and developing publications for digital wellbeing.
								</Balancer>
							</p>
							<p>
								<Balancer>
									Furthermore, we will keep experimenting with AI innovations as
									well as keep pushing our token Fükíÿú, the celestial guardian
									of midnight apes 🌑🦧.
								</Balancer>
							</p>
						</div>
						<a
							href="https://discord.gg/midnightapes"
							className="metaportal_fn_button"
							target="_blank"
							rel="noreferrer"
						>
							<span>Find us On Discord</span>
						</a>
						<br></br>
						<a
							href="https://twitter.com/MidnightApes"
							className="metaportal_fn_button"
							target="_blank"
							rel="noreferrer"
						>
							<span>Join us on Twitter</span>
						</a>
						<br></br>
						<a
							href="https://t.me/FukiyuSolana"
							className="metaportal_fn_button"
							target="_blank"
							rel="noreferrer"
						>
							<span>Join us on TELEGRAM</span>
						</a>
						
						
					</div>
				</div>
			</div>

			<section className="dark-overlay-70 -translate-y-12 ">
				<div className="container px-6 mb-2 ">
					<div className="fn_cs_mint">
						<div className="left_part">
							<h3 className="fn__maintitle pt-2" data-text="How to Mint">
								How to Mint
							</h3>

							<div className="fn_cs_divider">
								<div className="divider">
									<span />
									<span />
								</div>
							</div>
							<div className="desc p-6 text-base">
								<p>
									<Balancer>
										Midnight Apes can be bought as NFTs on this website. Once
										the entire collection is minted, you will be able to swap
										them for $midnight tokens and trade them independently on
										exchanges.
										<br></br>
										<br></br>
										Each NFT has unique value and rarity.
										<br></br>
										<br></br>
										There are many easter eggs hidden inside of the collection.
										Some NFTs get you real-life rewards, tasks, and more.
										<br></br>
										<br></br>
										Make sure to thoroughly review your NFT after purchasing.
										Connect your wallet and go click on &quot;MY 🌑🦧&quot; to
										view your collection.
									</Balancer>
								</p>

								<Link href="/nft-mint">
									<span className="metaportal_fn_button  ml-12 my-12 ">
										Mint Now
									</span>
								</Link>

								<br></br>
								<br></br>
								<p>
									<Balancer>
										🌑🦧 NFTs have inherent value - it&apos;s ART, it&apos;s
										meant to be gazed at.
										<br></br>
										<br></br>
										Alongside that, each NFT has a rarity which gives it a value
										larger than initial the purchase price.
									</Balancer>
								</p>
								<p>
									<Balancer>
										🚀 1 x surprise (x??? value)<br></br>
										💥 100 x epic (x100 value)<br></br>
										👀 1000 x rare (x3 value)<br></br>✨ 3000 x common (x2
										value)
									</Balancer>
								</p>

								<h4>
									<Balancer>
										The SPL404 contract is the revolution of NFTs as such
										enabling holders to break-up certain NFTs into tokens of
										variable value and trade it on exchanges. It also continues
										to add value to NFTs long after the project has been minted.
									</Balancer>
								</h4>
							</div>
							<Link href="/nft-mint">
								<span className="metaportal_fn_button ml-12 ">Mint Now</span>
							</Link>
						</div>
						<div className="right_part">
							<div className="fn_cs_steps">
								<ul>
									<li>
										<div className="item">
											<div className="item_in">
												<h3 className="fn__gradient_title">01</h3>
												<p>Connect your SOLANA Wallet</p>
											</div>
										</div>
									</li>
									<li>
										<div className="item">
											<div className="item_in">
												<h3 className="fn__gradient_title">02</h3>
												<p>Select Your Quantity</p>
											</div>
										</div>
									</li>
									<li>
										<div className="item">
											<div className="item_in">
												<h3 className="fn__gradient_title">03</h3>
												<p>Confirm The Transaction</p>
											</div>
										</div>
									</li>
									<li>
										<div className="item">
											<div className="item_in">
												<h3 className="fn__gradient_title">04</h3>
												<p>
													Receive Your NFT&apos;s and view them at &quot;MY
													🌑🦧&quot;
												</p>
											</div>
										</div>
									</li>
								</ul>
							</div>

							<div className="fn_cs_video">
								<img src="/img/video/1.jpg" alt="" />
								<a
									className="popup-youtube"
									href="https://www.youtube.com/embed/--MfCkb4O70?si=EwZdmJeBwe9WrWOW"
								>
									<img src="/svg/play.svg" alt="" className="fn__svg" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</section>
	);
};
export default About;
