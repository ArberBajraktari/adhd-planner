import { useNavigate } from 'react-router-dom';

function Main() {
const navigate = useNavigate();

const gotToSignUp = () => {

	// This will navigate to first component
	navigate('/sign_up');
};

return (
	<div className="App">
	<header className="App-header">
		<p>Main components</p>
		<button onClick={gotToSignUp}>go to 1st </button>
	</header>
	</div>
);
}

export default Main;
