import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Layout from "../src/layout/Layout";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import fetchRetry from "fetch-retry";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Balancer from "react-wrap-balancer";

const Collection = () => {
  const wallet = useWallet();
  const { setVisible } = useWalletModal();
  const network =
    process.env.NEXT_PUBLIC_NETWORK == "d"
      ? process.env.NEXT_PUBLIC_DEFAULT_RPC_DEVNET
      : process.env.NEXT_PUBLIC_DEFAULT_RPC_MAINNET;

  const umi = createUmi(network).use(dasApi());
  const [nfts, setNfts] = useState([]);
  const [base64Images, setBase64Images] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const alertRef = useRef(null);

  const proxyEnabled = process.env.NEXT_PUBLIC_PROXY_STATUS === 'on';
  const hideNftPreview = process.env.NEXT_PUBLIC_HIDE_NFT_PREVIEW === 'true';

  useEffect(() => {
    if (wallet.publicKey) {
      getNfts();
    }
  }, [wallet.publicKey]);

  const getNfts = async () => {
    const owner = wallet.publicKey;
    const proxyEnabled = process.env.NEXT_PUBLIC_PROXY_STATUS === 'on';

    try {
      const assets = await umi.rpc.searchAssets({ owner });

      const nftPromises = assets.items
        .filter((item) => item.mint_extensions?.metadata?.symbol === "midnight")
        .map(async (item) => {
          const { uri } = item.mint_extensions.metadata;

          const fetchUrl = proxyEnabled ? `/api/proxy?url=${encodeURIComponent(uri)}` : uri;

          const response = await fetchRetry(fetch)(fetchUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            retryOn: [429],
            retryDelay: 2000,
            retries: 10,
          });
          
          if (!response.ok) {
            throw new Error(`Failed to fetch NFT data: ${response.statusText}`);
          }

          const nftdata = await response.json();
          const imageUrl = proxyEnabled ? `/api/proxy?url=${encodeURIComponent(nftdata.image)}` : nftdata.image;
          const base64Image = await fetchAndConvertToBase64(imageUrl);
          setBase64Images(prevState => ({ ...prevState, [item.id]: base64Image }));

          return {
            id: item.id,
            uri: base64Image,
            name: nftdata.name,
          };
        });

      const nfts = await Promise.all(nftPromises);
      setNfts(nfts);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
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

  const handleNftClick = (e) => {
    if (hideNftPreview) {
      e.preventDefault();
      setShowAlert(true);
      alertRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Layout pageTitle={"My Midnight Apes"}>
      <div className="metaportal_fn_pagetitle">
        <div className="container small">
          <h3
            className="fn__maintitle big"
            data-text="MY MIDNIGHT APES"
            data-align="center"
          >
            <Balancer>
              MY MIDNIGHT APES
            </Balancer>
          </h3>
          <div ref={alertRef} className="text-red-500 text-medium mt-0 pb-4">
            NFT reveal is scheduled after mint completion. Please follow our official twitter @MidnightApes for that announcement.<br />
            You will be able to view your NFT extras in our interactive app after the mint. Return in a few days.
          </div>
          <div
            style={{
              textAlign: "center",
              margin: "0 auto",
              justifyContent: "center",
              maxWidth: "60vw",
              padding: "0 20px",
            }}
            className="info-text"
          >
            <p style={{ fontSize: "20px" }}>Did you know?</p>
            <Balancer>
              <p style={{ fontSize: "12px" }}>
                There are three rarity types and three different values NFTs. 
              </p>
              <p style={{ fontSize: "12px" }}>
               Some
                NFTs are worth 10x, some 100x, and there is a special surprise of
                INCREDIBLE value NFTs to be minted.
              </p>
              <br />
              <p style={{ fontSize: "12px" }}>
                You can swap your 🦧🌑 NFTs for $midnight tokens after the mint.
                To see how much tokens your NFT is worth, multiply the MULTIPLIER
                trait at the bottom of the page with 888. You can then trade those
                tokens on exchanges and the value of your NFTs will fluctuate with
                the market.
              </p>
              <p style={{ fontSize: "12px" }}>
                This is what we call liquid art, and this is what SPL404 standard
                enables us to do.
              </p>
            </Balancer>
          </div>
          
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "5%",
        }}
      >
        <Link href="/nft-mint">
          <a className="metaportal_fn_button wallet_opener walletbuttontop">
            <span className="no-wrap">
              {wallet.publicKey ? "💰 MINT MORE" : "💰 MINT"}
            </span>
          </a>
        </Link>
      </div>
      <div className="fn_cs_section_divider">
        <div className="divider">
          <span className="short" />
          <span className="long" />
          <span className="short" />
        </div>
      </div>

      {/* Collection Page */}
      <div className="metaportal_fn_collectionpage">
        <div className="container">
          <div className="metaportal_fn_collection">
            <div className="metaportal_fn_clist">
              <div className="metaportal_fn_result_list">
                {!wallet.publicKey && (
                  <div style={{ textAlign: "center", margin: "20px 0" }}>
                    <p>To see your collection, first connect your wallet</p>
                    <div
                      onClick={async () => {
                        setVisible(true);
                      }}
                      className="metaportal_fn_button wallet_opener walletbuttontop"
                      style={{ cursor: "pointer", display: "inline-block" }}
                    >
                      <span className="no-wrap">Connect Wallet</span>
                    </div>
                    
                  </div>
                  
                )}
                {wallet.publicKey && (
                  <>
                    <div className="metaportal_fn_drops">
                   
                      <ul className="grid">
                        {nfts &&
                          nfts.map((nft, i) => (
                            <li key={i}>
                              <div className="nft__item">
                                <div className="img_holder">
                                  <a href="#" onClick={handleNftClick}>
                                    <span>
                                      <img src={nft.uri} alt="" />
                                    </span>
                                  </a>
                                </div>
                                <div className="title_holder">
                                  <a href="#" onClick={handleNftClick}>
                                    <span>
                                      <h3 className="fn_title">{nft.name}</h3>
                                    </span>
                                  </a>
                                </div>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 600px) {
          .fn__maintitle.big {
            white-space: pre-line;
            text-align: center;
          }
          .info-text {
            max-width: 100%;
            padding: 0 20px;
          }
          .info-text p {
            font-size: 0.7rem;
          }
          .info-text p:first-child {
            font-size: 1rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Collection;
