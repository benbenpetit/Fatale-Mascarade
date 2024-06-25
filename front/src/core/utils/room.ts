export const getRandomCode = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyz'
  let code = ''
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    code += characters[randomIndex]
  }
  return code
}

export const getIsRoom = async (roomId: string) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_SERVER_URL ?? ''
    }/api/getIsRoom/${roomId.toLowerCase()}`,
    {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    }
  ).then((res) => res.json())

  return res?.isRoom
}
