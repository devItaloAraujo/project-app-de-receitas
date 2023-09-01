import './ShareFavButton.css';

type Props = {
  src: string;
  alt: 'share' | 'favorite';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  moreClasses?: string,
  type?: 'button' | 'submit',
  disabled?: boolean,
};

function ShareFavButton({ src,
  alt,
  type = 'button',
  moreClasses = '',
  disabled = false,
  onClick = () => {} }: Props) {
  return (
    <button
      className={ `button ${moreClasses}` }
      type={ type }
      onClick={ onClick }
      disabled={ disabled }
    >
      <img
        src={ src }
        alt={ alt }
        data-testid={ `${alt}-btn` }
        className="button-favorite-img"
      />
    </button>
  );
}

export default ShareFavButton;
