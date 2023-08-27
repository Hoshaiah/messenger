import Constants from "../constants"


export const logoutUser = async (auth) => {
    const resp = await fetch(`${Constants.server}logout`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        },
    })
    const data = await resp.json()
    return data
}

export const retrieveMessages = async (auth, recipient_type, sender_id) => {
    const resp = await fetch(`${Constants.server}messages?recipient_type=${recipient_type}&sender_id=${sender_id}`, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization': auth
        },
        // body: JSON.stringify({
        //     recipient_type,
        //     sender_id,
        // })
    })
    const data = await resp.json()
    return data
}

export const sendMessage = async (auth, recipient_type, recipient_id, textbody) => {
    const resp = await fetch(`${Constants.server}messages`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization': auth
        },
        body: JSON.stringify({
            recipient_type: recipient_type,
            recipient_id: recipient_id,
            body: textbody,
        })
    })
    const data = await resp.json()
    return data
}

export const retrieveFriends = async (auth) => {
    const resp = await fetch(`${Constants.server}friendships`, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization': auth
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