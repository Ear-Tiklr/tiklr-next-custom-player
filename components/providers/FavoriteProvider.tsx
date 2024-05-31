"use client";
import React, { useState } from "react";
import { message } from "antd";

import { useUserStore } from "@/store/user-store";
import GetMusic from "@/services/server/musics/GetMusic";
import Icon from "@/components/ui/Icon";
import PutUserFavorite from "@/services/server/users/PutUserFavorite";

const FavoriteProvider = ({
  className,
  iconClass,
  musicId,
  activeClass,
}: {
  musicId: number;
  className?: string;
  iconClass?: string;
  activeClass?: string;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setFavorite, favorites] = useUserStore((state) => [
    state.userInfo,
    state.setFavorite,
    state.favorite,
  ]);

  // console.log(userInfo)

  const [messageApi, contextHolder] = message.useMessage();

  const current =
    favorites.length && favorites.findIndex((fav) => fav.id === musicId) >= 0;

  const favoriteButtonClickHandler = async () => {
    if (!userInfo) {
      messageApi.open({
        type: "error",
        content: "Sorry but, you have to login first...",
      });
    } else {
      console.log("userInfo-->", userInfo);

      setLoading(true);
      const { data } = await GetMusic(musicId);
      setLoading(false);
      console.log("data-->", data);
      if (data) {
        setFavorite(data);
        const fav = await PutUserFavorite(userInfo.id, data);
        console.log("fav-->", fav);
      }
    }
  };

  return (
    <>
      <button
        className={`btn ${className} ${
          loading ? "overlay-loading-secondary" : ""
        } ${current ? activeClass : ""}`}
        onClick={favoriteButtonClickHandler}
      >
        <Icon className={iconClass} icon={current ? "heart-fill" : "heart"} />
      </button>
      {contextHolder}
    </>
  );
};

export default FavoriteProvider;
