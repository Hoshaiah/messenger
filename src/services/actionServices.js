import Constants from "../constants"


export const logoutUser = async (auth) => {
    const resp = await fetch(`${Constants.server}logout`, {
        method: 'DELETE', // Specify the request method as POST
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        },
    })
    const data = await resp.json()
    return data
}
export const getUserChannels = async (auth) => {
    const resp = await fetch(`${Constants.server}channels`, {
        method: 'GET', // Specify the request method as POST
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        },
    })
    const data = await resp.json()
}