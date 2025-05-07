import HeroSlider from "../src/components/HeroSlider";
import FunFacts from "../src/components/FunFacts";
import About from "../src/components/About";
import Collection from "../src/components/Collection";
import Contact from "../src/components/Contact";
import Head from "next/head";
import News from "../src/components/News";
import RoadMapSlider from "../src/components/RoadMapStep";
import SectionDivider from "../src/components/SectionDivider";
import Layout from "../src/layout/Layout";
const Index = () => {
	return (
		<Layout>
			<Head>
				<title>Midnight 🌑🦧 Apes</title>
			</Head>
			<HeroSlider />

			<FunFacts />

			<About />

			<News />

			<Collection />

			<SectionDivider />

			<Contact />
		</Layout>
	);
};
export default Index;
