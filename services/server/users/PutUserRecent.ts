import GetUser from "./GetUser";
import PutUser from "./PutUser";

const PutUserRecent = async (
  userId: number,
  music: Music
): Promise<ServiceResponse<Music[]>> => {
  let status: number = 101;
  let error: string = "";
  let data: Music[];
  const userRes = await GetUser(userId);

  if (userRes.data) {
    const user = userRes.data;

    let recents = [music, ...user.recent];
    user.recent = recents;
    user.modificationDate = new Date().getTime();

    const res = await PutUser(user);

    if (res.data) {
      data = user.recent;
    } else {
      status = res.status;
      error = res.error;
    }
  } else {
    status = 404;
    error = "User NotFound.";
  }

  return {
    status,
    error,
    data,
  };
};

export default PutUserRecent;
