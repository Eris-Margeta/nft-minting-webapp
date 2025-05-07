import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Layout from "../../src/layout/Layout";
import { getNfts, getSingleNft } from "../../src/redux/actions/nfts";
import { PublicKey } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";
import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import fetchRetry from "fetch-retry";

const umi = createUmi(
	"https://laetitia-x7w82e-fast-devnet.helius-rpc.com/"
).use(dasApi());

const Nft = ({ getSingleNft, nft, getNfts, nfts }) => {
	const router = useRouter();
	const { tx } = router.query;
	const [similarItem, setSimilarItem] = useState([]);
	const { connection } = useConnection();
	const [base64Images, setBase64Images] = useState({});
	const [songtext, setSongtext] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [name, setName] = useState("");

	const [apeType, setApeType] = useState("");
	const [artComment, setArtComment] = useState("");
	const [artScore, setArtScore] = useState("");
	const [colorsComment, setColorsComment] = useState("");
	const [colorsScore, setColorsScore] = useState("");
	const [combinedSubject, setCombinedSubject] = useState("");
	const [compositionComment, setCompositionComment] = useState("");
	const [compositionScore, setCompositionScore] = useState("");
	const [daytime, setDaytime] = useState("");
	const [emotions, setEmotions] = useState("");
	const [funComment, setFunComment] = useState("");
	const [funScore, setFunScore] = useState("");
	const [location, setLocation] = useState("");
	const [multiplier, setMultiplier] = useState("");
	const [objectTrait, setObjectTrait] = useState("");
	const [observation, setObservation] = useState("");
	const [profession, setProfession] = useState("");
	const [rarity, setRarity] = useState("");

	const proxyEnabled = process.env.NEXT_PUBLIC_PROXY_STATUS === 'on';

	useEffect(() => {
		getMetadata(tx);
	}, [tx]);

	const getMetadata = async (mintAddress) => {
		try {
			if (!mintAddress) {
				return;
			}

			const mint = new PublicKey(mintAddress);
			const asset = await umi.rpc.getAsset(mint);
			const fetchUrl = proxyEnabled ? `/api/proxy?url=${encodeURIComponent(asset.mint_extensions.metadata.uri)}` : asset.mint_extensions.metadata.uri;

			const response = await fetchRetry(fetch)(
				fetchUrl,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
					retryOn: [429],
					retryDelay: 2000,
					retries: 10,
				}
			);
			const result = await response.json();

			const imageUrl = proxyEnabled ? `/api/proxy?url=${encodeURIComponent(result.image)}` : result.image;
			const base64Image = await fetchAndConvertToBase64(imageUrl);
			setBase64Images((prevState) => ({
				...prevState,
				[mintAddress]: base64Image,
			}));
			setImageUrl(base64Image);
			setName(result.name);

			const song = result.attributes.find(
				(attr) => attr.trait_type === "Lore Poem"
			);
			const formattedSong = song.value
				? song.value.split("\n").map((line, index) => (
						<span key={index}>
							{line}
							<br />
						</span>
				  ))
				: "";

			setSongtext(formattedSong);

			setApeType(
				result.attributes.find((attr) => attr.trait_type === "Ape Type")
			);
			setArtComment(
				result.attributes.find((attr) => attr.trait_type === "Art Comment")
			);
			setArtScore(
				result.attributes.find((attr) => attr.trait_type === "Art Score")
			);
			setColorsComment(
				result.attributes.find((attr) => attr.trait_type === "Colors Comment")
			);
			setColorsScore(
				result.attributes.find((attr) => attr.trait_type === "Colors Score")
			);
			setCombinedSubject(
				result.attributes.find((attr) => attr.trait_type === "Combined Subject")
			);
			setCompositionComment(
				result.attributes.find(
					(attr) => attr.trait_type === "Composition Comment"
				)
			);
			setCompositionScore(
				result.attributes.find(
					(attr) => attr.trait_type === "Composition Score"
				)
			);
			setDaytime(
				result.attributes.find((attr) => attr.trait_type === "Daytime")
			);
			setEmotions(
				result.attributes.find((attr) => attr.trait_type === "Emotions")
			);
			setFunComment(
				result.attributes.find((attr) => attr.trait_type === "Fun Comment")
			);
			setFunScore(
				result.attributes.find((attr) => attr.trait_type === "Fun Score")
			);
			setLocation(
				result.attributes.find((attr) => attr.trait_type === "Location")
			);
			setMultiplier(
				result.attributes.find((attr) => attr.trait_type === "Multiplier")
			);
			setObjectTrait(
				result.attributes.find((attr) => attr.trait_type === "Object")
			);
			setObservation(
				result.attributes.find((attr) => attr.trait_type === "Observation")
			);
			setProfession(
				result.attributes.find((attr) => attr.trait_type === "Profession")
			);
			setRarity(result.attributes.find((attr) => attr.trait_type === "Rarity"));
		} catch (error) {
			// console.error("Error fetching NFT metadata:", error);
		}
	};

	const fetchAndConvertToBase64 = async (imageUrl) => {
		const response = await fetch(imageUrl);
		const blob = await response.blob();
		const reader = new FileReader();

		return new Promise((resolve, reject) => {
			reader.onloadend = () => {
				resolve(reader.result);
			};
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
	};

	const [showFormattedText, setShowFormattedText] = useState(true);
	const handleToggle = () => {
		setShowFormattedText(!showFormattedText);
	};

	const song = nft
		? nft.attributes.find((attr) => attr.trait_type === "Lore Poem")
		: "";
	const formattedText = song.value
		? song.value.split("\n").map((line, index) => (
				<span key={index}>
					{line}
					<br />
				</span>
		  ))
		: "";

	const emojiSong = nft
		? nft.attributes.find((attr) => attr.trait_type === "Emoji Song")
		: "";
	const formattedEmojiSong = emojiSong.value
		? emojiSong.value.split("\n").map((line, index) => (
				<span key={index}>
					{line}
					<br />
				</span>
		  ))
		: "";

	const [displayTypewriter, setDisplayTypewriter] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [typedElements, setTypedElements] = useState([]);

	useEffect(() => {
		if (currentIndex < songtext.length) {
			const timer = setTimeout(() => {
				setTypedElements((prev) => [...prev, songtext[currentIndex]]);
				setCurrentIndex(currentIndex + 1);
				if (currentIndex + 1 >= songtext.length) {
					// console.log("finished");
					setTimeout(() => {
						setDisplayTypewriter(false);
					}, 1000);
				}
			}, 1200);
			return () => {
				clearTimeout(timer);
			};
		}
	}, [currentIndex, songtext]);

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
									style={{ backgroundImage: `url(${imageUrl})` }}
								>
									<img src={imageUrl} alt="" />
								</div>
							</div>
						</div>
						<div className="mint_right">
							{!displayTypewriter && (
								<h3
									className="fn__maintitle"
									data-text={name}
									data-align="left"
								>
									{name}
								</h3>
							)}
							<div
								className="desc"
								onClick={handleToggle}
								style={{ cursor: "pointer" }}
							>
								<p>
									{showFormattedText
										? typedElements.map((element, index) => (
												<span key={index}>{element}</span>
										  ))
										: formattedEmojiSong}
								</p>
							</div>
						</div>
					</div>
					{!displayTypewriter && observation && observation.value && (
						<div className="metaportal_fn_mintobservation">
							<h4 className="parent_category">Observation</h4>
							<p>{observation.value}</p>
						</div>
					)}
					{!displayTypewriter && (
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
											<h3
												className="child_category"
												title={colorsComment.value}
											>
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
											<h3
												className="child_category"
												title={combinedSubject.value}
											>
												{combinedSubject.value}
											</h3>
										</div>
									</li>
								)}
								{compositionComment && compositionComment.value && (
									<li>
										<div className="item">
											<h4 className="parent_category">Composition Comment</h4>
											<h3
												className="child_category"
												title={compositionComment.value}
											>
												{compositionComment.value}
											</h3>
										</div>
									</li>
								)}
								{compositionScore && compositionScore.value && (
									<li>
										<div className="item">
											<h4 className="parent_category">Composition Score</h4>
											<h3
												className="child_category"
												title={compositionScore.value}
											>
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
					)}
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
