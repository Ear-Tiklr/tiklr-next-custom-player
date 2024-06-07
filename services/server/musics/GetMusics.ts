// Adjust the import path according to your project structure

const GetMusics = async (
  query: string = "",
  type: string = ""
): Promise<Music[]> => {
  let url = process.env.NEXT_PUBLIC_MUSICS_API as string;
  if (query && query != "") {
    url += "?query=" + query;
  }

  if (type && (type == "generate" || type == "genre8")) {
    let genUrl = process.env.NEXT_PUBLIC_FLASK_BACKEND as string;
    console.log("genUrl", genUrl);
    let payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompts: [query],
        modelName: "",
      }),
    };
    console.log(payload);
    const genRes = await fetch(`${genUrl}?duration=5`, payload);

    console.log(genRes);

    if (!genRes.ok) {
      throw new Error("Failed to generate music");
    }
    console.log(genRes);

    const genData = await genRes.json();
    return genData.content;
  }
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch musics");
  }
  const musicRes = await res.json();
  const data: Music[] = musicRes.content;
  return data;
};

export default GetMusics;
