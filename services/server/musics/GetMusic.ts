const GetMusic = async (id: number): Promise<ServiceResponse<Music>> => {
  let status: number = 201;
  let error: string = "";
  let data: Music;

  const res = await fetch(`${process.env.NEXT_PUBLIC_MUSICS_API}/${id}`, {
    headers: {
      Accept: "*/*",
      Cookie:
        "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGY0NDg5MGZmYWFmMjBkMTUzMjM2OCIsImlhdCI6MTcxNjQ3MTIyOSwiZXhwIjoxNzE5MDYzMjI5fQ.Z78wLQJ8a8mB7yfXfKxK3XbsO0ZE92SF3LaEX_7mrTc",
    },
  });

  if (res.ok) {
    const museRes = await res.json();
    data = museRes.content;
  } else {
    status = res.status;
    error = res.statusText;
  }

  return {
    status,
    error,
    data,
  };
};

export default GetMusic;
