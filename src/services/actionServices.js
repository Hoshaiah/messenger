import Constants from "../constants"


export const getUserChannels = async (auth) => {
    const resp = await fetch(`${Constants.server}channels`, {
        method: 'GET', // Specify the request method as POST
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        },
    })
    const data = await resp.json()
    console.log(data)
}