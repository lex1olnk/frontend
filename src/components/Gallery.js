import AliceCarousel from 'react-alice-carousel';

import 'react-alice-carousel/lib/alice-carousel.css';
import { ReactComponent as Star } from '../icons/ratingStar.svg';

const handleDragStart = e => e.preventDefault();

const hideText = (value, maxlimit) => {
  return value.length > maxlimit ? value.substring(0, maxlimit - 3) + '...' : value;
};

const GalleryItem = ({
  id,
  img = 'default.jpg',
  name,
  imgStyle,
  spanStyle = 'absolute bottom-1 left-2 text-center font-normal',
  isLine = true,
  rating = '5.00'
}) => {
  const linear =
    'linear-gradient(to bottom, transparent, rgba(0,0,0,0) 75%, rgba(0,0,0,0.85) 97%, rgba(0,0,0, 1) 100%), url(';
  const ratingStyle = 'absolute bottom-6 left-2 text-center font-normal flex flex-row';
  return (
    <a
      href={'/book/' + id}
      key={id}
      onDragStart={handleDragStart}
      role="presentation"
      style={{
        background: isLine
          ? `${linear}  ${process.env.REACT_APP_API_URL}/img/${img})`
          : `url(${process.env.REACT_APP_API_URL}/img/${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      className={imgStyle}>
      {isLine && (
        <div className="galleryItemLink">
          {rating ? (
            <div className={ratingStyle}>
              <Star className="my-auto mr-1" />
              {rating}
            </div>
          ) : null}
          {name ? <span className={spanStyle}>{hideText(name, 22)}</span> : null}
        </div>
      )}
    </a>
  );
};

function Gallery(props) {
  const { data } = props;
  const responsive = {
    360: { items: 2 },
    640: { items: 3 },
    800: { items: 4 },
    1024: { items: 5 },
    1280: { items: 7 }
  };

  const items = data.map(title => {
    return <GalleryItem id={title.id} img={title.img} name={title.name} imgStyle={'galleryItem'} />;
  });

  return (
    <div className="gallery">
      <AliceCarousel
        disableButtonsControls={true}
        disableDotsControls={true}
        paddingLeft={'0.25rem'}
        paddingRight={'0.25rem'}
        responsive={responsive}
        mouseTracking
        items={items}
      />
    </div>
  );
}

export { Gallery, GalleryItem };
