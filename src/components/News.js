import Link from "next/link";
const News = () => {
	return (
		<section id="news  ">
			<div className=" container pt-[20rem] pb-[10rem] ">
				<h3
					className="fn__maintitle big pb-[12rem]"
					data-text="Latest Articles"
					data-align="center"
				>
					Latest Articles
				</h3>
				{/* News Shotcode */}
				<div className="fn_cs_news">
					<div className="news_part">
						<div className="left_items">
							<div className="blog__item">
								<div className="counter">
									<span className="cc">
										<span>01</span>
									</span>
								</div>
								<div className="meta">
									<p>Jun 02, 2024 / Digital Wellbeing</p>
								</div>
								<div className="title">
									<h3>
										<Link
											href="https://www.midnight.blog/blog-posts/60-things-to-do-when-u-feel-bad"
											target="_blank"
											rel="noopener noreferrer"
										>
											<span>60 Things To Do When U Feel Bad</span>
										</Link>
									</h3>
								</div>
								<div className="image">
									<Link
										href="https://www.midnight.blog/blog-posts/60-things-to-do-when-u-feel-bad"
										target="_blank"
										rel="noopener noreferrer"
									>
										<span><img
											src="/img/blog/feelbad.jpeg"
											alt="Midnight Apes Collection Blog article picture"
										/></span>
									</Link>
								</div>
								<div className="read_more">
									<Link
										href="https://www.midnight.blog/blog-posts/60-things-to-do-when-u-feel-bad"
										target="_blank"
										rel="noopener noreferrer"
									>
										<span>Read More</span>
									</Link>
								</div>
							</div>
						</div>
						<div className="right_items">
							<div className="blog__item">
								<div className="counter">
									<span className="cc">
										<span>02</span>
									</span>
								</div>
								<div className="meta">
									<p>May 07, 2024 / Community</p>
								</div>
								<div className="title">
									<h3>
										<Link
											href="https://www.midnight.blog/blog-posts/build-with-the-moon-and-to-the-moon-midnight-blog-manifesto"
											target="_blank"
											rel="noopener noreferrer"
										>
											<span>Build With The Moon And To The 🌑Moon: Midnight Blog
											Manifesto</span>
										</Link>
									</h3>
								</div>
								<div className="read_more">
									<Link
										href="https://www.midnight.blog/blog-posts/build-with-the-moon-and-to-the-moon-midnight-blog-manifesto"
										target="_blank"
										rel="noopener noreferrer"
									>
										<span>Read More</span>
									</Link>
								</div>
							</div>
							<div className="blog__item">
								<div className="counter">
									<span className="cc">
										<span>03</span>
									</span>
								</div>
								<div className="meta">
									<p>Apr 11, 2024 / Development</p>
								</div>
								<div className="title">
									<h3>
										<Link
											href="https://www.midnight.blog/blog-posts/fukiyu-is-most-absurd-start-of-something-incredible"
											target="_blank"
											rel="noopener noreferrer"
										>
											<span>Fukiyu Is Most Absurd Start Of Something Incredible.</span>
										</Link>
									</h3>
								</div>
								<div className="read_more">
									<Link
										href="https://www.midnight.blog/blog-posts/fukiyu-is-most-absurd-start-of-something-incredible"
										target="_blank"
										rel="noopener noreferrer"
									>
										<span>Read More</span>
									</Link>
								</div>
							</div>
							<div className="blog__item">
								<div className="counter">
									<span className="cc">
										<span>04</span>
									</span>
								</div>
								<div className="meta">
									<p>May 13, 2024 / Digital Wellbeing</p>
								</div>
								<div className="title">
									<h3>
										<Link
											href="https://www.midnight.blog/blog-posts/emotional-regulation-develop-this-skill-for-big-positive-shifts-in-your-life"
											target="_blank"
											rel="noopener noreferrer"
										>
											<span>Emotional Regulation: Develop This Skill For Big Positive
											Shifts In Your Life</span>
										</Link>
									</h3>
								</div>
								<div className="read_more">
									<Link
										href="https://www.midnight.blog/blog-posts/emotional-regulation-develop-this-skill-for-big-positive-shifts-in-your-life"
										target="_blank"
										rel="noopener noreferrer"
									>
										<span>Read More</span>
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="bottom_part">
						<div className="left_bot">
							<Link
								href="https://www.midnight.blog/"
								
								target="_blank"
								rel="noopener noreferrer"
							>
								<span className=" metaportal_fn_button ml-4 mt-2">Read All Articles</span>
							</Link>
						</div>
						<div className="right_bot p-12">
							<p>
								If you really like some of the stories and would like to
								personally connect with likeminded people, there is a hidden
								channel in our Discord called &quot;DIGITAL WELLBEING&quot;,
								check it out...
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default News;
