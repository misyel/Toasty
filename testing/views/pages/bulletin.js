
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
        <h1 class='content-header'>bulletin board</h1>
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
    after_render : async() => {}
}

export {Bulletin}