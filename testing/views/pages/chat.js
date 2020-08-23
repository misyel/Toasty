
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

            ${ chat.chats.map(chat => 
                /*html*/`
                <div class='container2'>
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
            <form id='chatForm' class='inputForm'>
                <fieldset>
                    <input name='message' type='text' placeholder='enter a message' required=true>
                    <button type='submit' id='messageSubmit'> submit </button>
                </fieldset>
            </form>
        `
        return view
    },
    after_render : async() => {
        const message = document.getElementById('messageSubmit');
        message.addEventListener('click', async(e) => {
            e.preventDefault();
            const form = document.getElementById('chatForm')
            const message = form.message;


            const body = {}
            body.message = message.value;

            const response = await fetch('https://enigmatic-waters-10084.herokuapp.com/chat/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            })
            const data = await response.json();
            console.log(data);
            const status = await response.status;
            if(status == 400){
                console.log('error')
            }

            location.reload();
        })
    }
}

export {Chat}