import Link from "next/link";
import Layout from "../src/layout/Layout";
import PageBanner from "../src/layout/PageBanner";
const Blog = () => {
  return (
    <Layout pageTitle={"Blog"}>
      <PageBanner pageName={"Blog Articles"} />

      <div className="metaportal_fn_bloglist">
        <div className="container small">
          <div className="bloglist">
            <ul className="fn-isotope">
              <li className="isotope-item">
                <div className="blog__item">
                  <div className="counter">
                    <span className="cc">
                      <span>01</span>
                    </span>
                  </div>
                  <div className="meta">
                    <p>August 09, 2022 / MetaVerse / 4 Comments</p>
                  </div>
                  <div className="title">
                    <h3>
                      <Link href="/blog-single">
                        <span>Reasons Why People Use Discord</span>
                      </Link>
                    </h3>
                  </div>
                  <div className="image">
                    <Link href="/blog-single">
                      <span>
                        <img src="/img/blog/1.jpg" alt="" />
                      </span>
                    </Link>
                  </div>
                  <div className="read_more">
                    <Link href="/blog-single">
                      
                        <span>Read More</span>
                      
                    </Link>
                  </div>
                </div>
              </li>
              <li className="isotope-item">
                <div className="blog__item">
                  <div className="counter">
                    <span className="cc">
                      <span>02</span>
                    </span>
                  </div>
                  <div className="meta">
                    <p>August 09, 2022 / MetaVerse / 4 Comments</p>
                  </div>
                  <div className="title">
                    <h3>
                      <Link href="/blog-single">
                        <span>Rewards for the Zoidster NFTs</span>
                      </Link>
                    </h3>
                  </div>
                  <div className="image">
                    <Link href="/blog-single">
                      <span>
                        <img src="/img/blog/2.jpg" alt="" />
                      </span>
                    </Link>
                  </div>
                  <div className="read_more">
                    <Link href="/blog-single">
                      
                        <span>Read More</span>
                      
                    </Link>
                  </div>
                </div>
              </li>
              <li className="isotope-item">
                <div className="blog__item">
                  <div className="counter">
                    <span className="cc">
                      <span>03</span>
                    </span>
                  </div>
                  <div className="meta">
                    <p>August 09, 2022 / MetaVerse / 4 Comments</p>
                  </div>
                  <div className="title">
                    <h3>
                      <Link href="/blog-single">
                        <span>
                          A Behind-the-Scenes Look: How the BRAWL-O-SEUM NFT Was
                          Created
                        </span>
                      </Link>
                    </h3>
                  </div>
                  <div className="image">
                    <Link href="/blog-single">
                      <span>
                        <img src="/img/blog/3.jpg" alt="" />
                      </span>
                    </Link>
                  </div>
                  <div className="read_more">
                    <Link href="/blog-single">
                      
                        <span>Read More</span>
                      
                    </Link>
                  </div>
                </div>
              </li>
              <li className="isotope-item">
                <div className="blog__item">
                  <div className="counter">
                    <span className="cc">
                      <span>04</span>
                    </span>
                  </div>
                  <div className="meta">
                    <p>August 09, 2022 / MetaVerse / 4 Comments</p>
                  </div>
                  <div className="title">
                    <h3>
                      <Link href="/blog-single">
                        <span>Land Redemption Day is coming!</span>
                      </Link>
                    </h3>
                  </div>
                  <div className="image">
                    <Link href="/blog-single">
                      <span>
                        <img src="/img/blog/4.jpg" alt="" />
                      </span>
                    </Link>
                  </div>
                  <div className="read_more">
                    <Link href="/blog-single">
                      
                        <span>Read More</span>
                      
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="metaportal_fn_pagination">
            <ul>
              <li>
                <span>1</span>
              </li>
              <li>
                <a href="#">2</a>
              </li>
              <li>
                <a href="#">3</a>
              </li>
              <li>
                <span>...</span>
              </li>
              <li>
                <a href="#">77</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Blog;
