import './App.css';
import TagCloud from './TagCloud';

function App() {
	return (
		<div className='app'>
			<AppText />
			<TagCloud />
		</div>
	);
}

function AppText() {
	const tipStoryExploreLink = 'https://www.tipstory.org/explore';
	const tipStoryLearningLink =
		'https://www.tipstory.org/learning/3svQFkXVzgFTwyV';
	return (
		<p className='appText'>
			Hi there👋 This is the React component☁️ that is being used in the{' '}
			<a href={tipStoryExploreLink}>TipStory Explore Page</a> To learn more
			about how it is built, 💁‍♂️ check out{' '}
			<a href={tipStoryLearningLink}>my learning note on TipStory</a>😃
		</p>
	);
}

export default App;
