// From node_modules
import React from "react";
import Head from "next/head";
import HorizontalScroll from "react-scroll-horizontal";
// From Components
import api from "api";
import InputBar from "../components/inputBar/inputBar.js";
import AppListing from "../components/appListing/appListing.js";
import AppsRecommend from "../components/appsRecommend/appsRecommend.js";
// From css
import styles from "../styles/Home.module.css";

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loaded: false, loading: true,
			error: false,
			free: [], grossing: []
		};
	}

	// shouldComponentUpdate(){}

	async componentDidMount() {
		try {
			const [freeApps, grossApps] = await Promise.all([
				api.getFreeApps(), api.getGrossingApps()
			]);
			this.setState({
				loaded: true, loading: false,
				error: false,
				free: freeApps, grossing: grossApps
			});
		} catch (error) {
			console.error(error);
			this.setState({ loading: false, error });
		}
	}

	// async componentDidUpdate(){
	// }

	// async componentWillUnmount(){
	// }

	render() {

		const { loading, error, free, grossing } = this.state;

		return (
			<div/>
		);

		// let appsArray = [];
		// if (loading) {
		// 	appsArray = ["Top Apps"];
		// 	for (var i = 0; i < 10; i++) {

		// 		appsArray.push(
		// 			<AppListing
		// 				key={i}
		// 				appName={appsData.feed.results[i].name}
		// 				number={i + 1}
		// 				icon={appsData.feed.results[i].artworkUrl100}
		// 				genre={appsData.feed.results[i].genres[0].name}
		// 			/>
		// 		);
		// 	}
		// }


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

}

export default Home;
