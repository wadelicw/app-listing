const appListing = (props) => {

	const pictureUrl = props.icon;

	return (
		<div className="app-listing">

			<div className="app-listing__number">
				<p>{props.number}</p>
			</div>

			<div className="app-listing__photo">
				<img src={pictureUrl}></img>
			</div>

			<ul>
				<li> {props.appName}</li>
				<li> {props.genre}</li>
				<li> star rating </li>
			</ul>
		</div>
	)
}

export default appListing
