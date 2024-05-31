"use client";
import { CSSProperties, useState } from "react";
import { MessageArgsProps, message } from "antd";
import PutUserPlayList from "@/services/server/users/PutUserPlayList";
import GetUser from "@/services/server/users/GetUser";
import PutUser from "@/services/server/users/PutUser";

import GetMusic from "@/services/server/musics/GetMusic";
import { useAppStore } from "@/store/app-store";
import { useUserStore } from "@/store/user-store";

import Icon from "../ui/Icon";

const AddToPlayList = ({
  musicId,
  className,
  style,
}: {
  musicId: number;
  className?: string;
  style?: CSSProperties;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setFavorite, favorites] = useUserStore((state) => [
    state.userInfo,
    state.setFavorite,
    state.favorite,
  ]);
  const [setPlayListModal, setMusicClicked] = useAppStore((state) => [
    state.setPlayListModal,
    state.setMusicClicked,
  ]);
  const [messageApi, contextHolder] = message.useMessage();

  const addToPlayListClickHandler = async () => {
    const musicRes = await GetMusic(musicId);

    if (!userInfo) {
      messageApi.open({
        type: "error",
        content: "Sorry but, you have to login first...",
      });
    } else {
      setLoading(true);
      const userRes = await GetUser(userInfo.id);
      let user: User = userRes.data;
      const playlist = user.playLists[0];
      let musicData: Music = musicRes.data;
      playlist.musics.push(musicData);
      console.log(playlist);
      if (musicRes.data) {
        const userPlaylist = await PutUserPlayList(userInfo.id, playlist);
        const putUser = await PutUser(user);
      }

      setLoading(false);

      if (musicRes.data) {
        setMusicClicked(musicRes.data);
        setPlayListModal(true);
        return;
      }
    }

    messageApi.open({
      type: "error",
      content: musicRes.error,
    });
  };

  return (
    <>
      <button
        className={`btn ${className} ${loading ? "overlay-loading" : ""}`}
        style={{ ...style }}
        onClick={addToPlayListClickHandler}
      >
        <Icon icon="plus" />
      </button>
      {contextHolder}
    </>
  );
};

export default AddToPlayList;
