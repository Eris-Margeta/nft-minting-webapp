import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
				<meta name="title" content="Midnight 🌑🦧 Apes" />
				<meta
					name="description"
					content="Liquid Art NFT Collection on Solana"
				/>

				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://midnightapes.com/" />
				<meta property="og:title" content="Midnight 🌑🦧 Apes" />
				<meta
					property="og:description"
					content="Liquid Art NFT Collection on Solana"
				/>
				<meta property="og:image" content="https://midnightapes.com/og-image.png" />

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://midnightapes.com/" />
				<meta property="twitter:title" content="Midnight 🌑🦧 Apes" />
				<meta
					property="twitter:description"
					content="Liquid Art NFT Collection on Solana"
				/>
				<meta property="twitter:image" content="https://midnightapes.com/og-image.png" />
				<meta property="twitter:site" content="@MidnightApes" />

				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>

				<link
					href="https://fonts.googleapis.com/css2?family=Jacquard+12&family=Libre+Barcode+128+Text&family=Rubik+Mono+One&family=Tiny5&display=swap"
					rel="stylesheet"
				/>

				<link rel="icon" type="image/png" href="/favicon.png" />
				<link
					type="text/css"
					rel="stylesheet"
					href="/css/plugins.css?ver=4.1"
				/>
				<link type="text/css" rel="stylesheet" href="/css/style.css?ver=4.1" />

				<script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-QK8RQHVXCZ"
				></script>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', 'G-QK8RQHVXCZ');
						`,
					}}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
							new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
							j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
							'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
							})(window,document,'script','dataLayer','GTM-PWSJX3PW');
						`,
					}}
				/>
			</Head>
			<body>
				<noscript>
					<iframe
						src="https://www.googletagmanager.com/ns.html?id=GTM-PWSJX3PW"
						height="0"
						width="0"
						style={{ display: "none", visibility: "hidden" }}
					></iframe>
				</noscript>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
