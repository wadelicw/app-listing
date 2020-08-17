// From node_modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import HorizontalScroll from "react-scroll-horizontal";
// From Components
import InputBar from "components/inputBar/inputBar.js";
import AppListing from "components/appListing/appListing.js";
import AppsRecommend from "components/appsRecommend/appsRecommend.js";
// From css
import styles from "../styles/Home.module.css";

export default function Home() {

	const [hasError, setHasError] = useState(false);

	const [appsData, setAppsData] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const [appsRecommend, setAppsRecommend] = useState({});
	const [isLoadingRecommend, setIsLoadingRecommend] = useState(false);


	useEffect(() => {
		const targetUrl = "https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-free/all/10/explicit.json ";
		/*
		Top 100:
		const targetUrl = "https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-free/all/100/explicit.json"
		*/

		axios(targetUrl)

			.then(res => setAppsData(res.data))
			.then(() => setIsLoading(true))
			.catch((err) => setHasError(true));

	}, [])

	useEffect(() => {
		const targetUrl = "https://rss.itunes.apple.com/api/v1/hk/ios-apps/top-grossing/all/10/explicit.json";

		axios(targetUrl)
			.then(res => setAppsRecommend(res.data))
			.then(() => setIsLoadingRecommend(true))
			.catch((err) => setHasError(true));

	}, [])


	// useEffect( () => {  

	//    const sendGetRequest = async () => {
	//       try {
	//             const reviewUrl = "https://itunes.apple.com/hk/lookup?id=1480196084"
	//             const resp = await axios.get(reviewUrl);
	//             console.log(resp);
	//             setAppsRating(resp.data);
	//             console.log(appsRating);
	//       } catch (err) {
	//             // Handle Error Here
	//             console.error(err);
	//       }
	//    };

	//    sendGetRequest();
	// }, [])





	let appsArray = [];
	if (isLoading) {
		appsArray = ["Top Apps"];
		let toggle = true;
		for (var i = 0; i < 10; i++) {

			appsArray.push(
				<AppListing
					key={i}
					appName={appsData.feed.results[i].name}
					number={i + 1}
					icon={appsData.feed.results[i].artworkUrl100}
					genre={appsData.feed.results[i].genres[0].name}
					toggle={toggle}
				/>
			)

			toggle = !toggle;

		}
	}


	let recommendArray = [];
	if (isLoadingRecommend) {
		for (i = 0; i < 10; i++) {
			recommendArray.push(
				<AppsRecommend
					key={i}
					appName={appsRecommend.feed.results[i].name}
					number={i + 1}
					icon={appsRecommend.feed.results[i].artworkUrl100}
					genre={appsRecommend.feed.results[i].genres[0].name}
				/>
			)
		}
	}


	return (
		<div className={styles.container}>
			<Head>
				<title>App Listing</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>

				<div >
					<InputBar className={styles.input}></InputBar>
				</div>


				<div>
					<p className={styles.title}>推介</p>

					<div className={styles.recommendBox}>
						{isLoadingRecommend ? (console.log(appsRecommend)) : <div>Loading.</div>}
						<HorizontalScroll>
							{recommendArray}
						</HorizontalScroll>

					</div>


				</div>



				<div>
					{hasError ? <div>Error occured.</div> : null}
					{isLoading ? (console.log(appsData)) : <div>Loading.</div>}
					{appsArray}

				</div>



			</main>


		</div>
	)
}
