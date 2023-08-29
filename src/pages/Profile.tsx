import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

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
      <Header title="Profile" perfil pesquisa={ false } />
      <h3 data-testid="profile-email">{ email }</h3>
      <div>
        <button
          data-testid="profile-done-btn"
          onClick={ () => navigate('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          onClick={ () => navigate('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          onClick={ (event) => handleClear(event) }
        >
          Logout
        </button>
      </div>
      <Footer />
    </>

  );
}

export default Profile;
