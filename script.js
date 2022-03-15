const elementById = (id) => {
  return document.getElementById(id);
};

const handleSearch = () => {
  const keyword = elementById('keyword');
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtists(data));

  const albumContainer = elementById('albums');
  albumContainer.innerHTML = '';
  const artistContainer = elementById('artists');
  artistContainer.innerHTML = '';
  keyword.value = '';
};

const showArtists = (data) => {
  const artistContainer = elementById('artists');
  // console.log(artistContainer);
  data?.artists?.forEach((artist) => {
    const div = document.createElement('div');
    div.classList.add('artist-card');
    div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${
          artist?.strArtistThumb
            ? artist?.strArtistThumb
            : 'https://img.etimg.com/thumb/msid-71477539,width-650,imgsize-622277,,resizemode-4,quality-100/music_thinkstockphotos.jpg'
        }"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist?.strArtist ? artist?.strArtist : 'No artist name'}</h1>
    <p>Country: ${artist?.strCountry ? artist?.strCountry : 'No country'}</p>
    <p>Style: ${artist?.strGenre ? artist?.strGenre : 'Not defined'}</p>
  </div>
  <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${
      artist?.idArtist
    }')" class="button-title">Albums</p>
  </button>`;
    artistContainer.appendChild(div);
  });
};

const fetchAlbums = (id) => {
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data.album));
  const artistContainer = elementById('artists');
  artistContainer.innerHTML = '';
};

const showAlbum = (albums) => {
  const albumContainer = elementById('albums');
  albums?.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('album');
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${
              item?.strAlbumThumb
                ? item?.strAlbumThumb
                : 'https://yt3.ggpht.com/SOAbQtYIXasvkvpujeZ58m8GyuzQYdfHc4ypYA3Qq8awR2CpfuZE8-TKMjYWlWpRYF7sTZUjwQ=s900-c-k-c0x00ffffff-no-rj'
            }"
            alt="${item?.strAlbum}"
          />
        </div>
        <div class="album-name">
          <h3>${item?.strAlbum ? item?.strAlbum : 'No album name'}</h3>
        </div>
      `;

    albumContainer.appendChild(div);
  });
};
