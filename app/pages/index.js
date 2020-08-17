// From node_modules
import React from "react";
import Head from "next/head";
// From Components
import api from "api";
import InputBar from "../components/inputBar/inputBar.js";
import AppListing from "../components/appListing/appListing.js";
import AppsRecommend from "components/AppsRecommend";

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loaded: false, loading: true,
			error: false,
			free: { results: [] },
			grossing: { results: [] },
			input: ""
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

		let { loading, error, free, grossing, input } = this.state;

		if (input.trim() != "") {
			free = free.filter(item => {
				return (item?.name ?? "").includes(input);
			});
		}


		return (
			<div>
				<Head>
					<title>App Listing</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<main>
					<div>
						<InputBar></InputBar>
					</div>

					<div>
						<p>推介</p>
						<div>
							{
								loading && <div>Loading.</div>
							}
							<div>
								{
									grossing.results.map((app, index) => (
										<AppListing
											key={index}
											appName={app.name}
											number={index + 1}
											icon={app.artworkUrl100}
											genre={app.genres[0].name}
										/>
									))
								}
							</div>
						</div>
					</div>
					<div>
						{
							loading && <div> Loading ... </div>
						}
						{
							free.results.map((app, index) => (
								<AppsRecommend
									key={index}
									appName={app.name}
									number={index + 1}
									icon={app.artworkUrl100}
									genre={app.genres[0].name}
								/>
							))
						}
					</div>
				</main>
			</div>
		)
	}

}

export default Home;
