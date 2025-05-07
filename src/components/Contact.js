const Contact = () => {
  return (
    <section id="contact">
      <div className="container px-6 ">
        <h3
          className="fn__maintitle big"
          data-text="Contact Us"
          data-align="center"
        >
          Contact Us
        </h3>
        <div className="fn_cs_contact_info">
          <ul>
            <li>
              <div className="item">
                <p>
                  If you have any questions, please feel free to contact us.
                </p>
                <p>
                  If you have issues with your nft, please send a solscan link to our discord support channel or email.
                </p>
              </div>
            </li>
            <li>
              <div className="item">
                <h4 className="label">Discord</h4>
                <h3>
                  <a href="https://discord.gg/midnightapes">Join Us</a>
                </h3>
                <h4 className="lable">Email</h4>
                <h4>
                  <a href="mailto:greetings@midnightapes.com">
                    greetings@midnightapes.com
                  </a>
                </h4>
              </div>
            </li>
            <li>
              <div className="item">
                <h4 className="label">Twitter</h4>
                <h3>
                  <a href="https://x.com/MidnightApes">@MidnightApes</a>
                </h3>
                <h4 className="lable">Telegram</h4>
                <h4>
                  <a href="https://t.me/FukiyuSolana">
                  &rarr; Main Chat
                  </a>
                </h4>
              </div>
            </li>
          </ul>
        </div>
      
      </div>
    </section>
  );
};
export default Contact;
