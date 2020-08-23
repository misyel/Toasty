
let getSummaries = async() => {
    console.log('getting bookbag')
    const response = await fetch('https://enigmatic-waters-10084.herokuapp.com/bookBag', {
        method: 'GET',
        mode: 'cors'
    })

    const summaries = await response.json();

    return summaries;
}


let BookBag = {
    render : async() => {
        const summaries = await getSummaries()
        let view = `
        <h1 class='content-header'> book bag </h1>
        <ul id='bookbag'>
            ${ summaries.summaries.map(summary => 
                /*html*/`
                <li class='bulletin-list'>
                    <h2>${summary.bookTitle}</h2>
                    <p> ${summary.summary} </p>
                    <p> by ${summary.student.firstName}</p>
                </li>`
                ).join('\n ')
            }
        </ul>
`
        return view
    },
    after_render : async() => {}
}

export {BookBag}