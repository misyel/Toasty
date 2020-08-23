
let getBulletin = async() => {
    console.log('getting bulletin')

    try{
        const response = await fetch('https://enigmatic-waters-10084.herokuapp.com/bulletin', {
            method: 'GET',
            mode: 'cors'
        })

        const bulletins = await response.json();
        return bulletins

    } catch(err){
        console.log('error getting bulletings')
    }
}


let Bulletin = {
    render : async() => {
        let bullets = await getBulletin();
        console.log(bullets)
        let view = `
        <div class='modal'>
            <form id="bulletinForm" class='modal-content'>
                <ul>
                    <li><label for="title">title</label>
                        <input id="title" type="text" name="title"></li>
                    <li><label for="message">message</label>
                        <input id="message" type="text" name="message"></li>
                    <li><button type='submit' id="bulletinSubmit">submit</button><button id="bulletinCancel">cancel</button></li>
                </ul>
            </form>
        </div>
        <div class='banner-container'>
            <img class='banner' src='../images/bulletin-board-banner-long.png'>
        </div>
        <div class='center-button'>
            <button class='modal-button' id='addBulletin'> add bulletin </button>
        </div>
        <ul id='bulletin'>
            ${ bullets.bulletins.map(bullet => 
                /*html*/`
                <li class='bulletin-list'>
                    <h2>${bullet.title}</h2>
                    <p>${bullet.message}</p>
                </li>`
                ).join('\n ')
            }
        </ul>
`
        return view
    },
    after_render : async() => {
        //form handling
        const modal = document.getElementById('addBulletin');
        const cancel = document.getElementById('bulletinCancel');
        var modals = document.querySelector('.modal');
        
        modal.addEventListener('click', () => {
            modals.style.display = 'block';
        })

        cancel.addEventListener('click', () => {
            modals.style.display = 'none';
        })


        //api stuff
        const bulletin = document.getElementById('bulletinSubmit');
        bulletin.addEventListener('click', async(e) => {
            e.preventDefault();
            const form = document.getElementById('bulletinForm')
            const title = form.title;
            const message = form.message;

            const body = {}
            body.title = title.value;
            body.message = message.value;

            console.log(body)

            const response = await fetch('https://enigmatic-waters-10084.herokuapp.com/bulletin/new-note', {
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

export {Bulletin}