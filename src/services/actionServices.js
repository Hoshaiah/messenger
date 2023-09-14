import Constants from "../constants"

export const loginUser = async(email, password) => {
    const resp = await fetch(`${Constants.server}login`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(
        // {name: 'sample2'}
        { 
            user: { 
                email: email,
                password: password
            }
        })})
        if(resp.status >=200 && resp.status <= 300) {
            const data = await resp.json()
            return data
        } else {
            return resp
        }
}

export const signupUser = async(name, email, password) => {
    const resp = await fetch(`${Constants.server}signup`, {
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(
        {
            user: { 
                email: email,
                password: password,
                name: name,
            }
        })})
        if(resp.status >=200 && resp.status <= 300) {
            const data = await resp.json()
            return data
        } else {
            return resp
        }
}

export const logoutUser = async (auth) => {
    const resp = await fetch(`${Constants.server}logout`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        },
    })

    if(resp.status >=200 && resp.status <= 300) {
        const data = await resp.json()
        return data
    } else {
        return resp
    }
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
    if(resp.status >=200 && resp.status <= 300) {
        const data = await resp.json()
        data.status = resp.status
        return data
    } else {
        return resp
    }
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
    if(resp.status >=200 && resp.status <= 300) {
        const data = await resp.json()
        data.status = resp.status
        return data
    } else {
        return resp
    }
}

export const retrieveFriends = async (auth) => {
    const resp = await fetch(`${Constants.server}friendships`, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization': auth
        },
    })
    if(resp.status >=200 && resp.status <= 300) {
        const data = await resp.json()
        data.status = resp.status
        return data
    } else {
        return resp
    }
}

export const retrieveFriendrequests = async (auth, friend_id) => {
    const resp = await fetch(`${Constants.server}friendrequests?friendrequests[friend_id]=${friend_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
        },
    })
    if(resp.status >= 200 && resp.status <= 300) {
        const data = await resp.json()
        data.status = resp.status
        return data
    } else {
        return resp
    }
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