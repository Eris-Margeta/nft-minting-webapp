import Link from "next/link";
import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { navigationToggle } from "../redux/actions/siteSettings";
const Navigation = ({ navigation, navigationToggle }) => {
	const [subMenu, setSubMenu] = useState(null);
	return (
		<Fragment>
			<div
				onClick={() => navigationToggle(false)}
				className={`metaportal_fn_leftnav_closer ${navigation ? "active" : ""}`}
			/>
			<div className={`metaportal_fn_leftnav ${navigation ? "active" : ""}`}>
				<a
					href="#"
					className="fn__closer"
					onClick={() => navigationToggle(false)}
				>
					<span />
				</a>
				<div className="navbox -mt-20 lg:-mt-24">
					<div className="nav_holder">
						<span className="icon">
							<img src="/svg/down.svg" alt="" className="fn__svg" />
						</span>

						<ul
							style={{
								transform: `translateX(${subMenu !== null ? "-100" : "0"}%)`,
							}}
						>
							<li>
								<Link href="/" passHref>
									<span
										className="customLink2 ftb"
										onClick={() => navigationToggle(false)}
									>
										<b>&nbsp;🏠🌑🦧</b>
									</span>
								</Link>
							</li>

							<li>
								<Link
									href="https://midnight.blog"
									target="_blank"
									rel="noreferrer"
								>
									<span onClick={() => navigationToggle(false)}>
										<span className="customLink2 ftb">
											<b>👀STORIES📖</b>
										</span>
									</span>
								</Link>
							</li>
							<li>
								<Link
									href="https://links.midnightapes.com"
									target="_blank"
									rel="noreferrer"
								>
									<span onClick={() => navigationToggle(false)}>
										<span className="customLink2 ftb">
											<b>🦎COMMUNITY🦧</b>
										</span>
									</span>
								</Link>
							</li>
						</ul>
					</div>

					<div className="list_holder">
						<ul className="metaportal_fn_items">
							<li>
								<div className="item">
									<Link
										href="https://discord.gg/midnightapes"
										target="_blank"
										rel="noreferrer"
									>
										<span className="icon">
											<img src="/img/market/discord.png" alt="Discord" />
										</span>
									</Link>
									<span className="text">Discord</span>
								</div>

								<br></br>
								<div className="item">
									<Link
										href="https://twitter.com/MidnightApes"
										target="_blank"
										rel="noreferrer"
									>
										<span className="icon">
											<img src="/img/market/twitter-logo.png" alt="" />
										</span>
									</Link>
								</div>
								<br></br>
								<div className="item">
									<Link
										href="https://t.me/FukiyuSolana"
										target="_blank"
										rel="noreferrer"
									>
										<span className="icon">
											<img
												src="/img/telegram-channel.png"
												alt="Telegram updates channel"
											/>
										</span>
									</Link>
								</div>
							</li>
						</ul>
					</div>

					<div className="info_holder">
						<div className="copyright ptnav">
							<p>Copyright 2024 - Designed &amp; Developed by Midnigt Apes</p>
						</div>
						<div className="social_icons">
							<ul>
								<li>
									<Link
										href="https://www.instagram.com/eacclizzards"
										target="_blank"
										rel="noreferrer"
									>
										<img
											src="/svg/social/instagram-1.svg"
											alt="Follow us on Instagram"
											className="fn__svg"
										/>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	navigation: state.site.navigation,
});
export default connect(mapStateToProps, { navigationToggle })(Navigation);
