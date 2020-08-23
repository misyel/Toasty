
let getChat = async() => {
    console.log('getting chat')

    try{
        const response = await fetch('https://enigmatic-waters-10084.herokuapp.com/chat/chat', {
            method: 'GET',
            mode: 'cors'
        })

        const bulletins = await response.json();
        return bulletins

    } catch(err){
        console.log('error getting chats')
    }
}


let Chat = {
    render : async() => {
        let chat = await getChat();
        console.log(chat)
        let view = `
            <h1 class='content-header'>chat</h1>
            ${ chat.chats.map(chat => 
                /*html*/`
                <div class='container'>
                    <div class="arrow">
                        <div class="outer"></div>
                        <div class="inner"></div>
                    </div>
                    <div class="message-body">
                        <p>${chat.text}</p>
                    </div>
                </div>
                    `
                ).join('\n ')
            }
            <form class='inputForm'>
                <fieldset>
                    <label for='message'>message:</label>
                    <input name='message' type='text' required=true>
                </fieldset>
            </form>
        `
        return view
    },
    after_render : async() => {}
}

export {Chat}