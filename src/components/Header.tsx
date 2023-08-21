type HeaderProps = {
  title: string,
  perfil: boolean,
  pesquisa: boolean,
};

function Header(props: HeaderProps) {
  const { title, perfil, pesquisa } = props;
  return (
    <>
      <h1 data-testid="page-title">{ title }</h1>
      { perfil
        && (
          <button>
            <img
              src="src/images/profileIcon.svg"
              alt="logo profile"
              data-testid="profile-top-btn"
            />
          </button> ) }
      { pesquisa
        && (
          <button>
            <img
              src="src/images/searchIcon.svg"
              alt="logo search"
              data-testid="search-top-btn"
            />
          </button> ) }
    </>
  );
}

export default Header;
