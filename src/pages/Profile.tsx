import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user') as string);
  return (
    <>
      <Header title="Profile" perfil pesquisa={ false } />
      <h3 data-testid="profile-email">{ email }</h3>
      <div>
        <button data-testid="profile-done-btn">Done Recipes</button>
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button data-testid="profile-logout-btn">Logout</button>
      </div>
      <Footer />
    </>

  );
}

export default Profile;
