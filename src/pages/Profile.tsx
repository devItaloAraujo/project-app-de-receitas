import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Profile.css';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user') as string) !== null
   && JSON.parse(localStorage.getItem('user') as string);

  const navigate = useNavigate();
  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <Header title="PROFILE" perfil pesquisa={ false } />
      <div className="profile-options-container">
        <h3 data-testid="profile-email">{ email }</h3>
        <div className="profile-options-container">
          <button
            data-testid="profile-done-btn"
            onClick={ () => navigate('/done-recipes') }
          >
            <img src="src/images/doneRecipes.svg" alt="icon drinks" id="icon" />
            Done Recipes
          </button>
          <button
            data-testid="profile-favorite-btn"
            onClick={ () => navigate('/favorite-recipes') }
          >
            <img src="src/images/favoriteRecipes.svg" alt="icon drinks" id="icon" />
            Favorite Recipes
          </button>
          <button
            data-testid="profile-logout-btn"
            onClick={ (event) => handleClear(event) }
          >
            <img src="src/images/logout.svg" alt="icon drinks" id="icon" />
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </>

  );
}

export default Profile;
