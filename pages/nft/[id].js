import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Layout from "../../src/layout/Layout";
import { getNfts, getSingleNft } from "../../src/redux/actions/nfts";

const Nft = ({ getSingleNft, nft, getNfts, nfts }) => {
  const router = useRouter();
  const { id } = router.query;
  const [similarItem, setSimilarItem] = useState([]);
  const [base64Images, setBase64Images] = useState({});
  
  const proxyEnabled = process.env.NEXT_PUBLIC_PROXY_STATUS === 'on';

  useEffect(() => {
    getSingleNft(id);
    getNfts();
  }, [id]);

  useEffect(() => {
    if (nft && nft.image) {
      fetchAndConvertToBase64(nft.image, id);
    }
  }, [nft, id]);

  const fetchAndConvertToBase64 = async (imageUrl, id) => {
    const fetchUrl = proxyEnabled ? `/api/proxy?url=${encodeURIComponent(imageUrl)}` : imageUrl;
    const response = await fetch(fetchUrl);
    const blob = await response.blob();
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64Images(prevState => ({ ...prevState, [id]: reader.result }));
    };
    reader.onerror = (error) => {
      // console.error('Error converting image to base64:', error);
    };
    reader.readAsDataURL(blob);
  };

  const [showFormattedText, setShowFormattedText] = useState(true);
  const handleToggle = () => {
    setShowFormattedText(!showFormattedText);
  };

  const song = nft ? nft.attributes.find(attr => attr.trait_type === 'Lore Poem') : '';
  const formattedText = song ? song.value.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  )) : "";

  const emojiSong = nft ? nft.attributes.find(attr => attr.trait_type === 'Emoji Song') : '';
  const formattedEmojiSong = emojiSong ? emojiSong.value.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  )) : "";

  const apeType = nft ? nft.attributes.find(attr => attr.trait_type === 'Ape Type') : '';
  const artComment = nft ? nft.attributes.find(attr => attr.trait_type === 'Art Comment') : '';
  const artScore = nft ? nft.attributes.find(attr => attr.trait_type === 'Art Score') : '';
  const colorsComment = nft ? nft.attributes.find(attr => attr.trait_type === 'Colors Comment') : '';
  const colorsScore = nft ? nft.attributes.find(attr => attr.trait_type === 'Colors Score') : '';
  const combinedSubject = nft ? nft.attributes.find(attr => attr.trait_type === 'Combined Subject') : '';
  const compositionComment = nft ? nft.attributes.find(attr => attr.trait_type === 'Composition Comment') : '';
  const compositionScore = nft ? nft.attributes.find(attr => attr.trait_type === 'Composition Score') : '';
  const daytime = nft ? nft.attributes.find(attr => attr.trait_type === 'Daytime') : '';
  const emotions = nft ? nft.attributes.find(attr => attr.trait_type === 'Emotions') : '';
  const funComment = nft ? nft.attributes.find(attr => attr.trait_type === 'Fun Comment') : '';
  const funScore = nft ? nft.attributes.find(attr => attr.trait_type === 'Fun Score') : '';
  const location = nft ? nft.attributes.find(attr => attr.trait_type === 'Location') : '';
  const multiplier = nft ? nft.attributes.find(attr => attr.trait_type === 'Multiplier') : '';
  const objectTrait = nft ? nft.attributes.find(attr => attr.trait_type === 'Object') : '';
  const observation = nft ? nft.attributes.find(attr => attr.trait_type === 'Observation') : '';
  const profession = nft ? nft.attributes.find(attr => attr.trait_type === 'Profession') : '';
  const rarity = nft ? nft.attributes.find(attr => attr.trait_type === 'Rarity') : '';

  return (
    <Layout pageTitle={"NFT"}>
      <div className="metaportal_fn_mintpage">
        <div className="container small">
          {/* Mint Top */}
          <div className="metaportal_fn_mint_top">
            <div className="mint_left">
              <div className="img">
                <div
                  className="img_in"
                  style={{ backgroundImage: `url(${base64Images[id] || ''})` }}
                >
                  <img src={base64Images[id] || ''} alt="" />
                </div>
              </div>
            </div>
            <div className="mint_right">
              <div className="metaportal_fn_share">
                <h5 className="label">Share:</h5>
                <ul>
                  <li>
                    <a href="#">
                      <img
                        src="/svg/social/twitter-1.svg"
                        alt=""
                        className="fn__svg"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="/svg/social/facebook-1.svg"
                        alt=""
                        className="fn__svg"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="/svg/social/instagram-1.svg"
                        alt=""
                        className="fn__svg"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="/svg/social/pinterest-1.svg"
                        alt=""
                        className="fn__svg"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="/svg/social/behance-1.svg"
                        alt=""
                        className="fn__svg"
                      />
                    </a>
                  </li>
                </ul>
              </div>
              <br></br>
              <h3
                className="fn__maintitle"
                data-text={nft && nft.name}
                data-align="left"
              >
                {nft && nft.name}
              </h3>
              <div className="desc" onClick={handleToggle} style={{ cursor: 'pointer' }}>
                <p>
                  {showFormattedText ? formattedText : formattedEmojiSong}
                </p>
              </div>
            </div>
          </div>
          {observation && observation.value && (
            <div className="metaportal_fn_mintobservation">
              <h4 className="parent_category">Observation</h4>
              <p>
                {observation.value}
              </p>
            </div>
          )}
          <div className="metaportal_fn_nft_cats">
            <ul>
              {apeType && apeType.value && (
                <li>
                  <div className="item">
                    <h4 className="parent_category">Ape Type</h4>
                    <h3 className="child_category" title={apeType.value}>
                      {apeType.value}
                    </h3>
                  </div>
                </li>
              )}
              {artComment && artComment.value && (
                <li>
                  <div className="item">
                    <h4 className="parent_category">Art Comment</h4>
                    <h3 className="child_category" title={artComment.value}>
                      {artComment.value}
                    </h3>
                  </div>
                </li>
              )}
              {artScore && artScore.value && (
                <li>
                  <div className="item">
                    <h4 className="parent_category">Art Score</h4>
                    <h3 className="child_category" title={artScore.value}>
                      {artScore.value}
                    </h3>
                  </div>
                </li>
              )}
              {colorsComment && colorsComment.value && (
                <li>
                  <div className="item">
                    <h4 className="parent_category">Colors Comment</h4>
                    <h3 className="child_category" title={colorsComment.value}>
                      {colorsComment.value}
                    </h3>
                  </div>
                </li>
              )}
              {colorsScore && colorsScore.value && (
                <li>
                  <div className="item">
                    <h4 className="parent_category">Colors Score</h4>
                    <h3 className="child_category" title={colorsScore.value}>
                      {colorsScore.value}
                    </h3>
                  </div>
                </li>
              )}
              {combinedSubject && combinedSubject.value && (
                <li>
                  <div className="item">
                    <h4 className="parent_category">Combined Subject</h4>
                    <h3 className="child_category" title={combinedSubject.value}>
                      {combinedSubject.value}
                    </h3>
                  </div>
                </li>
              )}
              {compositionComment && compositionComment.value && (
                <li>
                  <div className="item">
                    <h4 className="parent_category">Composition Comment</h4>
                    <h3 className="child_category" title={compositionComment.value}>
                      {compositionComment.value}
                    </h3>
                  </div>
                </li>
              )}
              {compositionScore && compositionScore.value && (
                <li>
                  <div className="item">
                    <h4 className="parent_category">Composition Score</h4>
                    <h3 className="child_category" title={compositionScore.value}>
                      {compositionScore.value}
                    </h3>
                  </div>
                </li>
              )}
              {daytime && daytime.value && (
                <li>
                  <div className="item">
                    <h4 className="parent_category">Daytime</h4>
                    <h3 className="child_category" title={daytime.value}>
                      {daytime.value}
                    </h3>
                  </div>
                </li>
              )}
              {emotions && emotions.value && (
                <li>
                  <div className="item">
                    <h4 className="parent_category">Emotions</h4>
                    <h3 className="child_category" title={emotions.value}>
                      {emotions.value}
                    </h3>
                  </div>
                </li>
              )}
              {funComment && funComment.value && (
                <li>
                  <div className="item">
                    <h4 className="parent_category">Fun Comment</h4>
                    <h3 className="child_category" title={funComment.value}>
                      {funComment.value}
                    </h3>
                  </div>
                </li>
              )}
              {funScore && funScore.value && (
                <li>
                  <div className="item">
                    <h4 className="parent_category">Fun Score</h4>
                    <h3 className="child_category" title={funScore.value}>
                      {funScore.value}
                    </h3>
                  </div>
                </li>
              )}
              {location && location.value && (
                <li>
                  <div className="item">
                    <h4 className="parent_category">Location</h4>
                    <h3 className="child_category" title={location.value}>
                      {location.value}
                    </h3>
                  </div>
                </li>
              )}
              {multiplier && multiplier.value && (
                <li>
                  <div className="item">
                    <h4 className="parent_category">Multiplier</h4>
                    <h3 className="child_category" title={multiplier.value}>
                      {multiplier.value}
                    </h3>
                  </div>
                </li>
              )}
              {objectTrait && objectTrait.value && (
                <li>
                  <div className="item">
                    <h4 className="parent_category">Object</h4>
                    <h3 className="child_category" title={objectTrait.value}>
                      {objectTrait.value}
                    </h3>
                  </div>
                </li>
              )}
              {profession && profession.value && (
                <li>
                  <div className="item">
                    <h4 className="parent_category">Profession</h4>
                    <h3 className="child_category" title={profession.value}>
                      {profession.value}
                    </h3>
                  </div>
                </li>
              )}
              {rarity && rarity.value && (
                <li>
                  <div className="item">
                    <h4 className="parent_category">Rarity</h4>
                    <h3 className="child_category" title={rarity.value}>
                      {rarity.value}
                    </h3>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  nft: state.nfts.nft,
  nfts: state.nfts.data,
});

export default connect(mapStateToProps, { getSingleNft, getNfts })(Nft);
