const appsRecommend = props => {

	const iconUrl = props.icon;

	return (
		<div>
			<picture >
				<img src={iconUrl}></img>
			</picture>
			<ul>
				<li>{props.appName}</li>
				<li>{props.genre}</li>
			</ul>
		</div>
	);
}

export default appsRecommend
