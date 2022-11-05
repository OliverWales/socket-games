export const CODE_LENGTH = 5;
export const CODE_REGEX = `^[A-Za-z]{${CODE_LENGTH}}$`;

export const generateNewRoomId = () => {
  let id = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charactersLength = characters.length;

  for (let i = 0; i < CODE_LENGTH; i++) {
    id += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return id;
};
