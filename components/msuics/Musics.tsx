import MusicList from "@/components/music/MusicList";

const Musics = ({ musics, query }: { musics: Music[]; query: string }) => {
  return (
    <MusicList
      musics={musics}
      playListId="musics-page-playlist"
    />
  );
};

export default Musics;
